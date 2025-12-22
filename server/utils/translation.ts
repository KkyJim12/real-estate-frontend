// Translation utilities for multi-language content management

export interface TranslatableField {
  en: string;
  th: string;
  zh: string;
}

export interface TranslatableContent {
  [key: string]: TranslatableField | any;
}

// Available languages
export const SUPPORTED_LANGUAGES = ['en', 'th', 'zh'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// Create empty translatable field
export function createTranslatableField(defaultValue: string = ''): TranslatableField {
  return {
    en: defaultValue,
    th: '',
    zh: ''
  };
}

// Get content for specific language with fallback
export function getTranslatedContent<T extends TranslatableContent>(
  content: T,
  language: SupportedLanguage,
  fallbackLanguage: SupportedLanguage = 'en'
): T {
  const result = { ...content } as any;
  
  for (const [key, value] of Object.entries(content)) {
    if (isTranslatableField(value)) {
      // Get value for requested language, fallback to default language, then to any available value
      result[key] = value[language] || value[fallbackLanguage] || value.en || value.th || value.zh || '';
    }
  }
  
  return result as T;
}

// Check if a field is translatable
export function isTranslatableField(value: any): value is TranslatableField {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    SUPPORTED_LANGUAGES.some(lang => lang in value)
  );
}

// Convert legacy single-language content to multi-language
export function migrateToTranslatable<T extends Record<string, any>>(
  content: T,
  translatableFields: string[],
  sourceLanguage: SupportedLanguage = 'en'
): T & TranslatableContent {
  const result = { ...content } as any;
  
  for (const field of translatableFields) {
    if (content[field] && typeof content[field] === 'string') {
      result[field] = createTranslatableField();
      result[field][sourceLanguage] = content[field];
    }
  }
  
  return result as T & TranslatableContent;
}

// Validate translatable content
export function validateTranslatableContent(
  content: TranslatableContent,
  requiredFields: string[] = []
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  for (const field of requiredFields) {
    const value = content[field];
    if (isTranslatableField(value)) {
      // At least one language should have content
      const hasContent = SUPPORTED_LANGUAGES.some(lang => value[lang]?.trim());
      if (!hasContent) {
        errors.push(`Field '${field}' must have content in at least one language`);
      }
    } else if (!value) {
      errors.push(`Field '${field}' is required`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}