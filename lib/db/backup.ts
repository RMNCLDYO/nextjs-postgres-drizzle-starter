import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { Client } from 'pg';
import { usersTable } from './schema';

async function backupDatabase() {
  console.log('Starting database backup...');
  
  try {
    // Create backups directory if it doesn't exist
    const backupDir = path.join(process.cwd(), 'backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
      console.log(`Created backup directory: ${backupDir}`);
    }
    
    // Format current date for filename
    const now = new Date();
    const dateString = now.toISOString().replace(/[:.]/g, '-').replace('T', '_').split('Z')[0];
    const backupFileName = `backup_${dateString}.json`;
    const backupPath = path.join(backupDir, backupFileName);
    
    // Set SSL options based on environment
    const sslConfig = process.env.NODE_ENV === 'development' 
      ? { rejectUnauthorized: false } // Development mode: accept self-signed certs
      : true; // Production mode: require valid certificates
    
    // Connect to the database
    const client = new Client({
      connectionString: process.env.DATABASE_URL!,
      ssl: sslConfig
    });
    
    await client.connect();
    
    // Query all tables you want to back up
    const usersResult = await client.query('SELECT * FROM users');
    
    // Create a backup object with all data
    const backupData = {
      timestamp: now.toISOString(),
      tables: {
        users: usersResult.rows
      }
    };
    
    // Write to file
    fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2));
    
    // Close connection
    await client.end();
    
    console.log(`Database backup completed: ${backupPath}`);
    return backupPath;
  } catch (error) {
    console.error('Database backup failed:', error);
    throw error;
  }
}

// Run backup
backupDatabase()
  .then((backupPath) => {
    console.log(`Backup successfully created at: ${backupPath}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error('Backup process failed:', error);
    process.exit(1);
  }); 