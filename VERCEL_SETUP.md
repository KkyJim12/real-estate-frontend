# Vercel Setup Guide

## Quick Setup for Vercel Deployment

### Step 1: Create Vercel Stores

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Navigate to Storage tab**
3. **Create TWO stores:**

#### A. Vercel KV (Redis) - For Data Storage
- Click "Create Database"
- Select "KV" (Redis)
- Name it (e.g., "cms-data")
- Click "Create"
- **Connect to your project** - This automatically adds environment variables

#### B. Vercel Blob - For Image Storage
- Click "Create Database" again
- Select "Blob"
- Name it (e.g., "cms-images")
- Click "Create"
- **Connect to your project** - This automatically adds environment variables

### Step 2: Deploy

**Option A: GitHub Integration (Recommended)**
1. Push your code to GitHub
2. Import repository in Vercel
3. Vercel will auto-detect Nuxt and deploy
4. The stores you connected will automatically work

**Option B: Vercel CLI**
```bash
npm i -g vercel
vercel
```

### Step 3: Verify Environment Variables

Go to your project settings → Environment Variables

You should see:
```
KV_REST_API_URL=https://...
KV_REST_API_TOKEN=...
KV_REST_API_READ_ONLY_TOKEN=...
BLOB_READ_WRITE_TOKEN=vercel_blob_...
```

### Step 4: Test Your Deployment

1. Visit your deployed URL
2. Go to `/admin/login`
3. Login with: `admin` / `admin123`
4. Create a test article
5. Upload an image
6. Verify everything works!

## How It Works

### Development (Local)
- **Data**: Stored in `data/` folder as JSON files
- **Images**: Stored in `public/uploads/` folder

### Production (Vercel)
- **Data**: Stored in Vercel KV (Redis)
- **Images**: Stored in Vercel Blob (CDN)

The system automatically detects the environment and uses the appropriate storage!

## Troubleshooting

### "Failed to save article" Error
- Make sure Vercel KV is connected to your project
- Check environment variables are set
- Redeploy after connecting stores

### Images Not Uploading
- Make sure Vercel Blob is connected
- Check `BLOB_READ_WRITE_TOKEN` is set
- Verify file size is under 5MB

### Data Not Persisting
- Verify KV environment variables are present
- Check KV store is active in dashboard
- Try redeploying

## Cost

- **Vercel KV**: Free tier includes 256MB storage
- **Vercel Blob**: Free tier includes 1GB storage
- **Bandwidth**: Free tier includes 100GB/month

Perfect for small to medium CMS projects!

## Migration from Local to Production

When you deploy to Vercel for the first time:
1. Your local data (JSON files) won't be transferred
2. You'll start with an empty database
3. You'll need to recreate your content in production

To migrate data:
1. Export your local JSON files from `data/` folder
2. Create a migration script or manually recreate content
3. Or use the admin panel to recreate articles/carousel

## Next Steps

After deployment:
1. Change the default admin password (currently hardcoded)
2. Add more admin users if needed
3. Set up custom domain in Vercel
4. Enable analytics in Vercel dashboard
5. Set up monitoring (Sentry, LogRocket, etc.)

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Try redeploying after connecting stores
