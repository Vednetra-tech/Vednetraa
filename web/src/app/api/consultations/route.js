import { runController } from '@/lib/http/runController.js';
import { verifyToken, optionalToken, requireRole } from '@/lib/auth.js';
import { createConsultation, getConsultations } from '@/lib/controllers/consultationsController.js';

const staffOnly = [verifyToken, requireRole(['admin', 'panditji'])];

export const GET = runController(getConsultations, { middleware: staffOnly });
export const POST = runController(createConsultation, { middleware: [optionalToken] });
