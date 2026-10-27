import { runController } from '@/lib/http/runController.js';
import { sendClientOtp } from '@/lib/controllers/authController.js';

export const POST = runController(sendClientOtp);
