import { runController } from '@/lib/http/runController.js';
import { verifyClientOtp } from '@/lib/controllers/authController.js';

export const POST = runController(verifyClientOtp);
