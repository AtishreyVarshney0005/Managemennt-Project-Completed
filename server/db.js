const { Pool } = require('pg');
require('dotenv').config();

const requiredEnvVars = ['DB_USER', 'DB_HOST', 'DB_NAME', 'DB_PASSWORD', 'DB_PORT'];
const missingVars = requiredEnvVars.filter(v => !process.env[v]);

if (missingVars.length > 0) {
  console.error('❌ ERROR: Missing environment variables:', missingVars.join(', '));
  console.error('Check your .env file!');
  process.exit(1);
}

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.on('error', (err) => {
  console.error('🔴 Unexpected pool error:', err);
  process.exit(1);
});

pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('❌ DATABASE CONNECTION FAILED:', err.message);
    console.error('Make sure:');
    console.error('  1. PostgreSQL is running');
    console.error('  2. Database "inventory_db" exists');
    console.error('  3. Credentials in .env are correct');
    process.exit(1);
  } else {
    console.log('✅ Database connected successfully');
  }
});

module.exports = pool;