import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'vednetra';

if (!uri) {
  console.error('MONGODB_URI is not set. Add it to web/.env.local.');
  process.exit(1);
}

// Safety guard: this script drops the database, so only test databases are allowed
if (!dbName.toLowerCase().includes('test')) {
  console.error(`Refusing to drop database "${dbName}". Set MONGODB_DB to a name containing "test" (e.g. vednetra_test).`);
  process.exit(1);
}

const client = new MongoClient(uri);

try {
  await client.connect();
  await client.db(dbName).dropDatabase();
  console.log(`Dropped test database "${dbName}". Run "npm run init-db" to re-seed it.`);
  process.exitCode = 0;
} catch (err) {
  console.error('Failed to reset test database:', err);
  process.exitCode = 1;
} finally {
  await client.close().catch(() => {});
}
