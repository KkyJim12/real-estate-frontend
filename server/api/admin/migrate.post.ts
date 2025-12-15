import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  try {
    // Check if we're in production (Vercel environment)
    const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
    
    if (!isProduction) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Migration only available in production environment'
      });
    }

    const dataDir = path.join(process.cwd(), 'data');
    const collections = ['articles', 'carousel', 'projects'];
    const results = [];

    for (const collection of collections) {
      const filePath = path.join(dataDir, `${collection}.json`);
      
      if (!fs.existsSync(filePath)) {
        results.push({
          collection,
          status: 'skipped',
          message: 'File not found'
        });
        continue;
      }
      
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        await kv.set(collection, data);
        
        // Verify the migration
        const verifyData = await kv.get(collection);
        const success = verifyData && Array.isArray(verifyData) && verifyData.length === data.length;
        
        results.push({
          collection,
          status: success ? 'success' : 'error',
          itemCount: data.length,
          message: success ? 'Migration successful' : 'Verification failed'
        });
        
      } catch (error) {
        results.push({
          collection,
          status: 'error',
          message: error.message
        });
      }
    }

    return {
      success: true,
      message: 'Migration completed',
      results
    };

  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Migration failed'
    });
  }
});