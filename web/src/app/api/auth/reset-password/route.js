import { runController } from '@/lib/http/runController.js';
import { resetPassword } from '@/lib/controllers/authController.js';

export const POST = runController(resetPassword);
