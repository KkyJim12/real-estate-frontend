# Navigation Components Guide

## Overview

The site uses reusable navigation components for consistent UI across all pages.

## Components

### SiteNavigation.vue

Main navigation component used on all pages.

**Location**: `app/components/SiteNavigation.vue`

**Features**:
- ✅ Mobile hamburger menu
- ✅ Desktop navigation bar
- ✅ Logo (clickable, links to home)
- ✅ Language switcher
- ✅ Contact information (phone, Facebook)
- ✅ Responsive design
- ✅ Smooth transitions
- ✅ Escape key to close menu

**Usage**:
```vue
<template>
  <SiteNavigation />
</template>
```

**Navigation Links**:
- Home (/)
- Portfolio (/#portfolio)
- Ramada (/#ramada)
- Convilla (/#convilla)
- News (/articles)

### MobileBottomBar.vue

Fixed bottom bar for mobile devices with quick actions.

**Location**: `app/components/MobileBottomBar.vue`

**Features**:
- ✅ Fixed to bottom on mobile/tablet
- ✅ Hidden on desktop (lg breakpoint)
- ✅ Three action buttons: TEL, LINE, REGISTER
- ✅ Hover effects
- ✅ Multi-language support

**Usage**:
```vue
<template>
  <MobileBottomBar />
</template>
```

**Action Buttons**:
1. **TEL**: Direct phone call to +66616109888
2. **LINE**: Opens LINE chat with emeraldbaypattaya
3. **REGISTER**: Scrolls to registration section

## Implementation

### Homepage (`app/pages/index.vue`)
```vue
<template>
  <SiteNavigation />
  
  <!-- Page content -->
  
  <MobileBottomBar />
</template>
```

### Articles List (`app/pages/articles/index.vue`)
```vue
<template>
  <div class="min-h-screen bg-gray-50">
    <SiteNavigation />
    
    <!-- Header with mt-14 lg:mt-0 for mobile nav spacing -->
    <header class="bg-[#1d1d39] text-white py-16 px-4 mt-14 lg:mt-0">
      <!-- Content -->
    </header>
    
    <!-- Articles with pb-28 lg:pb-12 for bottom bar spacing -->
    <div class="max-w-6xl mx-auto px-4 py-12 pb-28 lg:pb-12">
      <!-- Articles -->
    </div>
    
    <MobileBottomBar />
  </div>
</template>
```

### Article Detail (`app/pages/articles/[id].vue`)
```vue
<template>
  <div class="min-h-screen bg-gray-50">
    <SiteNavigation />
    
    <!-- Breadcrumb with mt-14 lg:mt-0 -->
    <div class="bg-white border-b py-4 px-4 mt-14 lg:mt-0">
      <NuxtLink to="/articles">Back to Articles</NuxtLink>
    </div>
    
    <!-- Article with pb-28 lg:pb-12 -->
    <article class="max-w-4xl mx-auto px-4 py-12 pb-28 lg:pb-12">
      <!-- Content -->
    </article>
    
    <MobileBottomBar />
  </div>
</template>
```

## Responsive Spacing

### Mobile Navigation Spacing
When using `SiteNavigation`, add top margin to the first content section:
```vue
<header class="mt-14 lg:mt-0">
  <!-- Content -->
</header>
```

- `mt-14`: Adds space for fixed mobile nav (56px)
- `lg:mt-0`: Removes margin on desktop where nav is not fixed

### Bottom Bar Spacing
When using `MobileBottomBar`, add bottom padding to the last content section:
```vue
<div class="pb-28 lg:pb-12">
  <!-- Content -->
</div>
```

- `pb-28`: Adds space for fixed bottom bar on mobile (112px)
- `lg:pb-12`: Normal padding on desktop (48px)

## Styling

### Mobile Navigation
- **Background**: `bg-[#1d1d39]` (dark blue)
- **Height**: `py-3` (12px padding)
- **Z-index**: `z-50` (above content)
- **Position**: `fixed top-0` (stays at top)

### Desktop Navigation
- **Background**: `bg-[#1d1d39]` (dark blue)
- **Height**: `h-28` (112px)
- **Layout**: Flexbox with centered logo
- **Padding**: `px-60` (240px horizontal)

### Mobile Menu Overlay
- **Background**: `bg-[#2d2d49]/95` with `backdrop-blur-sm`
- **Animation**: Fade in/out transition
- **Z-index**: `z-50` (above everything)
- **Close**: Click outside or Escape key

### Bottom Bar
- **Background**: `bg-[#1d1d39]` (dark blue)
- **Height**: `h-20` (80px)
- **Z-index**: `z-50` (above content)
- **Position**: `fixed bottom-0` (stays at bottom)
- **Grid**: 3 equal columns

## Customization

### Adding New Navigation Links

Edit `app/components/SiteNavigation.vue`:

```vue
<!-- Mobile Menu -->
<li>
  <NuxtLink
    to="/new-page"
    @click="mobileMenuOpen = false"
    class="text-white/70 hover:text-white text-xl font-light tracking-wider transition-colors block"
  >
    {{ $t('nav.newPage') }}
  </NuxtLink>
</li>
```

Don't forget to add translations in `locales/*.json`:
```json
{
  "nav": {
    "newPage": "New Page"
  }
}
```

### Changing Colors

Update the color classes:
- **Primary**: `bg-[#1d1d39]` → Your color
- **Accent**: `text-[#ecbc85]` → Your color
- **Hover**: `hover:text-[#ecbc85]` → Your color

### Adjusting Logo Size

Mobile: `w-16 sm:w-20` (64px → 80px)
Desktop: `w-28` (112px)

## Best Practices

1. **Always use both components together** for consistent UX
2. **Add proper spacing** (mt-14, pb-28) when using fixed navigation
3. **Test on mobile** to ensure no content is hidden
4. **Keep navigation links updated** across all instances
5. **Maintain translation keys** for all navigation text

## Troubleshooting

### Content Hidden Behind Navigation

**Problem**: Content appears behind fixed navigation

**Solution**: Add `mt-14 lg:mt-0` to first content section

### Content Hidden Behind Bottom Bar

**Problem**: Content cut off at bottom on mobile

**Solution**: Add `pb-28 lg:pb-12` to last content section

### Menu Not Closing

**Problem**: Mobile menu stays open

**Solution**: 
- Check `@click="mobileMenuOpen = false"` on links
- Verify Escape key handler is working
- Test click outside overlay

### Logo Not Clickable

**Problem**: Logo doesn't navigate to home

**Solution**: Wrap logo in `<NuxtLink to="/">`

## Resources

- Component files: `app/components/SiteNavigation.vue`, `app/components/MobileBottomBar.vue`
- Translation files: `locales/en.json`, `locales/th.json`, `locales/zh.json`
- Usage examples: `app/pages/index.vue`, `app/pages/articles/index.vue`, `app/pages/articles/[id].vue`
