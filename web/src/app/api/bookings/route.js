import { runController } from '@/lib/http/runController.js';
import { verifyToken, optionalToken, requireRole } from '@/lib/auth.js';
import { createBooking, getBookings } from '@/lib/controllers/bookingsController.js';

const staffOnly = [verifyToken, requireRole(['admin', 'panditji'])];

export const GET = runController(getBookings, { middleware: staffOnly });
export const POST = runController(createBooking, { middleware: [optionalToken] });
