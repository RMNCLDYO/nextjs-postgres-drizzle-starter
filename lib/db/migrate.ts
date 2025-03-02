import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Client } from 'pg';
import { resolve } from 'path';

async function runMigrations() {
  console.log('Running migrations...');
  
  // Create a client
  const client = new Client({
    connectionString: process.env.DATABASE_URL!,
    ssl: true
  });
  
  // Connect to the database
  await client.connect();
  
  // Run migrations
  const db = drizzle(client);
  await migrate(db, { migrationsFolder: resolve('./lib/db/migrations') });
  
  // Disconnect from the database
  await client.end();
  
  console.log('Migrations completed successfully');
}

// Run migrations
runMigrations()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  }); 