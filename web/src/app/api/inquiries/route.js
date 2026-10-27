import { runController } from '@/lib/http/runController.js';
import { verifyToken, optionalToken, requireRole } from '@/lib/auth.js';
import { createInquiry, getInquiries } from '@/lib/controllers/inquiriesController.js';

const staffOnly = [verifyToken, requireRole(['admin', 'panditji'])];

export const GET = runController(getInquiries, { middleware: staffOnly });
export const POST = runController(createInquiry, { middleware: [optionalToken] });
