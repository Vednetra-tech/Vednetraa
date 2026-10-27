/**
 * VedNetra - SMS Gateway Service
 * 
 * Supports:
 * 1. Fast2SMS (Recommended for India - Quick OTP route)
 * 2. Twilio (Global SMS Gateway)
 * 3. 2Factor.in (Indian SMS Gateway)
 * 4. Development Fallback (Server-side secure log, NEVER sent to client)
 */

/**
 * Mask phone number for secure console logging (e.g. +91 98****3210)
 */
export const maskPhone = (phone) => {
  if (!phone || phone.length < 10) return phone;
  const str = phone.toString();
  return `${str.slice(0, 2)}****${str.slice(-4)}`;
};

/**
 * Send OTP via Fast2SMS
 */
async function sendViaFast2Sms(phone, otpCode, apiKey) {
  const url = 'https://www.fast2sms.com/dev/bulkV2';
  
  // Fast2SMS Quick OTP Route
  const bodyData = {
    variables_values: otpCode,
    route: 'otp',
    numbers: phone
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'authorization': apiKey.trim(),
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(bodyData)
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || (data && data.return === false)) {
    const errorMsg = data?.message?.[0] || data?.message || `HTTP ${response.status} ${response.statusText}`;
    throw new Error(`Fast2SMS Error: ${errorMsg}`);
  }

  return {
    provider: 'fast2sms',
    requestId: data?.request_id || 'ok',
    data
  };
}

/**
 * Send OTP via Twilio
 */
async function sendViaTwilio(phone, otpCode, accountSid, authToken, fromNumber, messagingServiceSid) {
  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid.trim()}/Messages.json`;
  
  // E.164 international format
  const toPhone = phone.startsWith('+') ? phone : (phone.length === 10 ? `+91${phone}` : `+${phone}`);
  const messageBody = `Your VedNetra verification code is: ${otpCode}. Valid for 5 minutes. (वेदनेत्र सत्यापन कोड: ${otpCode})`;

  const params = new URLSearchParams();
  params.append('To', toPhone);
  params.append('Body', messageBody);

  if (messagingServiceSid) {
    params.append('MessagingServiceSid', messagingServiceSid.trim());
  } else if (fromNumber) {
    params.append('From', fromNumber.trim());
  } else {
    throw new Error('Twilio requires either TWILIO_PHONE_NUMBER or TWILIO_MESSAGING_SERVICE_SID');
  }

  const credentials = Buffer.from(`${accountSid.trim()}:${authToken.trim()}`).toString('base64');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || (data && data.error_code)) {
    const errorMsg = data?.message || `HTTP ${response.status} ${response.statusText}`;
    throw new Error(`Twilio Error [${data?.code || response.status}]: ${errorMsg}`);
  }

  return {
    provider: 'twilio',
    sid: data?.sid,
    data
  };
}

/**
 * Send OTP via 2Factor.in
 */
async function sendVia2Factor(phone, otpCode, apiKey) {
  const url = `https://2factor.in/API/V1/${apiKey.trim()}/SMS/+91${phone}/${otpCode}/VedNetra`;

  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || (data && data.Status !== 'Success')) {
    const errorMsg = data?.Details || `HTTP ${response.status} ${response.statusText}`;
    throw new Error(`2Factor Error: ${errorMsg}`);
  }

  return {
    provider: '2factor',
    sessionId: data?.Details,
    data
  };
}

/**
 * Main Dispatcher: Send SMS OTP to phone number
 * 
 * @param {Object} options
 * @param {string} options.phone - 10-digit mobile number
 * @param {string} options.otpCode - 6-digit numeric OTP
 * @returns {Promise<{ success: boolean, provider: string, message?: string, error?: string }>}
 */
export async function sendSmsOtp({ phone, otpCode }) {
  const provider = (process.env.SMS_PROVIDER || 'auto').toLowerCase();
  const fast2SmsKey = process.env.FAST2SMS_API_KEY;
  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioFrom = process.env.TWILIO_PHONE_NUMBER;
  const twilioServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
  const twoFactorKey = process.env.TWOFACTOR_API_KEY;

  // 1. Fast2SMS (explicit or auto-detected)
  if ((provider === 'fast2sms' || provider === 'auto') && fast2SmsKey && fast2SmsKey.trim()) {
    try {
      console.log(`📡 [SMS Service] Dispatching OTP via Fast2SMS to +91 ${maskPhone(phone)}...`);
      const res = await sendViaFast2Sms(phone, otpCode, fast2SmsKey);
      console.log(`✅ [SMS Service] Fast2SMS dispatched successfully. Request ID: ${res.requestId}`);
      return { success: true, provider: 'fast2sms' };
    } catch (err) {
      console.error(`❌ [SMS Service] Fast2SMS dispatch failed:`, err.message);
      // If explicit provider failed, report error
      if (provider === 'fast2sms') {
        return { success: false, provider: 'fast2sms', error: err.message };
      }
    }
  }

  // 2. Twilio (explicit or auto-detected)
  if ((provider === 'twilio' || provider === 'auto') && twilioSid && twilioToken) {
    try {
      const displayPhone = phone.startsWith('+') ? phone : `+91 ${phone}`;
      console.log(`📡 [SMS Service] Dispatching OTP via Twilio to ${maskPhone(displayPhone)}...`);
      const res = await sendViaTwilio(phone, otpCode, twilioSid, twilioToken, twilioFrom, twilioServiceSid);
      console.log(`✅ [SMS Service] Twilio dispatched successfully. SID: ${res.sid}`);
      return { success: true, provider: 'twilio' };
    } catch (err) {
      console.error(`❌ [SMS Service] Twilio dispatch failed:`, err.message);
      if (provider === 'twilio') {
        return { success: false, provider: 'twilio', error: err.message };
      }
    }
  }

  // 3. 2Factor (explicit or auto-detected)
  if ((provider === '2factor' || provider === 'auto') && twoFactorKey && twoFactorKey.trim()) {
    try {
      console.log(`📡 [SMS Service] Dispatching OTP via 2Factor to +91 ${maskPhone(phone)}...`);
      const res = await sendVia2Factor(phone, otpCode, twoFactorKey);
      console.log(`✅ [SMS Service] 2Factor dispatched successfully. Session: ${res.sessionId}`);
      return { success: true, provider: '2factor' };
    } catch (err) {
      console.error(`❌ [SMS Service] 2Factor dispatch failed:`, err.message);
      if (provider === '2factor') {
        return { success: false, provider: '2factor', error: err.message };
      }
    }
  }

  // 4. Server-Side Console Log Notice (When no SMS Gateway key is set)
  console.log(`\n================================================================`);
  console.log(`📱 [VedNetra SMS Gateway Notice]`);
  console.log(`🎯 Recipient Mobile : +91 ${phone}`);
  console.log(`🔒 Server-side OTP  : ${otpCode} (Valid for 5 mins)`);
  console.log(`⚠️  Status           : No live SMS API key configured in backend/.env`);
  console.log(`👉  To deliver real SMS to mobile numbers:`);
  console.log(`    Add FAST2SMS_API_KEY=your_key or Twilio keys to backend/.env`);
  console.log(`    (Note: This OTP is NEVER exposed to the client or browser screen)`);
  console.log(`================================================================\n`);

  return {
    success: true,
    provider: 'server-logger',
    simulated: true,
    message: 'OTP generated and securely stored on server.'
  };
}
