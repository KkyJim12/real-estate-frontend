# Multi-language Support (i18n) - Complete Guide

This project uses the official Nuxt i18n module for internationalization with complete support for English, Thai, and Chinese languages.

## Supported Languages

- **English (en)** - Default language
- **Thai (th)** - ไทย
- **Chinese (zh)** - 中文

## Configuration

The i18n configuration is in `nuxt.config.ts`:

```typescript
i18n: {
  locales: [
    { code: 'en', name: 'English', file: 'en.json' },
    { code: 'th', name: 'ไทย', file: 'th.json' },
    { code: 'zh', name: '中文', file: 'zh.json' }
  ],
  defaultLocale: 'en',
  strategy: 'no_prefix',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    redirectOn: 'root'
  }
}
```

## Translation Files

Translation files are located in the `locales/` directory:
- `locales/en.json` - English translations
- `locales/th.json` - Thai translations
- `locales/zh.json` - Chinese translations

## Translation Structure

All translation files follow the same structure with these sections:

### Navigation (`nav`)
```json
{
  "nav": {
    "home": "HOME",
    "portfolio": "PORTFOLIO",
    "ramada": "RAMADA EMERALDBAY",
    "convilla": "CONVILLA EMERALDBAY"
  }
}
```

### Home Page (`home`)
```json
{
  "home": {
    "aboutTitle": "ABOUT US",
    "aboutText1": "Recharge your happiness...",
    "aboutText2": "the luxurious resort...",
    "aboutText3": "convenience amidst...",
    "businessTitle": "OUR BUSINESS"
  }
}
```

### Ramada Section (`ramada`)
```json
{
  "ramada": {
    "title": "RAMADA EMERALD BAY",
    "text1": "The allure of silence...",
    "text2": "The new treasure...",
    "text3": "and privacy.",
    "viewMore": "VIEW MORE"
  }
}
```

### Convilla Section (`convilla`)
```json
{
  "convilla": {
    "title": "CONVILLA",
    "text1": "Uniqueness in synchronicity.",
    "text2": "A new dimension of condominium",
    "text3": "that brings more to you than ever.",
    "text4": "The best convergence of condo and villa,",
    "text5": "to create the new definition of living: \"CONVILLA\".",
    "viewMore": "VIEW MORE"
  }
}
```

### Footer (`footer`)
```json
{
  "footer": {
    "contactTitle": "CONTACT US",
    "locationTitle": "LOCATION",
    "followTitle": "FOLLOW US",
    "company": "XJ Development Co., Ltd. (HQ)",
    "address1": "11/1 AIA Sathorn Tower...",
    "address2": "South Sathorn Road...",
    "address3": "Sathorn District, Bangkok 10120",
    "copyright": "Emerald Bay Pattaya. All rights reserved."
  }
}
```

### Bottom Bar (`bottomBar`)
```json
{
  "bottomBar": {
    "tel": "TEL",
    "line": "LINE",
    "register": "REGISTER"
  }
}
```

### Carousel (`carousel`)
```json
{
  "carousel": {
    "loading": "Loading...",
    "noSlides": "No carousel slides available"
  }
}
```

### Admin Panel (`admin`)
```json
{
  "admin": {
    "login": {
      "title": "Admin Panel",
      "subtitle": "Sign in to manage your content",
      "username": "Username",
      "password": "Password",
      "usernamePlaceholder": "Enter your username",
      "passwordPlaceholder": "Enter your password",
      "signIn": "Sign In",
      "signingIn": "Signing in...",
      "error": "Invalid username or password"
    }
  }
}
```

## Usage in Components

### Basic Translation

Use the `$t()` function to access translations:

```vue
<template>
  <h1>{{ $t('home.aboutTitle') }}</h1>
  <p>{{ $t('home.aboutText1') }}</p>
  <button>{{ $t('ramada.viewMore') }}</button>
</template>
```

### In Attributes

Use `:attribute` binding for dynamic attributes:

```vue
<input :placeholder="$t('admin.login.usernamePlaceholder')" />
<img :alt="$t('home.aboutTitle')" />
```

### In Script

Access translations in script using `useNuxtApp()`:

```vue
<script setup>
const { $t } = useNuxtApp();
const errorMessage = $t('admin.login.error');
const title = computed(() => $t('home.aboutTitle'));
</script>
```

### Using Composition API

```vue
<script setup>
const { t, locale, setLocale } = useI18n();

const switchLanguage = (lang) => {
  setLocale(lang);
};
</script>

<template>
  <h1>{{ t('home.aboutTitle') }}</h1>
  <p>Current: {{ locale }}</p>
</template>
```

## Language Switcher Component

The `LanguageSwitcher` component is located at `app/components/LanguageSwitcher.vue` and provides:
- Dropdown menu with all available languages
- Current language indicator with flag/icon
- Automatic language switching with cookie persistence
- Responsive design for mobile and desktop

Usage:
```vue
<LanguageSwitcher />
```

## Fully Translated Pages

### Homepage (`app/pages/index.vue`)
✅ **Navigation Menu** (Mobile & Desktop)
- HOME, PORTFOLIO, RAMADA, CONVILLA links

✅ **Carousel Section**
- Loading state message
- Empty state message

✅ **About Us Section**
- Section title
- All description paragraphs

✅ **Business Section**
- Section title
- Ramada Emerald Bay (title, descriptions, button)
- Convilla (title, descriptions, button)

✅ **Footer**
- Contact Us section (title)
- Location section (title, company name, address)
- Follow Us section (title)

✅ **Mobile Bottom Bar**
- TEL, LINE, REGISTER buttons

### Admin Panel (`app/pages/admin/login.vue`)
✅ **Login Page**
- Page title and subtitle
- Form labels (Username, Password)
- Input placeholders
- Button text (Sign In, Signing in...)
- Error messages

## Adding New Translations

### Step 1: Add to All Translation Files

Add the same key structure to all three language files:

**locales/en.json:**
```json
{
  "newSection": {
    "title": "New Section Title",
    "description": "Description text",
    "button": "Click Here"
  }
}
```

**locales/th.json:**
```json
{
  "newSection": {
    "title": "หัวข้อส่วนใหม่",
    "description": "ข้อความอธิบาย",
    "button": "คลิกที่นี่"
  }
}
```

**locales/zh.json:**
```json
{
  "newSection": {
    "title": "新部分标题",
    "description": "描述文本",
    "button": "点击这里"
  }
}
```

### Step 2: Use in Components

```vue
<template>
  <div>
    <h2>{{ $t('newSection.title') }}</h2>
    <p>{{ $t('newSection.description') }}</p>
    <button>{{ $t('newSection.button') }}</button>
  </div>
</template>
```

## Browser Language Detection

The application automatically detects the user's browser language on first visit:
- If browser language is **Thai** → switches to Thai
- If browser language is **Chinese** → switches to Chinese  
- Otherwise → defaults to **English**

The selected language is saved in a cookie (`i18n_redirected`) and persists across sessions.

## Language Switching

### Via Language Switcher Component
Users can click the language switcher in the navigation bar to change languages.

### Programmatically
```vue
<script setup>
const { setLocale } = useI18n();

const switchToThai = () => {
  setLocale('th');
};

const switchToChinese = () => {
  setLocale('zh');
};

const switchToEnglish = () => {
  setLocale('en');
};
</script>
```

## Testing Translations

### Manual Testing
1. Open the application
2. Click the language switcher in the navigation
3. Select different languages
4. Verify all text changes correctly

### Browser Language Testing
1. Change your browser language settings
2. Clear cookies
3. Reload the application
4. Verify it detects and uses your browser language

### Cookie Testing
1. Open browser DevTools
2. Go to Application/Storage → Cookies
3. Find `i18n_redirected` cookie
4. Delete it to test first-visit behavior

## Best Practices

### 1. Always Add to All Language Files
Missing translations will display the key instead of text:
```vue
<!-- If 'newKey' is missing in th.json -->
{{ $t('newKey') }} <!-- Shows: "newKey" instead of Thai text -->
```

### 2. Use Descriptive Keys
```json
// Good ✅
{
  "home.aboutTitle": "ABOUT US",
  "footer.contactTitle": "CONTACT US"
}

// Bad ❌
{
  "title1": "ABOUT US",
  "t2": "CONTACT US"
}
```

### 3. Group Related Translations
```json
{
  "home": {
    "aboutTitle": "...",
    "aboutText1": "..."
  },
  "footer": {
    "contactTitle": "...",
    "locationTitle": "..."
  }
}
```

### 4. Keep Translations Consistent
- Use the same tone and style across all languages
- Maintain consistent formatting (uppercase, sentence case, etc.)
- Keep similar length to avoid layout issues

### 5. Test All Languages
- Switch between all three languages
- Check that text fits in UI elements
- Verify no layout breaking
- Test on mobile and desktop

## Troubleshooting

### Translation Not Showing

**Problem:** Text shows as key instead of translation
```vue
{{ $t('home.title') }} <!-- Shows: "home.title" -->
```

**Solutions:**
1. Check if key exists in all language files
2. Verify the key path is correct (e.g., `home.aboutTitle` not `aboutTitle`)
3. Check JSON syntax (no trailing commas, proper quotes)
4. Restart development server
5. Clear browser cache

### Language Not Switching

**Problem:** Language doesn't change when clicking switcher

**Solutions:**
1. Clear browser cookies (especially `i18n_redirected`)
2. Check browser console for errors
3. Verify language code matches configuration (en, th, zh)
4. Check if `useI18n()` is properly imported
5. Restart development server

### Missing Translations

**Problem:** Some text is in English even after switching language

**Solutions:**
1. Add the missing key to all language files
2. Check if you're using `$t()` for all text
3. Verify key names match exactly
4. Look for hardcoded text in templates

### Layout Breaking

**Problem:** Text overflows or breaks layout in certain languages

**Solutions:**
1. Use responsive design with flexible widths
2. Test with longest translation
3. Use CSS `overflow-wrap: break-word`
4. Consider abbreviations for very long text
5. Adjust font sizes for different languages

## API Reference

### Composables

#### useI18n()
```typescript
const { 
  t,              // Translation function
  locale,         // Current locale (ref)
  locales,        // Available locales
  setLocale,      // Change language function
} = useI18n();
```

### Template Helpers

#### $t(key, params)
```vue
<!-- Basic usage -->
{{ $t('home.aboutTitle') }}

<!-- With parameters -->
{{ $t('welcome', { name: 'John' }) }}
```

#### $locale
```vue
<!-- Current locale code -->
{{ $locale }} <!-- Output: "en", "th", or "zh" -->
```

## Resources

- [Nuxt i18n Documentation](https://i18n.nuxtjs.org/)
- [Vue I18n Documentation](https://vue-i18n.intlify.dev/)
- Translation files: `locales/en.json`, `locales/th.json`, `locales/zh.json`
- Language Switcher: `app/components/LanguageSwitcher.vue`
