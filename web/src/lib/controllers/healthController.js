import { db } from '../db.js';

export async function getHealth(req, res) {
  return res.json({
    status: 'ok',
    service: 'VedNetra API',
    postgres_connected: false,
    mongo_connected: db.state.connected,
    timestamp: new Date().toISOString()
  });
}
