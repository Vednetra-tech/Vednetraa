import { runController } from '@/lib/http/runController.js';
import { verifyToken, requireRole } from '@/lib/auth.js';
import { updateConsultationStatus } from '@/lib/controllers/consultationsController.js';

export const PATCH = runController(updateConsultationStatus, {
  middleware: [verifyToken, requireRole(['admin', 'panditji'])]
});
