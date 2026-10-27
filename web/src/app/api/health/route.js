import { runController } from '@/lib/http/runController.js';
import { getHealth } from '@/lib/controllers/healthController.js';

export const GET = runController(getHealth);
