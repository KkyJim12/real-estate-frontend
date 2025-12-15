# Deployment Guide

This guide will help you deploy your real estate website to Vercel with database migration.

## Prerequisites

- Vercel account
- GitHub repository with your code
- Existing JSON data files in the `data/` directory

## Step 1: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings (should auto-detect Nuxt.js)
5. Click "Deploy"

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts
```

## Step 2: Set up Vercel KV Database

1. Go to your project dashboard on Vercel
2. Navigate to the "Storage" tab
3. Click "Create Database"
4. Select "KV" (Key-Value store)
5. Choose a name for your database (e.g., "real-estate-db")
6. Click "Create"

The following environment variables will be automatically added to your project:
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

## Step 3: Migrate Your Data

After deployment, you have two options to migrate your existing JSON data:

### Option A: Using Admin Panel (Recommended)

1. Visit your deployed site: `https://your-project.vercel.app`
2. Go to the admin panel: `https://your-project.vercel.app/admin`
3. Log in with your admin credentials
4. Navigate to "Settings" in the sidebar
5. Click "Start Migration" in the Database Migration section
6. Wait for the migration to complete

### Option B: Using Migration Script

If you have the Vercel CLI and environment variables set up locally:

```bash
# Set environment variables locally (get from Vercel dashboard)
export KV_REST_API_URL="your-kv-url"
export KV_REST_API_TOKEN="your-kv-token"

# Run migration
npm run migrate
```

## Step 4: Verify Deployment

1. Visit your live site
2. Check that all content is displaying correctly:
   - Homepage carousel
   - Articles/news section
   - Projects section
3. Test the admin panel functionality

## Environment Variables

Your Vercel project should have these environment variables:

### Automatically Set (by Vercel KV)
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

### Manual Configuration (if needed)
- `NODE_ENV=production` (usually set automatically)
- Any custom API keys or configuration

## Troubleshooting

### Migration Issues

**Problem**: Migration fails with "Migration only available in production environment"
**Solution**: Ensure you're running the migration on the deployed Vercel site, not locally.

**Problem**: Migration fails with KV errors
**Solution**: 
1. Check that Vercel KV is properly set up
2. Verify environment variables are present
3. Check Vercel function logs for detailed errors

### Data Not Appearing

**Problem**: Site shows no content after migration
**Solution**:
1. Check Vercel KV dashboard to confirm data was stored
2. Review Vercel function logs for API errors
3. Test API endpoints directly: `/api/public/articles`, `/api/public/carousel`, `/api/public/projects`

### Admin Panel Issues

**Problem**: Can't access admin panel
**Solution**:
1. Ensure admin authentication is properly configured
2. Check that admin API routes are deployed
3. Verify admin credentials

## Performance Optimization

After deployment, consider these optimizations:

1. **Image Optimization**: Ensure all images are optimized and using Nuxt Image
2. **Caching**: Vercel automatically handles caching, but you can configure custom cache headers
3. **CDN**: Vercel provides global CDN automatically
4. **Monitoring**: Set up Vercel Analytics for performance monitoring

## Maintenance

### Regular Tasks

1. **Backup Data**: Regularly export data from Vercel KV
2. **Monitor Performance**: Check Vercel Analytics and function logs
3. **Update Dependencies**: Keep packages up to date
4. **Security**: Regularly review and update admin credentials

### Updating Content

- Use the admin panel to manage articles, projects, and carousel slides
- Changes are immediately reflected on the live site
- No need to redeploy for content updates

## Support

For deployment issues:

1. Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
2. Review Vercel function logs in the dashboard
3. Check browser console for client-side errors
4. Verify API endpoints are working correctly

## Rollback Plan

If you need to rollback to JSON files:

1. Set environment variable `FORCE_JSON_MODE=true` in Vercel
2. Redeploy the application
3. The system will switch back to JSON file mode
4. You may need to manually update JSON files via admin panel or direct file editing