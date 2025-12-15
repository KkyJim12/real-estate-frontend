# Migration to Vercel Database

This project has been updated to use Vercel KV (Key-Value store) for data storage in production, while maintaining JSON file storage for local development.

## Current Setup

- **Development**: Data is stored in JSON files in the `data/` directory
- **Production**: Data is stored in Vercel KV database
- **Automatic switching**: The system automatically detects the environment and uses the appropriate storage method

## Migration Process

### 1. Deploy to Vercel

First, deploy your application to Vercel. The system will automatically use Vercel KV in production.

### 2. Set up Vercel KV

1. Go to your Vercel dashboard
2. Navigate to your project
3. Go to the "Storage" tab
4. Create a new KV database
5. The environment variables will be automatically added to your project

### 3. Migrate Existing Data

You have two options to migrate your existing JSON data to Vercel KV:

#### Option A: Using the Admin Panel (Recommended)

1. Access your admin panel in production
2. Look for a "Migrate Data" button or section
3. Click to trigger the migration
4. The system will automatically transfer all data from JSON files to Vercel KV

#### Option B: Using the Migration Script

1. Run the migration script locally (requires Vercel KV credentials):
   ```bash
   node scripts/migrate-to-vercel-kv.js
   ```

### 4. Verify Migration

After migration, verify that your data appears correctly on your live site:

- Check that articles are displaying
- Verify carousel slides are working
- Confirm projects are showing

## Data Collections

The following collections will be migrated:

- **articles**: All blog posts and news articles
- **carousel**: Homepage carousel slides
- **projects**: Real estate projects

## Environment Variables

The following environment variables are automatically set by Vercel KV:

- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

## Benefits of Vercel KV

1. **Scalability**: Better performance for production workloads
2. **Reliability**: Managed database with automatic backups
3. **Speed**: Fast key-value operations
4. **Integration**: Seamless integration with Vercel platform

## Development Workflow

- **Local development**: Continue using JSON files as before
- **Production**: Data is automatically stored in Vercel KV
- **No code changes needed**: The system handles the switching automatically

## Troubleshooting

### Migration Issues

If migration fails:

1. Check Vercel KV is properly set up
2. Verify environment variables are present
3. Check the migration logs in Vercel Functions
4. Try running the migration script manually

### Data Not Appearing

If data doesn't appear after migration:

1. Check the Vercel KV dashboard to confirm data was stored
2. Verify the API endpoints are working
3. Check browser console for any errors
4. Review Vercel function logs

## Rollback

If you need to rollback to JSON files:

1. Set environment variable `FORCE_JSON_MODE=true` in Vercel
2. Redeploy the application
3. The system will switch back to JSON file mode

## Support

For issues with the migration process, check:

1. Vercel function logs
2. Browser developer console
3. Network requests in browser dev tools
4. Vercel KV dashboard for data verification