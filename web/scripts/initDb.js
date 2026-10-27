import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Scripts run outside Next.js, so load web/.env.local explicitly
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });

// Loaded after dotenv so db.js sees MONGODB_URI / MONGODB_DB
const { ensureDb } = await import('../src/lib/db.js');

console.log('Initializing VedNetra Database (MongoDB)...');
try {
  const connected = await ensureDb();
  if (connected) {
    console.log('Database initialization completed successfully.');
    process.exit(0);
  } else {
    console.log('MongoDB was not reached. Set MONGODB_URI in web/.env.local and check network access.');
    process.exit(1);
  }
} catch (err) {
  console.error('Fatal initialization error:', err);
  process.exit(1);
}
