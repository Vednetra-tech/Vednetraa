import { testConnectionAndInit } from '../config/db.js';

console.log('Initializing VedNetra Database...');
testConnectionAndInit()
  .then((connected) => {
    if (connected) {
      console.log('Database initialization completed successfully.');
      process.exit(0);
    } else {
      console.log('PostgreSQL was not reached. Ensure PostgreSQL server is running and .env contains valid credentials.');
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error('Fatal initialization error:', err);
    process.exit(1);
  });
