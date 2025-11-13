# Real Estate CMS

A modern Content Management System built with Nuxt 4, featuring article management, carousel management, and image uploads.

## Features

- 🔐 **Admin Authentication** - Secure login system
- 📝 **Article Management** - Full CRUD for news articles with rich text editor (Tiptap)
- 🎠 **Carousel Management** - Manage homepage carousel slides
- 🖼️ **Image Upload** - Upload images to Vercel Blob or local storage
- 📱 **Responsive Design** - Mobile-friendly admin interface
- 🎨 **Modern UI** - Clean and professional design with Tailwind CSS

## Tech Stack

- **Framework**: Nuxt 4
- **UI**: Nuxt UI, Tailwind CSS
- **Editor**: Tiptap (Rich text editor)
- **Storage**: Vercel Blob (images), JSON files (data)
- **Icons**: Font Awesome via Nuxt Icon

## Quick Start

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000/admin/login`

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
├── app/
│   ├── components/          # Vue components
│   │   ├── AdminLayout.vue  # Admin panel layout with sidebar
│   │   ├── ContentEditor.vue # Tiptap rich text editor
│   │   └── ImageUpload.vue  # Image upload component
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── login.vue    # Login page
│   │   │   ├── articles/    # Article management
│   │   │   └── carousel/    # Carousel management
│   │   └── index.vue        # Homepage
│   └── middleware/
│       └── auth.ts          # Client-side auth middleware
├── server/
│   ├── api/
│   │   ├── auth/           # Authentication endpoints
│   │   ├── articles/       # Article CRUD endpoints
│   │   ├── carousel/       # Carousel CRUD endpoints
│   │   └── upload/         # Image upload endpoint
│   └── middleware/
│       └── auth.ts         # Server-side auth middleware
├── data/                   # JSON data storage
│   ├── articles.json
│   └── carousel.json
└── public/
    └── uploads/           # Local image uploads (dev only)
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/check` - Check authentication status

### Articles
- `GET /api/articles` - Get all articles
- `POST /api/articles` - Create article
- `GET /api/articles/:id` - Get single article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article

### Carousel
- `GET /api/carousel` - Get all slides
- `POST /api/carousel` - Create slide
- `GET /api/carousel/:id` - Get single slide
- `PUT /api/carousel/:id` - Update slide
- `DELETE /api/carousel/:id` - Delete slide

### Upload
- `POST /api/upload/image` - Upload image

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/your-repo)

1. Click the button above or push to GitHub
2. Import your repository in Vercel
3. Add environment variable: `BLOB_READ_WRITE_TOKEN`
4. Deploy!

## Environment Variables

Create a `.env` file in the root directory:

```env
# Vercel Blob Storage (required for production)
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here

# Node Environment
NODE_ENV=development
```

## Development

### Image Upload
- **Local**: Images stored in `public/uploads/`
- **Production**: Images stored in Vercel Blob

### Data Storage
- Currently uses JSON files in `data/` directory
- For production, consider migrating to a database

## Features in Detail

### Article Management
- Rich text editor with formatting options
- Image upload for featured images
- Create, read, update, delete operations
- Image embedding in content

### Carousel Management
- Upload carousel images
- Set display order
- Active/inactive status
- Optional title and description

### Authentication
- Session-based authentication
- HTTP-only cookies
- Protected API routes
- Client and server-side middleware

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues and questions, please open an issue on GitHub.
