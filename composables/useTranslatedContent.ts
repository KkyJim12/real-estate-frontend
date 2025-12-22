// Composable for handling multi-language content display

export interface TranslatableField {
  en: string;
  th: string;
  zh: string;
}

export type SupportedLanguage = 'en' | 'th' | 'zh';

/**
 * Get translated content for a specific field
 * Falls back to English if the requested language is not available
 */
export function useTranslatedContent() {
  const { locale } = useI18n();
  
  const currentLanguage = computed(() => locale.value as SupportedLanguage);
  
  /**
   * Get translated text from a translatable field
   * @param field - The translatable field object with en, th, zh properties
   * @param fallbackLanguage - The fallback language if current language is not available (default: 'en')
   * @returns The translated text or empty string if not available
   */
  const getTranslated = (
    field: string | TranslatableField | undefined | null,
    fallbackLanguage: SupportedLanguage = 'en'
  ): string => {
    if (!field) return '';
    
    // If it's already a string, return it
    if (typeof field === 'string') return field;
    
    // If it's a translatable object
    if (typeof field === 'object' && field !== null) {
      const lang = currentLanguage.value;
      
      // Try current language
      if (field[lang] && field[lang].trim()) {
        return field[lang];
      }
      
      // Try fallback language
      if (field[fallbackLanguage] && field[fallbackLanguage].trim()) {
        return field[fallbackLanguage];
      }
      
      // Try any available language
      if (field.en && field.en.trim()) return field.en;
      if (field.th && field.th.trim()) return field.th;
      if (field.zh && field.zh.trim()) return field.zh;
    }
    
    return '';
  };
  
  /**
   * Check if a translatable field has content in the current language
   */
  const hasTranslation = (field: string | TranslatableField | undefined | null): boolean => {
    if (!field) return false;
    if (typeof field === 'string') return field.trim().length > 0;
    if (typeof field === 'object' && field !== null) {
      const lang = currentLanguage.value;
      return !!(field[lang] && field[lang].trim());
    }
    return false;
  };
  
  /**
   * Translate an entire object's translatable fields
   */
  const translateObject = <T extends Record<string, any>>(
    obj: T,
    translatableFields: (keyof T)[]
  ): T => {
    const result = { ...obj };
    
    for (const field of translatableFields) {
      if (obj[field]) {
        result[field] = getTranslated(obj[field] as any) as any;
      }
    }
    
    return result;
  };
  
  /**
   * Translate an array of objects
   */
  const translateArray = <T extends Record<string, any>>(
    array: T[],
    translatableFields: (keyof T)[]
  ): T[] => {
    return array.map(item => translateObject(item, translatableFields));
  };
  
  return {
    currentLanguage,
    getTranslated,
    hasTranslation,
    translateObject,
    translateArray
  };
}
