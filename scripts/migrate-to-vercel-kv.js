#!/usr/bin/env node

/**
 * Migration script to move data from JSON files to Vercel KV
 * Run this script after deploying to Vercel to migrate existing data
 */

import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '..', 'data');

const collections = ['articles', 'carousel', 'projects'];

async function migrateData() {
  console.log('🚀 Starting migration to Vercel KV...');
  
  for (const collection of collections) {
    const filePath = path.join(dataDir, `${collection}.json`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File ${collection}.json not found, skipping...`);
      continue;
    }
    
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      console.log(`📄 Migrating ${data.length} items from ${collection}.json...`);
      
      await kv.set(collection, data);
      console.log(`✅ Successfully migrated ${collection} to Vercel KV`);
      
      // Verify the migration
      const verifyData = await kv.get(collection);
      if (verifyData && Array.isArray(verifyData) && verifyData.length === data.length) {
        console.log(`✅ Verification successful for ${collection}`);
      } else {
        console.error(`❌ Verification failed for ${collection}`);
      }
      
    } catch (error) {
      console.error(`❌ Error migrating ${collection}:`, error);
    }
  }
  
  console.log('🎉 Migration completed!');
}

// Run migration if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateData().catch(console.error);
}

export { migrateData };