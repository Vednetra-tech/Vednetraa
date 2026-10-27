import { runController } from '@/lib/http/runController.js';
import { verifyToken, requireRole } from '@/lib/auth.js';
import { updateBookingStatus } from '@/lib/controllers/bookingsController.js';

export const PATCH = runController(updateBookingStatus, {
  middleware: [verifyToken, requireRole(['admin', 'panditji'])]
});
