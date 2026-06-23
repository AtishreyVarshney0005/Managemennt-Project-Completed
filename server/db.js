const { Pool } = require('pg');
require('dotenv').config();

const useDatabaseUrl = Boolean(process.env.DATABASE_URL);
const poolConfig = useDatabaseUrl
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {
      user: process.env.DB_USER || process.env.PGUSER,
      host: process.env.DB_HOST || process.env.PGHOST,
      database: process.env.DB_NAME || process.env.PGDATABASE,
      password: process.env.DB_PASSWORD || process.env.PGPASSWORD,
      port: parseInt(process.env.DB_PORT || process.env.PGPORT, 10) || 5432,
    };

if (!useDatabaseUrl) {
  const requiredEnvVars = ['DB_USER', 'DB_HOST', 'DB_NAME', 'DB_PASSWORD', 'DB_PORT'];
  const requiredPgVars = ['PGUSER', 'PGHOST', 'PGDATABASE', 'PGPASSWORD', 'PGPORT'];
  const havePgVars = requiredPgVars.every(v => process.env[v]);

  if (!requiredEnvVars.every(v => process.env[v]) && !havePgVars) {
    const missingVars = requiredEnvVars.filter(v => !process.env[v]);
    console.error('❌ ERROR: Missing database environment variables.');
    console.error('Provide either DB_* vars or PG* vars in your environment.');
    console.error('Missing:', missingVars.join(', '));
    console.error('Check your .env file or Render environment settings.');
    process.exit(1);
  }
}

const pool = new Pool(poolConfig);

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