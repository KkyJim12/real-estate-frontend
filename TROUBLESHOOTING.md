# Troubleshooting Guide

## Projects Backoffice Not Working

### Issue: Cannot access `/admin/projects`

**Solutions:**

1. **Restart the development server**
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

2. **Clear browser cache and cookies**
   - Open DevTools (F12)
   - Go to Application → Storage
   - Click "Clear site data"
   - Refresh the page

3. **Check if you're logged in**
   - Navigate to `/admin/login`
   - Login with credentials
   - Should redirect to `/admin/projects`

4. **Verify API endpoints**
   - Open browser DevTools → Network tab
   - Try to access `/admin/projects`
   - Check for any 401 or 500 errors
   - If 401: You need to login
   - If 500: Check server console for errors

5. **Check server console**
   - Look for any error messages
   - Common issues:
     - Database connection errors
     - Missing dependencies
     - Port conflicts

### Issue: Projects not showing on homepage

**Solutions:**

1. **Create a project first**
   - Login to admin panel
   - Go to `/admin/projects`
   - Click "Create Project"
   - Fill in all required fields
   - Make sure "Active" is checked
   - Save the project

2. **Check project status**
   - Edit the project
   - Verify "Active" checkbox is checked
   - Save changes

3. **Verify API response**
   - Open browser DevTools → Network tab
   - Refresh homepage
   - Look for `/api/public/projects` request
   - Check the response data
   - Should return array of active projects

4. **Check browser console**
   - Look for JavaScript errors
   - Common issues:
     - Failed to fetch
     - CORS errors
     - Network errors

### Issue: Cannot create/edit projects

**Solutions:**

1. **Check authentication**
   - Make sure you're logged in
   - Session might have expired
   - Try logging out and back in

2. **Verify image upload**
   - Make sure image URL is valid
   - Or upload an image file
   - Check file size (should be < 10MB)
   - Supported formats: JPG, PNG, WebP

3. **Check required fields**
   - Title (required)
   - Description (required)
   - Image (required)
   - All must be filled

4. **Check server logs**
   - Look for error messages
   - Database write errors
   - Permission issues

### Issue: Images not loading

**Solutions:**

1. **Check image URL**
   - Make sure URL is accessible
   - Try opening URL in new tab
   - Should load the image

2. **Verify domain whitelist**
   - Check `nuxt.config.ts`
   - Look for `image.domains`
   - Add your image domain if missing:
   ```typescript
   image: {
     domains: ["emeraldbaypattaya.com", "your-domain.com"],
   }
   ```

3. **Use image upload**
   - Instead of URL, upload file
   - Click "Upload Image" button
   - Select image file
   - Wait for upload to complete

### Issue: 401 Unauthorized errors

**Solutions:**

1. **Login again**
   - Go to `/admin/login`
   - Enter credentials
   - Should set session cookie

2. **Check cookies**
   - Open DevTools → Application → Cookies
   - Look for `admin-session` cookie
   - Value should be "authenticated"
   - If missing, login again

3. **Clear cookies and login**
   - Clear all cookies
   - Close browser
   - Open again and login

### Issue: Database errors

**Solutions:**

1. **Development (JSON files)**
   - Check `data/` directory exists
   - Should have `projects.json` file
   - If missing, will be created automatically

2. **Production (Vercel KV)**
   - Check Vercel KV is set up
   - Verify environment variables
   - See `VERCEL_SETUP.md`

3. **Restart server**
   - Stop and restart dev server
   - Database connection will reinitialize

## General Troubleshooting Steps

### 1. Check File Structure

Verify all files exist:
```
server/api/projects/
├── index.get.ts
├── index.post.ts
├── [id].get.ts
├── [id].put.ts
└── [id].delete.ts

server/api/public/
└── projects.get.ts

app/pages/admin/projects/
├── index.vue
├── create.vue
└── edit/
    └── [id].vue
```

### 2. Check Dependencies

Make sure all packages are installed:
```bash
npm install
```

### 3. Check Environment

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm run preview
```

### 4. Check Browser Compatibility

- Use modern browser (Chrome, Firefox, Edge, Safari)
- Enable JavaScript
- Disable ad blockers
- Clear cache

### 5. Check Network

- Stable internet connection
- No firewall blocking
- No proxy issues
- Check if localhost:3000 is accessible

## Common Error Messages

### "Unauthorized - Please login"
**Solution:** Login at `/admin/login`

### "Project not found"
**Solution:** Check project ID in URL, or project was deleted

### "Failed to create project"
**Solution:** Check all required fields are filled, check server logs

### "Failed to load projects"
**Solution:** Check API endpoint, check database connection

### "Image upload failed"
**Solution:** Check file size, format, and network connection

## Getting Help

If issues persist:

1. **Check server console** for detailed error messages
2. **Check browser console** for JavaScript errors
3. **Check Network tab** for failed requests
4. **Review documentation**:
   - `PROJECTS_GUIDE.md`
   - `DEPLOYMENT.md`
   - `STORAGE.md`

## Quick Fixes

### Reset Everything

```bash
# Stop server
# Delete data directory
rm -rf data/

# Clear node modules
rm -rf node_modules/
rm -rf .nuxt/

# Reinstall
npm install

# Restart
npm run dev
```

### Reset Admin Session

1. Open DevTools (F12)
2. Go to Application → Cookies
3. Delete `admin-session` cookie
4. Refresh page
5. Login again

### Reset Database (Development)

```bash
# Delete data files
rm -rf data/

# Restart server (will recreate)
npm run dev
```

## Still Not Working?

1. Check all files were created correctly
2. Verify no typos in file names
3. Make sure server is running
4. Try different browser
5. Check if port 3000 is available
6. Review all error messages carefully
