# Deployment Guide

## Deploying to Vercel

### Prerequisites
1. A Vercel account
2. Vercel CLI installed (optional): `npm i -g vercel`

### Setup Steps

#### 1. Create Vercel Stores

**A. Create Vercel KV (Redis) Store**
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Storage** → **Create Database**
3. Select **KV** (Redis) storage
4. Create a new KV store
5. Connect it to your project
6. The environment variables will be automatically added

**B. Create Vercel Blob Store**
1. In the same **Storage** section
2. Click **Create Database** again
3. Select **Blob** storage
4. Create a new Blob store
5. Connect it to your project
6. Copy the `BLOB_READ_WRITE_TOKEN` from the store settings

#### 2. Configure Environment Variables
The following environment variables should be automatically added when you connect the stores:

```
# Vercel KV (automatically added)
KV_REST_API_URL=https://...
KV_REST_API_TOKEN=...
KV_REST_API_READ_ONLY_TOKEN=...

# Vercel Blob (automatically added)
BLOB_READ_WRITE_TOKEN=vercel_blob_...
```

#### 3. Deploy

**Option A: Using Vercel CLI**
```bash
vercel
```

**Option B: Using Git Integration**
1. Push your code to GitHub/GitLab/Bitbucket
2. Import the repository in Vercel
3. Vercel will automatically deploy

### Important Notes

- **Image Storage**: Images are stored in Vercel Blob when deployed to Vercel
- **Local Development**: Images are stored in `public/uploads/` when running locally
- **Data Storage**: Articles and carousel data are stored in JSON files in the `data/` directory
- **Database**: For production, consider migrating from JSON files to a proper database (PostgreSQL, MongoDB, etc.)

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `KV_REST_API_URL` | Vercel KV REST API URL | Yes (for Vercel) |
| `KV_REST_API_TOKEN` | Vercel KV REST API token | Yes (for Vercel) |
| `KV_REST_API_READ_ONLY_TOKEN` | Vercel KV read-only token | Yes (for Vercel) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token | Yes (for Vercel) |
| `NODE_ENV` | Environment (development/production) | No |

### Post-Deployment

1. Visit your deployed site
2. Navigate to `/admin/login`
3. Login with credentials: `admin` / `admin123`
4. Start managing your content!

### Troubleshooting

**Images not uploading:**
- Check if `BLOB_READ_WRITE_TOKEN` is set correctly
- Verify the Blob store is active in Vercel dashboard
- Check browser console for errors

**Authentication issues:**
- Clear browser cookies
- Check if cookies are enabled
- Verify the site is using HTTPS (required for secure cookies)

**Data not persisting:**
- Make sure Vercel KV is properly connected
- Check if KV environment variables are set
- Verify the KV store is active in Vercel dashboard

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file (optional for local storage)
4. Run development server: `npm run dev`
5. Access admin panel: `http://localhost:3000/admin/login`

## Production Recommendations

For a production-ready application, consider:

1. **Authentication**: Implement proper user management with hashed passwords
2. **Image Optimization**: Add image compression and optimization
3. **CDN**: Use a CDN for static assets
4. **Backup**: Implement automated backups for Vercel KV data
5. **Monitoring**: Add error tracking (Sentry, LogRocket, etc.)
6. **Rate Limiting**: Add rate limiting for API endpoints
7. **CORS**: Configure CORS properly for your domain
8. **Database Migration**: For larger datasets, consider migrating to Vercel Postgres
