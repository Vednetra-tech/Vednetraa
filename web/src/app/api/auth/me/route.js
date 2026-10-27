import { runController } from '@/lib/http/runController.js';
import { verifyToken } from '@/lib/auth.js';
import { getMe } from '@/lib/controllers/authController.js';

export const GET = runController(getMe, { middleware: [verifyToken] });
