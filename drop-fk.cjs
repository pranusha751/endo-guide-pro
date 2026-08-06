const { Client } = require('pg');

async function dropConstraint() {
  const client = new Client({
    connectionString: 'postgresql://postgres.vllvgwreywczblwedhzx:pranusunny2910@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true'
  });
  
  try {
    await client.connect();
    console.log('Connected to DB');
    await client.query('ALTER TABLE "Case" DROP CONSTRAINT IF EXISTS "Case_userId_fkey";');
    console.log('Successfully dropped legacy FK constraint "Case_userId_fkey" from "Case" table.');
  } catch (err) {
    console.error('Error dropping constraint:', err);
  } finally {
    await client.end();
  }
}

dropConstraint();
