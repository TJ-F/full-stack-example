import { createDbConnection } from './config/db.js';

(async () => {
  try {
    const db = await createDbConnection();
    const [rows] = await db.query('SELECT 1');
    console.log('DB connection successful:', rows);
    process.exit(0);
  } catch (err) {
    console.error('DB test failed:', err.message);
    process.exit(1);
  }
})();