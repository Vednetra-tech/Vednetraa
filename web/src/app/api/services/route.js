import { runController } from '@/lib/http/runController.js';
import { getServices } from '@/lib/controllers/servicesController.js';

export const GET = runController(getServices);
