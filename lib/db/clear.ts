import 'dotenv/config';
import { Client } from 'pg';

async function clearDatabase() {
  console.log('Completely resetting database to initial state...');

  // Set SSL options based on environment
  const sslConfig = process.env.NODE_ENV === 'development' 
    ? { rejectUnauthorized: false } // Development mode: accept self-signed certs
    : true; // Production mode: require valid certificates

  // Create a client
  const client = new Client({
    connectionString: process.env.DATABASE_URL!,
    ssl: sslConfig
  });

  try {
    // Connect to the database
    await client.connect();
    console.log('Connected to database, preparing to drop all objects...');
    
    // Get current schema (default is 'public')
    const schemaResult = await client.query(`
      SELECT current_schema();
    `);
    const currentSchema = schemaResult.rows[0].current_schema;
    console.log(`Current schema: ${currentSchema}`);

    // First disable triggers to avoid constraint violations during table drops
    await client.query(`SET session_replication_role = 'replica';`);
    
    // Drop all tables, views, functions, etc. in a single transaction
    await client.query('BEGIN');

    // 1. Drop all tables (cascade will handle dependencies)
    console.log('Dropping all tables...');
    const dropTablesResult = await client.query(`
      DO $$ DECLARE
        r RECORD;
      BEGIN
        FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = '${currentSchema}') LOOP
          EXECUTE 'DROP TABLE IF EXISTS "' || r.tablename || '" CASCADE';
        END LOOP;
      END $$;
    `);

    // 2. Drop all sequences
    console.log('Dropping all sequences...');
    await client.query(`
      DO $$ DECLARE
        r RECORD;
      BEGIN
        FOR r IN (SELECT sequence_name FROM information_schema.sequences WHERE sequence_schema = '${currentSchema}') LOOP
          EXECUTE 'DROP SEQUENCE IF EXISTS "' || r.sequence_name || '" CASCADE';
        END LOOP;
      END $$;
    `);

    // 3. Drop all views
    console.log('Dropping all views...');
    await client.query(`
      DO $$ DECLARE
        r RECORD;
      BEGIN
        FOR r IN (SELECT table_name FROM information_schema.views WHERE table_schema = '${currentSchema}') LOOP
          EXECUTE 'DROP VIEW IF EXISTS "' || r.table_name || '" CASCADE';
        END LOOP;
      END $$;
    `);

    // 4. Drop all functions
    console.log('Dropping all functions...');
    await client.query(`
      DO $$ DECLARE
        r RECORD;
      BEGIN
        FOR r IN (SELECT routine_name, routine_schema FROM information_schema.routines WHERE routine_type = 'FUNCTION' AND routine_schema = '${currentSchema}') LOOP
          EXECUTE 'DROP FUNCTION IF EXISTS "' || r.routine_schema || '"."' || r.routine_name || '" CASCADE';
        END LOOP;
      END $$;
    `);

    // 5. Drop all types
    console.log('Dropping all custom types...');
    await client.query(`
      DO $$ DECLARE
        r RECORD;
      BEGIN
        FOR r IN (SELECT typname FROM pg_type t JOIN pg_namespace n ON t.typnamespace = n.oid WHERE n.nspname = '${currentSchema}' AND typtype = 'c') LOOP
          EXECUTE 'DROP TYPE IF EXISTS "' || r.typname || '" CASCADE';
        END LOOP;
      END $$;
    `);

    await client.query('COMMIT');
    
    // Re-enable triggers
    await client.query(`SET session_replication_role = 'origin';`);
    
    console.log('Database has been completely reset to initial state');
  } catch (error) {
    console.error('Error resetting database:', error);
    // Try to roll back the transaction if an error occurred
    try {
      await client.query('ROLLBACK');
    } catch (rollbackError) {
      console.error('Error rolling back transaction:', rollbackError);
    }
    process.exit(1);
  } finally {
    // Always close the client connection
    await client.end();
    console.log('Database connection closed');
  }
}

// Run the clear function
clearDatabase()
  .then(() => {
    console.log('Database reset operation completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Database reset operation failed:', error);
    process.exit(1);
  }); 