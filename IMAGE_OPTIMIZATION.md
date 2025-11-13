# Image Optimization Guide

## Configuration

Images from external domains are configured in `nuxt.config.ts`:

```typescript
image: {
  domains: ["emeraldbaypattaya.com", "picsum.photos"],
}
```

## Image Loading Strategy

### Logo Images (Above the Fold)
- **Loading**: `eager` - Loads immediately for better UX
- **Format**: `webp` - Modern format for better compression
- Used for: Navigation logos, header images

```vue
<NuxtImg
  src="https://emeraldbaypattaya.com/wp-content/uploads/2019/11/logo-new.png"
  alt="Emerald Bay Pattaya"
  loading="eager"
  format="webp"
/>
```

### Carousel Images
- **Loading**: `lazy` - Loads when needed
- **Format**: `webp` - Better compression
- **Quality**: `80` - Balance between quality and file size

```vue
<NuxtImg 
  :src="item" 
  alt="Carousel slide" 
  loading="lazy"
  format="webp"
  quality="80"
/>
```

### Content Images (Below the Fold)
- **Loading**: `lazy` - Deferred loading for better performance
- **Format**: `webp` - Modern format
- **Quality**: `80` - Optimized quality
- Used for: Business section images (Ramada, Convilla)

```vue
<NuxtImg 
  src="https://emeraldbaypattaya.com/wp-content/uploads/2019/11/img-ramada.png" 
  alt="Ramada Emerald Bay"
  loading="lazy"
  format="webp"
  quality="80"
/>
```

## Benefits

### Mobile Performance
- **Lazy Loading**: Images load only when visible, saving bandwidth
- **WebP Format**: 25-35% smaller file sizes compared to JPEG/PNG
- **Quality Optimization**: Reduces file size without visible quality loss

### Desktop Performance
- **Automatic Optimization**: Nuxt Image automatically optimizes all images
- **Responsive Images**: Serves appropriate sizes based on device
- **CDN Ready**: Works with Vercel's image optimization

## Image Sources

### External Images
Images from `emeraldbaypattaya.com` are allowed via domain configuration.

### Uploaded Images
- **Development**: Stored in `public/uploads/`
- **Production**: Stored in Vercel Blob Storage
- Automatically optimized by Nuxt Image

## Troubleshooting

### Images Not Loading on Mobile

**Problem**: Images show broken or don't load

**Solutions**:
1. Check domain is added to `nuxt.config.ts` → `image.domains`
2. Verify image URL is accessible
3. Check network tab for CORS errors
4. Restart development server after config changes

### Slow Image Loading

**Problem**: Images take too long to load

**Solutions**:
1. Use `loading="lazy"` for below-the-fold images
2. Reduce `quality` value (try 70-80)
3. Use `format="webp"` for better compression
4. Check image source file size

### Images Look Blurry

**Problem**: Images appear low quality

**Solutions**:
1. Increase `quality` value (try 85-90)
2. Check source image resolution
3. Remove `format="webp"` if needed
4. Use higher resolution source images

## Best Practices

1. **Use NuxtImg for all images** - Never use regular `<img>` tags
2. **Set loading strategy** - `eager` for above-the-fold, `lazy` for below
3. **Always add alt text** - Important for accessibility and SEO
4. **Use WebP format** - Better compression for modern browsers
5. **Optimize quality** - Balance between quality and file size (70-85)
6. **Add dimensions** - Use CSS classes for width/height to prevent layout shift

## Example Usage

### Hero/Carousel Image
```vue
<NuxtImg 
  :src="carouselImage" 
  alt="Beautiful resort view"
  class="w-full h-screen object-cover"
  loading="lazy"
  format="webp"
  quality="80"
/>
```

### Thumbnail Image
```vue
<NuxtImg 
  :src="thumbnail" 
  alt="Property thumbnail"
  class="w-64 h-48 object-cover rounded-lg"
  loading="lazy"
  format="webp"
  quality="75"
/>
```

### Logo/Icon
```vue
<NuxtImg 
  src="/logo.png" 
  alt="Company Logo"
  class="w-32 h-auto"
  loading="eager"
  format="webp"
/>
```

## Resources

- [Nuxt Image Documentation](https://image.nuxt.com/)
- [WebP Format Guide](https://developers.google.com/speed/webp)
- [Lazy Loading Best Practices](https://web.dev/lazy-loading-images/)
