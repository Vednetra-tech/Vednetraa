import { runController } from '@/lib/http/runController.js';
import { loginCredentials } from '@/lib/controllers/authController.js';

export const POST = runController(loginCredentials);
