import { runController } from '@/lib/http/runController.js';
import { getServiceById } from '@/lib/controllers/servicesController.js';

export const GET = runController(getServiceById);
