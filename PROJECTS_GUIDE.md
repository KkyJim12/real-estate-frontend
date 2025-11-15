# Projects Management Guide

## Overview

The projects feature allows you to manage business projects (like Ramada, Convilla) from the admin panel. Projects are displayed dynamically on the homepage in the "Our Business" section.

## Features

### Admin Panel
- ✅ Create, edit, and delete projects
- ✅ Upload project images
- ✅ Set display order
- ✅ Active/inactive status
- ✅ Custom links for each project
- ✅ Rich descriptions

### Frontend Display
- ✅ Dynamic project loading from backend
- ✅ Alternating left/right layout
- ✅ Responsive design
- ✅ Image optimization
- ✅ Custom links per project

## Project Structure

### Project Fields

```typescript
{
  id: string;              // Unique identifier
  title: string;           // Project name (e.g., "RAMADA EMERALD BAY")
  description: string;     // Project description (supports line breaks)
  image: string;           // Project image URL
  link: string;            // Link URL (default: "/")
  order: number;           // Display order (lower = first)
  active: boolean;         // Visibility status
  createdAt: string;       // Creation timestamp
  updatedAt: string;       // Last update timestamp
}
```

## API Endpoints

### Admin Endpoints (Protected)

#### List All Projects
```
GET /api/projects
```
Returns all projects (active and inactive)

#### Get Single Project
```
GET /api/projects/[id]
```

#### Create Project
```
POST /api/projects
Body: {
  title: string;
  description: string;
  image: string;
  link?: string;
  order?: number;
  active?: boolean;
}
```

#### Update Project
```
PUT /api/projects/[id]
Body: Partial project fields
```

#### Delete Project
```
DELETE /api/projects/[id]
```

### Public Endpoint

#### Get Active Projects
```
GET /api/public/projects
```
Returns only active projects, sorted by order

## Admin Pages

### Projects List (`/admin/projects`)

**Features**:
- Table view with project info
- Image thumbnails
- Status badges (Active/Inactive)
- Quick edit and delete actions
- Create new project button

**Actions**:
- Click "Create Project" to add new
- Click edit icon to modify
- Click delete icon to remove (with confirmation)

### Create Project (`/admin/projects/create`)

**Form Fields**:
1. **Project Title** * (required)
   - Example: "RAMADA EMERALD BAY"
   
2. **Description** * (required)
   - Multi-line text
   - Supports line breaks
   - Example: "The allure of silence on the prime spot.\nThe new treasure of investment..."

3. **Project Image** * (required)
   - Upload image or enter URL
   - Recommended size: 800x600px or larger
   - Formats: JPG, PNG, WebP

4. **Link URL** (optional)
   - Where the "View More" button links to
   - Examples: `/ramada`, `https://example.com`
   - Default: `/`

5. **Display Order** (optional)
   - Number (0, 1, 2, ...)
   - Lower numbers appear first
   - Default: 0

6. **Active Status** (checkbox)
   - Checked: Visible on website
   - Unchecked: Hidden from website
   - Default: Checked

### Edit Project (`/admin/projects/edit/[id]`)

Same form as create, pre-filled with existing data.

## Homepage Integration

### Display Logic

Projects are displayed in the "Our Business" section:

1. **Fetch**: Loads active projects from `/api/public/projects`
2. **Sort**: Ordered by `order` field (ascending)
3. **Layout**: Alternating left/right image placement
   - Even index (0, 2, 4...): Image on right
   - Odd index (1, 3, 5...): Image on left

### Layout Example

```
Project 1: [Content] [Image]  (index 0 - even)
Project 2: [Image] [Content]  (index 1 - odd)
Project 3: [Content] [Image]  (index 2 - even)
```

### Responsive Behavior

**Mobile/Tablet**:
- Single column layout
- Image always on top
- Content below
- Centered alignment

**Desktop**:
- Two-column grid
- Alternating image position
- Left-aligned text
- Full-width images

## Usage Guide

### Creating Your First Project

1. **Login** to admin panel (`/admin/login`)
2. **Navigate** to Projects (`/admin/projects`)
3. **Click** "Create Project"
4. **Fill in** the form:
   ```
   Title: RAMADA EMERALD BAY
   Description: The allure of silence on the prime spot.
   The new treasure of investment on the kingdom of perfect ease and privacy.
   Image: [Upload or paste URL]
   Link: /ramada
   Order: 0
   Active: ✓ Checked
   ```
5. **Click** "Create Project"
6. **View** on homepage

### Managing Display Order

Projects are displayed in order from lowest to highest:

```
Order 0: First project
Order 1: Second project
Order 2: Third project
```

**To reorder**:
1. Edit each project
2. Change the order number
3. Save changes
4. Refresh homepage to see new order

### Hiding a Project

To temporarily hide a project without deleting:

1. Edit the project
2. Uncheck "Active" checkbox
3. Save changes
4. Project won't appear on homepage

### Best Practices

#### Images
- **Size**: 800x600px minimum
- **Format**: WebP for best performance
- **Quality**: High quality, will be optimized automatically
- **Aspect Ratio**: 4:3 or 16:9 recommended

#### Descriptions
- **Length**: 2-4 sentences ideal
- **Line Breaks**: Use Enter key for new lines
- **Tone**: Professional and engaging
- **Focus**: Highlight key features

#### Titles
- **Format**: ALL CAPS for consistency
- **Length**: 2-5 words
- **Clear**: Descriptive project name

#### Links
- **Internal**: Use `/page-name` format
- **External**: Use full URL with `https://`
- **Test**: Always test links after creating

## File Structure

```
server/api/projects/
├── index.get.ts           # List all projects
├── index.post.ts          # Create project
├── [id].get.ts           # Get single project
├── [id].put.ts           # Update project
└── [id].delete.ts        # Delete project

server/api/public/
└── projects.get.ts       # Public projects endpoint

app/pages/admin/projects/
├── index.vue             # Projects list
├── create.vue            # Create project
└── edit/
    └── [id].vue         # Edit project

app/pages/
└── index.vue            # Homepage (displays projects)
```

## Troubleshooting

### Projects Not Showing on Homepage

**Problem**: Created project doesn't appear

**Solutions**:
1. Check "Active" status is checked
2. Verify project has an image
3. Check browser console for errors
4. Refresh the page
5. Check API endpoint: `/api/public/projects`

### Images Not Loading

**Problem**: Project images don't display

**Solutions**:
1. Verify image URL is accessible
2. Check image domain in `nuxt.config.ts` → `image.domains`
3. Try uploading image instead of URL
4. Check image file format (JPG, PNG, WebP)

### Wrong Display Order

**Problem**: Projects appear in wrong order

**Solutions**:
1. Check order numbers (lower = first)
2. Ensure no duplicate order numbers
3. Edit projects to adjust order
4. Refresh homepage after changes

### Layout Breaking

**Problem**: Project layout looks broken

**Solutions**:
1. Check image aspect ratio
2. Verify description length
3. Test on different screen sizes
4. Check for very long titles

## Migration from Hardcoded Projects

If you have existing hardcoded projects (Ramada, Convilla):

1. **Create projects** in admin panel with same content
2. **Upload images** from existing URLs
3. **Set order**: Ramada = 0, Convilla = 1
4. **Test** on homepage
5. **Remove** old hardcoded sections (already done)

## Future Enhancements

Potential features to add:

- [ ] Project categories/tags
- [ ] Multiple images per project
- [ ] Project detail pages
- [ ] Gallery view
- [ ] Video support
- [ ] Multi-language descriptions
- [ ] SEO meta fields
- [ ] Featured projects
- [ ] Project statistics

## Resources

- Admin Panel: `/admin/projects`
- API Documentation: See API endpoints above
- Image Upload: Uses same system as articles
- Database: Vercel KV (production) or JSON files (development)
