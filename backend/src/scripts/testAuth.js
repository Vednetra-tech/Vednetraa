import assert from 'assert';
import { pool, memoryStore, isPostgresConnected } from '../config/db.js';

const BASE_URL = 'http://localhost:5000/api';

async function testAllAuthFlows() {
  console.log('===============================================================');
  console.log('   VEDNETRA AUTHENTICATION SYSTEM COMPREHENSIVE TEST SUITE     ');
  console.log('===============================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  async function test(name, fn) {
    totalTests++;
    try {
      await fn();
      console.log(`  [PASS] Test ${totalTests}: ${name}`);
      passedTests++;
    } catch (err) {
      console.error(`  [FAIL] Test ${totalTests}: ${name}`);
      console.error(`         Error: ${err.message}`);
    }
  }

  // 1. Health check
  await test('Server Health Check', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'ok');
  });

  // 2. Client Send OTP - Valid Phone (OTP hidden from public response)
  let devOtp = null;
  const clientPhone = '9876543210';
  await test('Client Send OTP - Valid Phone (OTP omitted from public response)', async () => {
    // A. Public client request (no test header): dev_otp and test_otp must be absent
    const publicRes = await fetch(`${BASE_URL}/auth/client/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: clientPhone })
    });
    assert.strictEqual(publicRes.status, 200);
    const publicData = await publicRes.json();
    assert.strictEqual(publicData.success, true);
    assert.strictEqual(publicData.dev_otp, undefined, 'dev_otp must NEVER be exposed in public API response');
    assert.strictEqual(publicData.test_otp, undefined, 'test_otp must NEVER be exposed in public API response');

    // B. Internal test runner request (with x-internal-test-secret header): provides test_otp for test suite
    const testRes = await fetch(`${BASE_URL}/auth/client/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-test-secret': 'vednetra-test-internal'
      },
      body: JSON.stringify({ phone: clientPhone })
    });
    assert.strictEqual(testRes.status, 200);
    const testData = await testRes.json();
    assert.strictEqual(testData.success, true);
    assert.ok(testData.test_otp, 'Expected test_otp with internal test secret');
    devOtp = testData.test_otp;
  });

  // 3. Client Send OTP - Invalid Phone Validation
  await test('Client Send OTP - Reject Invalid Short Phone', async () => {
    const res = await fetch(`${BASE_URL}/auth/client/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: '123' })
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.success, false);
  });

  // 4. Client Verify OTP - Wrong Code Rejection
  await test('Client Verify OTP - Reject Incorrect OTP Code', async () => {
    const res = await fetch(`${BASE_URL}/auth/client/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: clientPhone, otp: '000000' })
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.success, false);
  });

  // 5. Client Verify OTP - Successful Login & JWT Issuance
  let clientToken = null;
  let clientUser = null;
  await test('Client Verify OTP - Correct Code & JWT Generation', async () => {
    const res = await fetch(`${BASE_URL}/auth/client/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: clientPhone,
        otp: devOtp,
        name: 'श्री राहुल शर्मा (यजमान)'
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.token, 'Expected JWT token');
    assert.strictEqual(data.user.role, 'client');
    assert.strictEqual(data.user.name, 'श्री राहुल शर्मा (यजमान)');
    clientToken = data.token;
    clientUser = data.user;
  });

  // 6. Client Identity Check via /auth/me
  await test('Client Authenticated Profile Verification (/auth/me)', async () => {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${clientToken}` }
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.user.phone, clientPhone);
    assert.strictEqual(data.user.role, 'client');
  });

  // 7. Role-Based Access Control: Client blocked from protected staff routes
  await test('RBAC Guard: Client cannot access Panditji/Admin Bookings Management', async () => {
    const res = await fetch(`${BASE_URL}/bookings`, {
      headers: { 'Authorization': `Bearer ${clientToken}` }
    });
    assert.strictEqual(res.status, 403, 'Client must receive 403 Forbidden on staff endpoints');
    const data = await res.json();
    assert.strictEqual(data.success, false);
  });

  // 8. Panditji Login - Reject Wrong Password
  await test('Panditji Login - Reject Invalid Password', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'panditrakeshrawal26@gmail.com',
        password: 'WrongPassword123'
      })
    });
    assert.strictEqual(res.status, 401);
    const data = await res.json();
    assert.strictEqual(data.success, false);
  });

  // 9. Panditji Login - Successful with Seeded Password
  let panditjiToken = null;
  await test('Panditji Login - Success with Valid Credentials', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'panditrakeshrawal26@gmail.com',
        password: 'Panditji@VedNetra2026'
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.user.role, 'panditji');
    assert.ok(data.token, 'Expected JWT token for panditji');
    panditjiToken = data.token;
  });

  // 10. Panditji Access to Protected Management Route
  await test('Panditji Access: Authorized for /bookings Endpoint', async () => {
    const res = await fetch(`${BASE_URL}/bookings`, {
      headers: { 'Authorization': `Bearer ${panditjiToken}` }
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(Array.isArray(data.data));
  });

  // 11. Panditji Forgot Password - Request Reset Link
  let resetToken = null;
  await test('Panditji Forgot Password - Generate Reset Token', async () => {
    const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'panditrakeshrawal26@gmail.com' })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.resetToken, 'Expected resetToken in response');
    assert.ok(data.resetLink.includes('resetToken='));
    resetToken = data.resetToken;
  });

  // 12. Panditji Reset Password - Apply New Password
  const newPanditjiPassword = 'Panditji@NewHolyPass2026!';
  await test('Panditji Reset Password - Update Credentials with Token', async () => {
    const res = await fetch(`${BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: resetToken,
        newPassword: newPanditjiPassword
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
  });

  // 13. Verify Old Password is now Rejected
  await test('Panditji Auth - Verify Old Password Invalidated', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'panditrakeshrawal26@gmail.com',
        password: 'Panditji@VedNetra2026'
      })
    });
    assert.strictEqual(res.status, 401);
  });

  // 14. Panditji Login with Newly Reset Password
  await test('Panditji Login - Success with New Password', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'panditrakeshrawal26@gmail.com',
        password: newPanditjiPassword
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.user.role, 'panditji');
  });

  // 15. Admin Login - Success with Seeded Credentials
  let adminToken = null;
  await test('Admin Login - Success with Admin Credentials', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'shiwansh8888@gmail.com',
        password: 'Admin@VedNetra2026'
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.user.role, 'admin');
    assert.ok(data.token);
    adminToken = data.token;
  });

  // 16. Admin Access to Consultations & Inquiries Management
  await test('Admin Access: Authorized for /consultations and /inquiries', async () => {
    const resConsult = await fetch(`${BASE_URL}/consultations`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    assert.strictEqual(resConsult.status, 200);

    const resInq = await fetch(`${BASE_URL}/inquiries`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    assert.strictEqual(resInq.status, 200);
  });

  // 17. Client Personal Bookings Integration
  await test('Client Personal Ritual Bookings (/auth/my-bookings)', async () => {
    // 17.1 Create a booking under client phone
    const createRes = await fetch(`${BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${clientToken}`
      },
      body: JSON.stringify({
        devotee_name: 'श्री राहुल शर्मा',
        phone: clientPhone,
        service_title: 'श्री सत्यनारायण कथा',
        ritual_mode: 'Offline',
        preferred_date: '2026-11-01',
        preferred_time: 'प्रातः 08:00',
        gotra: 'कश्यप',
        city: 'हरिद्वार',
        special_sankalp: 'गृह शांति एवं समृद्धि हेतु'
      })
    });
    assert.strictEqual(createRes.status, 201);

    // 17.2 Client retrieves their own booking
    const myBookingsRes = await fetch(`${BASE_URL}/auth/my-bookings`, {
      headers: { 'Authorization': `Bearer ${clientToken}` }
    });
    assert.strictEqual(myBookingsRes.status, 200);
    const myBookingsData = await myBookingsRes.json();
    assert.strictEqual(myBookingsData.success, true);
    assert.ok(myBookingsData.data.length >= 1);
    assert.strictEqual(myBookingsData.data[0].service_title, 'श्री सत्यनारायण कथा');
  });

  console.log('\n===============================================================');
  console.log(`   TEST RESULTS: ${passedTests}/${totalTests} PASSED (${Math.round((passedTests/totalTests)*100)}%)`);
  console.log('===============================================================\n');

  if (passedTests === totalTests) {
    console.log('✨ All authentication subsystems are operating 100% correctly!\n');
    process.exit(0);
  } else {
    console.error('❌ Some tests failed. Please review the errors above.\n');
    process.exit(1);
  }
}

testAllAuthFlows().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
