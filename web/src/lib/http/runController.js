/**
 * Adapter: runs Express-style controllers (req, res) inside Next.js Route Handlers.
 *
 * - req: method, url, headers, query, params, body, user
 * - res: status(code) and json(body) which produce a NextResponse
 * - middleware: (req, res, next) functions executed in order
 * - Connects to MongoDB (ensureDb) before the controller runs
 */
import { NextResponse } from 'next/server';
import { ensureDb } from '../db.js';

const parseBody = async (request) => {
  const contentType = request.headers.get('content-type') || '';
  try {
    if (contentType.includes('application/json')) {
      const body = await request.json();
      return body && typeof body === 'object' && !Array.isArray(body) ? body : {};
    }
    if (contentType.includes('application/x-www-form-urlencoded')) {
      return Object.fromEntries(new URLSearchParams(await request.text()));
    }
  } catch {
    // Malformed body: controllers respond with their own validation errors
  }
  return {};
};

const createRes = () => {
  const state = { statusCode: 200, response: null };
  const res = {
    status(code) {
      state.statusCode = code;
      return res;
    },
    json(body) {
      if (!state.response) {
        state.response = NextResponse.json(body, { status: state.statusCode });
      }
      return state.response;
    }
  };
  return { res, state };
};

const runMiddleware = (middleware, req, res) =>
  new Promise((resolve, reject) => {
    let settled = false;
    const next = () => {
      if (settled) return;
      settled = true;
      resolve(true);
    };
    try {
      Promise.resolve(middleware(req, res, next))
        .then(() => {
          if (!settled) {
            settled = true;
            resolve(false);
          }
        })
        .catch(reject);
    } catch (err) {
      reject(err);
    }
  });

/**
 * @param {(req: object, res: object) => Promise<unknown>} controller
 * @param {{ middleware?: Array<Function> }} [options]
 */
export function runController(controller, { middleware = [] } = {}) {
  return async function routeHandler(request, context) {
    try {
      const params = (await context?.params) ?? {};
      const url = new URL(request.url);

      const req = {
        method: request.method,
        url: `${url.pathname}${url.search}`,
        headers: Object.fromEntries(request.headers.entries()),
        query: Object.fromEntries(url.searchParams.entries()),
        params,
        body: await parseBody(request),
        user: undefined
      };

      const { res, state } = createRes();

      for (const mw of middleware) {
        const proceed = await runMiddleware(mw, req, res);
        if (!proceed) {
          return state.response ?? NextResponse.json({ success: false, message: 'Request rejected' }, { status: 403 });
        }
      }

      await ensureDb();
      await controller(req, res);

      return state.response ?? NextResponse.json({ success: false, message: 'No response produced' }, { status: 500 });
    } catch (error) {
      console.error(`[API] ${request.method} ${request.url} failed:`, error);
      return NextResponse.json(
        { success: false, message: 'Internal server error', error: error.message },
        { status: 500 }
      );
    }
  };
}
