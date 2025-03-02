import 'dotenv/config';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

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
    const backupFileName = `backup_${dateString}.sql`;
    const backupPath = path.join(backupDir, backupFileName);
    
    // Parse the DATABASE_URL
    const databaseUrl = new URL(process.env.DATABASE_URL!);
    const host = databaseUrl.hostname;
    const port = databaseUrl.port || '5432';
    const database = databaseUrl.pathname.substring(1); // Remove leading '/'
    const username = databaseUrl.username;
    const password = databaseUrl.password;
    
    // Set environment variables for pg_dump
    const env = { ...process.env, PGPASSWORD: password };
    
    // Build pg_dump command
    const command = `pg_dump -h ${host} -p ${port} -U ${username} -d ${database} -F p > "${backupPath}"`;
    
    // Execute pg_dump
    await execAsync(command, { env });
    
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