import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { usersTable } from './schema';

async function seedDatabase() {
  console.log('Seeding database...');

  // Create a client
  const client = new Client({
    connectionString: process.env.DATABASE_URL!,
    ssl: true
  });

  // Connect to the database
  await client.connect();
  const db = drizzle(client);

  // Clear existing data (optional, comment out if you don't want to clear)
  try {
    await db.delete(usersTable);
    console.log('Cleared existing users table data');
  } catch (error) {
    console.warn('Could not clear users table', error);
  }

  // Seed with initial data
  const sampleUsers = [
    {
      name: 'Alice Johnson',
      age: 28,
      email: 'alice@example.com',
    },
    {
      name: 'Bob Smith',
      age: 34,
      email: 'bob@example.com',
    },
    {
      name: 'Claire Davis',
      age: 26,
      email: 'claire@example.com',
    },
  ];

  try {
    for (const user of sampleUsers) {
      await db.insert(usersTable).values(user);
    }
    console.log(`Successfully seeded ${sampleUsers.length} users`);
  } catch (error) {
    console.error('Error seeding users:', error);
  }

  // Disconnect from the database
  await client.end();
  
  console.log('Database seeding completed');
}

// Run seed
seedDatabase()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  }); 