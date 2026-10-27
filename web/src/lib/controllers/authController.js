import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { db, getDb, memoryStore, escapeRegex, nextId } from '../db.js';
import { sendSmsOtp } from '../smsService.js';
import { JWT_SECRET } from '../auth.js';

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

const isString = (value) => typeof value === 'string';

/**
 * Clean & normalize phone number (Supports Domestic +91 and International E.164 formats)
 */
const cleanPhoneNumber = (phone, countryCode = '+91') => {
  if (!phone) return '';
  const raw = phone.toString().trim();
  if (raw.startsWith('+')) {
    const digits = raw.replace(/\D/g, '');
    return `+${digits}`;
  }
  const digits = raw.replace(/\D/g, '');
  if (countryCode && countryCode !== '+91') {
    const cc = countryCode.startsWith('+') ? countryCode : `+${countryCode.replace(/\D/g, '')}`;
    return `${cc}${digits}`;
  }
  // If user included leading 91 for Indian number
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  return digits;
};

/** Case-insensitive exact email match (Mongo equivalent of LOWER(email) = $1) */
const emailFilter = (normalizedEmail) => ({
  email: { $regex: `^${escapeRegex(normalizedEmail)}$`, $options: 'i' }
});

const findUserByEmail = async (normalizedEmail) => {
  if (db.state.connected) {
    return getDb().collection('users').findOne(emailFilter(normalizedEmail), { projection: { _id: 0 } });
  }
  return memoryStore.users.find(u => u.email && u.email.toLowerCase() === normalizedEmail) ?? null;
};

/**
 * CLIENT AUTH: Send OTP to Client Mobile Number
 */
export async function sendClientOtp(req, res) {
  try {
    const { phone } = req.body;
    const countryCode = isString(req.body.countryCode) ? req.body.countryCode : '+91';
    const cleanPhone = cleanPhoneNumber(phone, countryCode);

    if (!cleanPhone || cleanPhone.replace(/\D/g, '').length < 7) {
      return res.status(400).json({
        success: false,
        message: 'कृपया केवल मान्य WhatsApp नंबर दर्ज करें (Please provide a valid WhatsApp number only)'
      });
    }

    // Generate 6-digit OTP code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes validity
    const displayPhone = cleanPhone.startsWith('+') ? cleanPhone : `+91 ${cleanPhone}`;

    console.log(`\n======================================================`);
    console.log(`🪔 [VedNetra OTP Service] WhatsApp: ${displayPhone}`);
    console.log(`🔑 Verification OTP: ${otpCode} (Valid for 5 mins)`);
    console.log(`======================================================\n`);

    if (db.state.connected) {
      const users = getDb().collection('users');
      const existing = await users.findOne({ phone: cleanPhone });
      if (existing) {
        await users.updateOne(
          { phone: cleanPhone },
          { $set: { otp_code: otpCode, otp_expires_at: expiresAt } }
        );
      } else {
        await users.insertOne({
          id: await nextId('users'),
          role: 'client',
          phone: cleanPhone,
          name: 'यजमान (Devotee)',
          email: null,
          password_hash: null,
          otp_code: otpCode,
          otp_expires_at: expiresAt,
          reset_token: null,
          reset_token_expires_at: null,
          created_at: new Date()
        });
      }
    } else {
      // Memory store fallback
      let user = memoryStore.users.find(u => u.phone === cleanPhone);
      if (user) {
        user.otp_code = otpCode;
        user.otp_expires_at = expiresAt;
      } else {
        user = {
          id: memoryStore.users.length + 1,
          role: 'client',
          phone: cleanPhone,
          name: 'यजमान (Devotee)',
          email: null,
          password_hash: null,
          otp_code: otpCode,
          otp_expires_at: expiresAt,
          reset_token: null,
          reset_token_expires_at: null,
          created_at: new Date()
        };
        memoryStore.users.push(user);
      }
    }

    // Dispatch OTP via SMS Service directly to user's phone
    const smsResult = await sendSmsOtp({ phone: cleanPhone, otpCode });

    const responsePayload = {
      success: true,
      message: `ओटीपी आपके WhatsApp नंबर ${displayPhone} पर भेज दिया गया है।`,
      phone: cleanPhone,
      displayPhone,
      provider: smsResult.provider
    };

    // Internal test secret only used by automated test scripts
    if (req.headers['x-internal-test-secret'] === 'vednetra-test-internal') {
      responsePayload.test_otp = otpCode;
    }

    return res.json(responsePayload);
  } catch (err) {
    console.error('Error sending OTP:', err);
    return res.status(500).json({
      success: false,
      message: 'ओटीपी भेजने में त्रुटि हुई। कृपया पुनः प्रयास करें।',
      error: err.message
    });
  }
}

/**
 * CLIENT AUTH: Verify OTP and Login / Register Client
 */
export async function verifyClientOtp(req, res) {
  try {
    const { phone, otp, name } = req.body;
    const countryCode = isString(req.body.countryCode) ? req.body.countryCode : '+91';
    const cleanPhone = cleanPhoneNumber(phone, countryCode);

    if (!cleanPhone || !otp) {
      return res.status(400).json({
        success: false,
        message: 'WhatsApp नंबर और ओटीपी दोनों अनिवार्य हैं (WhatsApp number and OTP are required)'
      });
    }

    const otpInput = String(otp).trim();
    const hasName = isString(name) && name.trim().length > 0;
    let user = null;

    if (db.state.connected) {
      const users = getDb().collection('users');
      user = await users.findOne({ phone: cleanPhone }, { projection: { _id: 0 } });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'इस WhatsApp नंबर पर कोई सक्रिय ओटीपी अनुरोध नहीं मिला (No OTP request found for this WhatsApp number)'
        });
      }

      // Validate OTP & expiry
      if (user.otp_code !== otpInput) {
        return res.status(400).json({
          success: false,
          message: 'अमान्य ओटीपी कोड। कृपया सही 6-अंकीय कोड दर्ज करें। (Invalid OTP code)'
        });
      }

      if (new Date(user.otp_expires_at) < new Date()) {
        return res.status(400).json({
          success: false,
          message: 'ओटीपी की समय सीमा समाप्त हो चुकी है। कृपया नया ओटीपी मंगाएं। (OTP expired)'
        });
      }

      // Update name if devotee provided a custom name
      const updatedName = hasName ? name.trim() : user.name;
      await users.updateOne(
        { id: user.id },
        { $set: { name: updatedName, otp_code: null, otp_expires_at: null } }
      );
      user.name = updatedName;
    } else {
      user = memoryStore.users.find(u => u.phone === cleanPhone);
      if (!user || !user.otp_code) {
        return res.status(400).json({
          success: false,
          message: 'इस मोबाइल नंबर पर कोई सक्रिय ओटीपी अनुरोध नहीं मिला (No OTP request found for this phone)'
        });
      }

      if (user.otp_code !== otpInput) {
        return res.status(400).json({
          success: false,
          message: 'अमान्य ओटीपी कोड। कृपया सही 6-अंकीय कोड दर्ज करें। (Invalid OTP code)'
        });
      }

      if (new Date(user.otp_expires_at) < new Date()) {
        return res.status(400).json({
          success: false,
          message: 'ओटीपी की समय सीमा समाप्त हो चुकी है। कृपया नया ओटीपी मंगाएं। (OTP expired)'
        });
      }

      if (hasName) {
        user.name = name.trim();
      }
      user.otp_code = null;
      user.otp_expires_at = null;
    }

    // Generate JWT token for client
    const token = jwt.sign(
      {
        id: user.id,
        role: 'client',
        phone: user.phone,
        name: user.name || 'यजमान'
      },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    return res.json({
      success: true,
      message: `प्रणाम ${user.name || 'यजमान'}! आपका स्वागत है।`,
      token,
      user: {
        id: user.id,
        role: 'client',
        phone: user.phone,
        name: user.name || 'यजमान',
        email: user.email || null
      }
    });
  } catch (err) {
    console.error('Error verifying OTP:', err);
    return res.status(500).json({
      success: false,
      message: 'ओटीपी सत्यापन में त्रुटि हुई',
      error: err.message
    });
  }
}

/**
 * PANDITJI & ADMIN AUTH: Login with Email & Password
 */
export async function loginCredentials(req, res) {
  try {
    const { email, password } = req.body;

    if (!isString(email) || !isString(password) || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'कृपया ईमेल और पासवर्ड दोनों दर्ज करें (Email and password required)'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await findUserByEmail(normalizedEmail);

    if (!user || (user.role !== 'panditji' && user.role !== 'admin')) {
      return res.status(401).json({
        success: false,
        message: 'अमान्य क्रेडेंशियल्स: पंजीकृत ईमेल एवं पासवर्ड की पुनः जांच करें (Invalid email or password)'
      });
    }

    // Verify bcrypt password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'अमान्य पासवर्ड: कृपया सही पासवर्ड दर्ज करें (Incorrect password)'
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
        name: user.name,
        phone: user.phone
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: `${user.name} के रूप में सफलतापूर्वक लॉगिन किया गया।`,
      token,
      user: {
        id: user.id,
        role: user.role,
        email: user.email,
        name: user.name,
        phone: user.phone
      }
    });
  } catch (err) {
    console.error('Error during credentials login:', err);
    return res.status(500).json({
      success: false,
      message: 'लॉगिन प्रक्रिया में त्रुटि हुई',
      error: err.message
    });
  }
}

/**
 * PANDITJI (or Admin): Forgot Password - Request Reset Link via Email
 */
export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    if (!isString(email) || !email) {
      return res.status(400).json({
        success: false,
        message: 'कृपया अपना पंजीकृत ईमेल दर्ज करें (Email is required)'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'इस ईमेल से कोई खाता पंजीकृत नहीं मिला (No account found with this email)'
      });
    }

    // Generate secure crypto token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour validity

    if (db.state.connected) {
      await getDb().collection('users').updateOne(
        { id: user.id },
        { $set: { reset_token: resetToken, reset_token_expires_at: resetExpires } }
      );
    } else {
      user.reset_token = resetToken;
      user.reset_token_expires_at = resetExpires;
    }

    const resetLink = `${CLIENT_URL}/?resetToken=${resetToken}&email=${encodeURIComponent(user.email)}`;

    console.log(`\n================================================================`);
    console.log(`📧 [VedNetra Email Dispatch Service] Password Reset Request`);
    console.log(`Recipient: ${user.name} <${user.email}>`);
    console.log(`Reset Token: ${resetToken}`);
    console.log(`Password Reset Link: ${resetLink}`);
    console.log(`(Token valid for 1 hour)`);
    console.log(`================================================================\n`);

    return res.json({
      success: true,
      message: `पासवर्ड रीसेट लिंक आपके ईमेल (${user.email}) पर भेज दिया गया है।`,
      resetToken,
      resetLink
    });
  } catch (err) {
    console.error('Error in forgotPassword:', err);
    return res.status(500).json({
      success: false,
      message: 'पासवर्ड रीसेट लिंक भेजने में त्रुटि हुई',
      error: err.message
    });
  }
}

/**
 * PANDITJI (or Admin): Reset Password using Token
 */
export async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;

    if (!isString(token) || !isString(newPassword) || !token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'टोकन और नया पासवर्ड दोनों आवश्यक हैं (Token and new password required)'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'नया पासवर्ड कम से कम 6 अक्षरों का होना चाहिए (Password must be at least 6 characters)'
      });
    }

    let user = null;

    if (db.state.connected) {
      user = await getDb().collection('users').findOne(
        { reset_token: token, reset_token_expires_at: { $gt: new Date() } },
        { projection: { _id: 0 } }
      );
    } else {
      user = memoryStore.users.find(
        u => u.reset_token === token && u.reset_token_expires_at && new Date(u.reset_token_expires_at) > new Date()
      );
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'पासवर्ड रीसेट लिंक अमान्य है अथवा उसकी समय सीमा समाप्त हो चुकी है (Invalid or expired reset token)'
      });
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    if (db.state.connected) {
      await getDb().collection('users').updateOne(
        { id: user.id },
        { $set: { password_hash: newPasswordHash, reset_token: null, reset_token_expires_at: null } }
      );
    } else {
      user.password_hash = newPasswordHash;
      user.reset_token = null;
      user.reset_token_expires_at = null;
    }

    console.log(`✓ Password successfully updated for user: ${user.email}`);

    return res.json({
      success: true,
      message: 'पासवर्ड सफलतापूर्वक बदल दिया गया है! अब आप नए पासवर्ड से लॉगिन कर सकते हैं।'
    });
  } catch (err) {
    console.error('Error resetting password:', err);
    return res.status(500).json({
      success: false,
      message: 'पासवर्ड बदलने में त्रुटि हुई',
      error: err.message
    });
  }
}

/**
 * GET ME: Check current authenticated user
 */
export async function getMe(req, res) {
  return res.json({
    success: true,
    user: req.user
  });
}

/**
 * CLIENT: Get client's own bookings
 */
export async function getClientBookings(req, res) {
  try {
    const clientPhone = cleanPhoneNumber(req.user.phone);
    if (!clientPhone) {
      return res.status(400).json({ success: false, message: 'उपयोगकर्ता फोन नंबर अनुपलब्ध है' });
    }

    let bookings = [];
    if (db.state.connected) {
      bookings = await getDb()
        .collection('bookings')
        .find({ phone: { $regex: escapeRegex(clientPhone) } }, { projection: { _id: 0 } })
        .sort({ created_at: -1 })
        .toArray();
    } else {
      bookings = memoryStore.bookings.filter(b => cleanPhoneNumber(b.phone) === clientPhone);
    }

    return res.json({
      success: true,
      data: bookings
    });
  } catch (err) {
    console.error('Error fetching client bookings:', err);
    return res.status(500).json({ success: false, message: 'आरक्षण सूची प्राप्त करने में त्रुटि' });
  }
}
