import { db, ensureDb, getDb, memoryStore } from './db.js';

// Server-side service lookup for server components (Mongo first, memory fallback)
export async function findService(id) {
  const numericId = parseInt(id, 10);
  if (Number.isNaN(numericId)) return null;

  await ensureDb();

  if (db.state.connected) {
    return getDb()
      .collection('services')
      .findOne({ id: numericId }, { projection: { _id: 0 } });
  }

  return memoryStore.services.find(s => s.id === numericId) ?? null;
}
