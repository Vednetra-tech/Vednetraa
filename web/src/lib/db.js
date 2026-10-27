/**
 * VedNetra - MongoDB connection, seeding and in-memory fallback.
 *
 * All state lives on globalThis so that Next.js hot reloads and warm
 * serverless instances reuse one client instead of opening new connections.
 */
import { MongoClient } from 'mongodb';
import { seedServices } from './seedServices.js';

const DEFAULT_DB_NAME = 'vednetra';
const RETRY_COOLDOWN_MS = 30 * 1000;
const SEQUENCE_COLLECTIONS = ['services', 'bookings', 'consultations', 'inquiries', 'users'];

export const seedUsers = [
  {
    id: 1,
    role: 'admin',
    email: 'shiwansh8888@gmail.com',
    name: 'व्यवस्थापक (Admin)',
    phone: '9876543210',
    password_hash: '$2b$10$UAWuybDsM.rOmvwhokhgp.yntTz6tBoKBTXLFFbAMakVug5cg7LcW',
    otp_code: null,
    otp_expires_at: null,
    reset_token: null,
    reset_token_expires_at: null
  },
  {
    id: 2,
    role: 'panditji',
    email: 'panditrakeshrawal26@gmail.com',
    name: 'पं. राकेश चन्द्र रावल',
    phone: '9827514489',
    password_hash: '$2b$10$9qiaxYgxpx4jUxSR9eyjc.Lq1lEhwr8.3U73wKn1iPC8m16V3wiMS',
    otp_code: null,
    otp_expires_at: null,
    reset_token: null,
    reset_token_expires_at: null
  }
];

const store = globalThis.__vednetra ?? (globalThis.__vednetra = {
  client: null,
  database: null,
  state: { connected: false },
  memoryStore: null,
  ensurePromise: null,
  lastFailureAt: 0,
  memoryNoticeShown: false
});

/** Shared connection state. `db.state.connected` is true only after a successful connect. */
export const db = store;

const createMemoryStore = () => ({
  services: seedServices.map((service, index) => ({ id: index + 1, ...service })),
  bookings: [],
  consultations: [],
  inquiries: [],
  users: seedUsers.map((user) => ({ ...user, created_at: new Date() }))
});

/** In-memory fallback used when MONGODB_URI is not configured or the database is unreachable. */
export const memoryStore = (store.memoryStore ??= createMemoryStore());

/** Remove Mongo's internal `_id` before data leaves the server. */
export const withoutId = (doc) => {
  if (!doc) return doc;
  const { _id, ...rest } = doc;
  return rest;
};

export const escapeRegex = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function getDb() {
  if (!store.database) {
    throw new Error('MongoDB is not connected');
  }
  return store.database;
}

/** Atomically returns the next numeric id for a collection (keeps the existing numeric id contract). */
export async function nextId(name) {
  const counter = await getDb()
    .collection('counters')
    .findOneAndUpdate(
      { _id: name },
      { $inc: { seq: 1 } },
      { upsert: true, returnDocument: 'after' }
    );
  return counter.seq;
}

async function createIndexes(database) {
  await Promise.all([
    database.collection('services').createIndex({ id: 1 }, { unique: true }),
    database.collection('bookings').createIndex({ id: 1 }, { unique: true }),
    database.collection('bookings').createIndex({ created_at: -1 }),
    database.collection('consultations').createIndex({ id: 1 }, { unique: true }),
    database.collection('consultations').createIndex({ created_at: -1 }),
    database.collection('inquiries').createIndex({ id: 1 }, { unique: true }),
    database.collection('inquiries').createIndex({ created_at: -1 }),
    database.collection('users').createIndex({ id: 1 }, { unique: true }),
    database.collection('users').createIndex(
      { email: 1 },
      { unique: true, partialFilterExpression: { email: { $type: 'string' } } }
    ),
    database.collection('users').createIndex(
      { phone: 1 },
      { unique: true, partialFilterExpression: { phone: { $type: 'string' } } }
    ),
    database.collection('users').createIndex({ reset_token: 1 })
  ]);
}

async function seedDatabase(database) {
  // Services: insert only missing ids, never overwrite edits made later.
  const services = database.collection('services');
  for (const [index, service] of seedServices.entries()) {
    await services.updateOne(
      { id: index + 1 },
      { $setOnInsert: { ...service, created_at: new Date() } },
      { upsert: true }
    );
  }

  // Admin and panditji: insert only if the email is absent.
  const users = database.collection('users');
  for (const user of seedUsers) {
    const exists = await users.findOne({ email: user.email }, { projection: { _id: 0, id: 1 } });
    if (!exists) {
      try {
        await users.insertOne({ ...user, created_at: new Date() });
      } catch (err) {
        if (err.code !== 11000) throw err;
      }
    }
  }

  // Raise each counter to the current max id so nextId() never collides.
  const counters = database.collection('counters');
  for (const name of SEQUENCE_COLLECTIONS) {
    const [latest] = await database
      .collection(name)
      .find({}, { projection: { _id: 0, id: 1 } })
      .sort({ id: -1 })
      .limit(1)
      .toArray();
    await counters.updateOne(
      { _id: name },
      { $max: { seq: latest?.id ?? 0 } },
      { upsert: true }
    );
  }
}

async function connectAndInit() {
  const client = new MongoClient(process.env.MONGODB_URI, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000
  });

  try {
    await client.connect();
    const database = client.db(process.env.MONGODB_DB || DEFAULT_DB_NAME);
    await database.command({ ping: 1 });
    await createIndexes(database);
    await seedDatabase(database);

    store.client = client;
    store.database = database;
  } catch (err) {
    await client.close().catch(() => {});
    throw err;
  }
}

/**
 * Connects once and seeds the database.
 * Resolves to true when MongoDB is ready, false when running in memory mode.
 * Never throws. A failed attempt is retried after a 30 second cooldown.
 */
export function ensureDb() {
  if (store.state.connected) return Promise.resolve(true);

  if (!process.env.MONGODB_URI) {
    if (!store.memoryNoticeShown) {
      store.memoryNoticeShown = true;
      console.log('ℹ️  MONGODB_URI not set. Running with the in-memory data engine. Add MONGODB_URI to web/.env.local.');
    }
    return Promise.resolve(false);
  }

  if (!store.ensurePromise) {
    if (Date.now() - store.lastFailureAt < RETRY_COOLDOWN_MS) {
      return Promise.resolve(false);
    }

    store.ensurePromise = connectAndInit()
      .then(() => {
        store.state.connected = true;
        console.log(`✓ Connected to MongoDB database: ${process.env.MONGODB_DB || DEFAULT_DB_NAME}`);
        return true;
      })
      .catch((err) => {
        store.lastFailureAt = Date.now();
        console.warn(`⚠️  MongoDB connection not established (${err.message}). Using memory engine for 30s before retry.`);
        return false;
      })
      .finally(() => {
        store.ensurePromise = null;
      });
  }

  return store.ensurePromise;
}
