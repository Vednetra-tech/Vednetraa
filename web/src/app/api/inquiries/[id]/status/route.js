import { runController } from '@/lib/http/runController.js';
import { verifyToken, requireRole } from '@/lib/auth.js';
import { updateInquiryStatus } from '@/lib/controllers/inquiriesController.js';

export const PATCH = runController(updateInquiryStatus, {
  middleware: [verifyToken, requireRole(['admin', 'panditji'])]
});
