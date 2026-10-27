import { runController } from '@/lib/http/runController.js';
import { forgotPassword } from '@/lib/controllers/authController.js';

export const POST = runController(forgotPassword);
