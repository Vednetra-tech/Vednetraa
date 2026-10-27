import express from 'express';
import { getServices, getServiceById } from '../controllers/servicesController.js';
import { createBooking, getBookings, updateBookingStatus } from '../controllers/bookingsController.js';
import { createConsultation, getConsultations, updateConsultationStatus } from '../controllers/consultationsController.js';
import { createInquiry, getInquiries, updateInquiryStatus } from '../controllers/inquiriesController.js';
import {
  sendClientOtp,
  verifyClientOtp,
  loginCredentials,
  forgotPassword,
  resetPassword,
  getMe,
  getClientBookings
} from '../controllers/authController.js';
import { verifyToken, optionalToken, requireRole } from '../middleware/auth.js';
import { isPostgresConnected } from '../config/db.js';

const router = express.Router();

// Health check & status
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'VedNetra API',
    postgres_connected: isPostgresConnected,
    timestamp: new Date().toISOString()
  });
});

// ==========================================
// AUTHENTICATION ROUTES
// ==========================================

// Client: Phone OTP Registration & Login
router.post('/auth/client/send-otp', sendClientOtp);
router.post('/auth/client/verify-otp', verifyClientOtp);

// Panditji & Admin: Email + Password Login
router.post('/auth/login', loginCredentials);

// Panditji: Forgot Password Request (Reset link to Email)
router.post('/auth/forgot-password', forgotPassword);

// Panditji: Reset Password with Token
router.post('/auth/reset-password', resetPassword);

// Current User Profile Verification
router.get('/auth/me', verifyToken, getMe);

// Client: My Personal Ritual Bookings
router.get('/auth/my-bookings', verifyToken, getClientBookings);

// ==========================================
// CORE BUSINESS ROUTES
// ==========================================

// Services routes (Public)
router.get('/services', getServices);
router.get('/services/:id', getServiceById);

// Bookings routes
router.post('/bookings', optionalToken, createBooking);
router.get('/bookings', verifyToken, requireRole(['admin', 'panditji']), getBookings);
router.patch('/bookings/:id/status', verifyToken, requireRole(['admin', 'panditji']), updateBookingStatus);

// Consultations routes (Kundali Milan / Faladesh / Ratna)
router.post('/consultations', optionalToken, createConsultation);
router.get('/consultations', verifyToken, requireRole(['admin', 'panditji']), getConsultations);
router.patch('/consultations/:id/status', verifyToken, requireRole(['admin', 'panditji']), updateConsultationStatus);

// Inquiries routes (Contact & Muhurat)
router.post('/inquiries', optionalToken, createInquiry);
router.get('/inquiries', verifyToken, requireRole(['admin', 'panditji']), getInquiries);
router.patch('/inquiries/:id/status', verifyToken, requireRole(['admin', 'panditji']), updateInquiryStatus);

export default router;

