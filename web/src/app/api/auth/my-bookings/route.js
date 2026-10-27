import { runController } from '@/lib/http/runController.js';
import { verifyToken } from '@/lib/auth.js';
import { getClientBookings } from '@/lib/controllers/authController.js';

export const GET = runController(getClientBookings, { middleware: [verifyToken] });
