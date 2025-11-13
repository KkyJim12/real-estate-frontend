# Carousel Integration Guide

## Overview
The homepage carousel is now fully integrated with the backend CMS. Carousel slides are managed through the admin panel and automatically displayed on the frontend.

## How It Works

### Backend
- Carousel slides are stored in the database (Vercel KV in production, JSON files in development)
- Admin can manage slides at `/admin/carousel`
- Each slide has:
  - Image URL
  - Title (optional)
  - Description (optional)
  - Display order
  - Active/Inactive status

### Frontend
- Homepage fetches slides from `/api/public/carousel`
- Only **active** slides are displayed
- Slides are sorted by **display order** (ascending)
- Automatic fallback to placeholder images if API fails
- Loading state while fetching data
- Empty state if no slides available

## Managing Carousel Slides

### 1. Login to Admin Panel
```
URL: /admin/login
Username: admin
Password: admin123
```

### 2. Navigate to Carousel Management
```
URL: /admin/carousel
```

### 3. Add New Slide
- Click "Add Slide" button
- Upload image or enter image URL
- Set display order (0 = first, 1 = second, etc.)
- Set status (Active/Inactive)
- Save

### 4. Edit Existing Slide
- Click "Edit" button on any slide
- Update details
- Save changes

### 5. Delete Slide
- Click "Delete" button on any slide
- Confirm deletion

## Display Order

Slides are displayed in ascending order:
- Order 0 = First slide
- Order 1 = Second slide
- Order 2 = Third slide
- etc.

## Active/Inactive Status

- **Active**: Slide will be displayed on homepage
- **Inactive**: Slide will be hidden from homepage (but not deleted)

## API Endpoints

### Public Endpoint (No Authentication Required)
```
GET /api/public/carousel
```
Returns array of active carousel slides, sorted by order.

### Admin Endpoints (Authentication Required)
```
GET    /api/carousel          - Get all slides
POST   /api/carousel          - Create new slide
GET    /api/carousel/:id      - Get single slide
PUT    /api/carousel/:id      - Update slide
DELETE /api/carousel/:id      - Delete slide
```

## Features

### Frontend
- ✅ Automatic slide fetching
- ✅ Loading state
- ✅ Empty state
- ✅ Fallback to placeholder images
- ✅ Responsive design
- ✅ Auto-play (4 second delay)
- ✅ Navigation arrows
- ✅ Dot indicators

### Admin Panel
- ✅ Upload images
- ✅ Set display order
- ✅ Active/Inactive toggle
- ✅ Preview images
- ✅ Drag-free management

## Example Usage

### Add Homepage Carousel Slides

1. Go to `/admin/carousel`
2. Click "Add Slide"
3. Upload 3-5 images for your homepage
4. Set orders: 0, 1, 2, 3, 4
5. Make sure all are set to "Active"
6. Save each slide
7. Visit homepage to see your carousel!

## Troubleshooting

### Slides Not Showing
- Check if slides are set to "Active"
- Verify image URLs are valid
- Check browser console for errors
- Ensure you're logged in to admin panel

### Images Not Loading
- Verify image URLs are accessible
- Check image file size (should be < 5MB)
- Try re-uploading the image

### Order Not Working
- Make sure each slide has a unique order number
- Lower numbers appear first
- Refresh the page after changes

## Tips

1. **Image Size**: Use high-quality images (1920x1080 recommended)
2. **File Size**: Keep images under 2MB for faster loading
3. **Number of Slides**: 3-5 slides work best
4. **Update Frequency**: Update carousel regularly to keep content fresh
5. **Test on Mobile**: Always check how slides look on mobile devices

## Development

### Local Testing
```bash
npm run dev
```
Visit `http://localhost:3000` to see the carousel

### Production
Carousel automatically works on Vercel with Vercel KV storage.
