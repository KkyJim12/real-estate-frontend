# Articles/News Page Guide

## Overview

The articles feature provides a public-facing news/blog section integrated with the backend CMS. Users can browse articles and read full content with a responsive, SEO-friendly design.

## Features

### Articles List Page (`/articles`)
- ✅ Grid layout (1/2/3 columns responsive)
- ✅ Article cards with featured images
- ✅ Title, excerpt, and publish date
- ✅ Hover effects and smooth transitions
- ✅ Loading and empty states
- ✅ Multi-language support
- ✅ SEO optimized

### Article Detail Page (`/articles/[id]`)
- ✅ Full article content with rich text formatting
- ✅ Featured image display
- ✅ Author and publish date
- ✅ Social media sharing (Facebook, Twitter, LinkedIn)
- ✅ Back to articles navigation
- ✅ Responsive typography
- ✅ SEO meta tags

## API Endpoints

### Public Articles List
**Endpoint**: `GET /api/public/articles`

**Response**:
```json
[
  {
    "id": "article-id",
    "title": "Article Title",
    "content": "<p>HTML content...</p>",
    "excerpt": "Short description",
    "featuredImage": "https://...",
    "author": "Author Name",
    "status": "published",
    "publishedAt": "2024-01-01T00:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Features**:
- Returns only published articles
- Sorted by publish date (newest first)
- Filters out draft/unpublished content

### Single Article
**Endpoint**: `GET /api/public/articles/[id]`

**Response**:
```json
{
  "id": "article-id",
  "title": "Article Title",
  "content": "<p>Full HTML content...</p>",
  "excerpt": "Short description",
  "featuredImage": "https://...",
  "author": "Author Name",
  "status": "published",
  "publishedAt": "2024-01-01T00:00:00.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Handling**:
- 404: Article not found or not published
- 400: Invalid article ID
- 500: Server error

## File Structure

```
app/pages/articles/
├── index.vue           # Articles list page
└── [id].vue           # Article detail page

server/api/public/
├── articles.get.ts    # List all published articles
└── articles/
    └── [id].get.ts    # Get single article

i18n/locales/
├── en.json            # English translations
├── th.json            # Thai translations
└── zh.json            # Chinese translations
```

## Translations

### English (`en.json`)
```json
{
  "articles": {
    "title": "News & Articles",
    "subtitle": "Stay updated with our latest news and insights",
    "readMore": "Read More",
    "backToList": "Back to Articles",
    "loading": "Loading articles...",
    "noArticles": "No articles available at the moment",
    "publishedOn": "Published on",
    "by": "by",
    "relatedArticles": "Related Articles"
  }
}
```

### Thai (`th.json`)
```json
{
  "articles": {
    "title": "ข่าวสารและบทความ",
    "subtitle": "ติดตามข่าวสารและข้อมูลล่าสุดของเรา",
    "readMore": "อ่านเพิ่มเติม",
    "backToList": "กลับไปยังบทความ",
    "loading": "กำลังโหลดบทความ...",
    "noArticles": "ไม่มีบทความในขณะนี้",
    "publishedOn": "เผยแพร่เมื่อ",
    "by": "โดย",
    "relatedArticles": "บทความที่เกี่ยวข้อง"
  }
}
```

### Chinese (`zh.json`)
```json
{
  "articles": {
    "title": "新闻与文章",
    "subtitle": "了解我们的最新消息和见解",
    "readMore": "阅读更多",
    "backToList": "返回文章列表",
    "loading": "加载文章中...",
    "noArticles": "目前没有可用的文章",
    "publishedOn": "发布于",
    "by": "作者",
    "relatedArticles": "相关文章"
  }
}
```

## Usage

### Creating Articles

1. **Login to Admin Panel**: `/admin/login`
2. **Navigate to Articles**: `/admin/articles`
3. **Create New Article**: Click "Create Article"
4. **Fill in Details**:
   - Title
   - Content (rich text editor)
   - Featured image (optional)
   - Author name
   - Status (draft/published)
5. **Publish**: Set status to "published"

### Viewing Articles

**List Page**: Navigate to `/articles`
- Browse all published articles
- Click any article card to read more

**Detail Page**: Click article or go to `/articles/[id]`
- Read full article content
- Share on social media
- Navigate back to list

## Styling

### Article List Cards
- White background with shadow
- Hover effect: shadow increases
- Image hover: slight zoom effect
- Responsive grid: 1/2/3 columns

### Article Detail Page
- Maximum width: 4xl (896px)
- Prose styling for content
- Responsive typography
- Proper spacing and readability

### Content Styling
The article content supports:
- Headings (H1-H6)
- Paragraphs
- Lists (ordered/unordered)
- Links
- Images
- Blockquotes
- Code blocks

## SEO Optimization

### Meta Tags
```vue
useHead({
  title: 'Article Title - Emerald Bay Pattaya',
  meta: [
    { name: 'description', content: 'Article excerpt or description' },
  ],
});
```

### Image Optimization
```vue
<NuxtImg
  :src="article.featuredImage"
  :alt="article.title"
  loading="lazy"
  format="webp"
  quality="80"
/>
```

### Semantic HTML
- `<article>` for article content
- `<header>` for article header
- Proper heading hierarchy
- Alt text for images

## Social Sharing

### Supported Platforms
- **Facebook**: Share with image and title
- **Twitter**: Tweet with URL and title
- **LinkedIn**: Professional sharing

### Share URLs
```javascript
// Facebook
https://www.facebook.com/sharer/sharer.php?u=${articleUrl}

// Twitter
https://twitter.com/intent/tweet?url=${articleUrl}&text=${title}

// LinkedIn
https://www.linkedin.com/sharing/share-offsite/?url=${articleUrl}
```

## Responsive Design

### Mobile (< 768px)
- Single column layout
- Full-width cards
- Stacked navigation
- Touch-friendly buttons

### Tablet (768px - 1024px)
- 2-column grid
- Optimized spacing
- Readable typography

### Desktop (> 1024px)
- 3-column grid
- Maximum content width
- Hover effects
- Optimal reading experience

## Performance

### Image Loading
- **Lazy loading**: Below-the-fold images
- **WebP format**: Better compression
- **Quality**: 80 for list, 85 for detail
- **Responsive**: Appropriate sizes

### Data Fetching
- Client-side fetching with loading states
- Error handling
- Empty state handling
- Automatic retry on failure

## Best Practices

### Content Creation
1. **Use descriptive titles** - Clear and engaging
2. **Add featured images** - Visual appeal
3. **Write excerpts** - Summarize content
4. **Set publish dates** - Proper chronology
5. **Add author names** - Attribution

### SEO
1. **Unique titles** - Each article should have unique title
2. **Meta descriptions** - Use excerpts or custom descriptions
3. **Alt text** - Describe images properly
4. **Internal linking** - Link related articles
5. **URL structure** - Clean, readable URLs

### Performance
1. **Optimize images** - Compress before upload
2. **Lazy loading** - Use for images
3. **Pagination** - Implement for large lists (future)
4. **Caching** - Consider CDN caching

## Troubleshooting

### Articles Not Showing

**Problem**: No articles appear on list page

**Solutions**:
1. Check if articles are published (status = "published")
2. Verify API endpoint returns data
3. Check browser console for errors
4. Ensure database has articles

### Images Not Loading

**Problem**: Featured images don't display

**Solutions**:
1. Check image URL is valid
2. Verify domain in `nuxt.config.ts` → `image.domains`
3. Check image file exists
4. Verify CORS settings

### Formatting Issues

**Problem**: Article content looks broken

**Solutions**:
1. Check HTML content is valid
2. Verify CSS styles are applied
3. Test with different content
4. Check for conflicting styles

## Future Enhancements

### Potential Features
- [ ] Pagination for article list
- [ ] Categories/tags filtering
- [ ] Search functionality
- [ ] Related articles section
- [ ] Comments system
- [ ] Reading time estimate
- [ ] Article views counter
- [ ] RSS feed
- [ ] Newsletter subscription

## Resources

- Admin Panel: `/admin/articles`
- API Documentation: See API endpoints above
- Translation Guide: `I18N_GUIDE.md`
- Image Optimization: `IMAGE_OPTIMIZATION.md`
