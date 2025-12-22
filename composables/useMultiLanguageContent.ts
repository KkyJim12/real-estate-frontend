// Client-side types (duplicated from server utils for client access)
type SupportedLanguage = 'en' | 'th' | 'zh';

export const useMultiLanguageContent = () => {
  const { locale } = useI18n();
  
  // Get current language as supported language type
  const currentLanguage = computed(() => locale.value as SupportedLanguage);
  
  // Fetch projects with current language
  const fetchProjects = async () => {
    try {
      return await $fetch('/api/projects', {
        query: { lang: currentLanguage.value }
      });
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  };
  
  // Fetch articles with current language
  const fetchArticles = async () => {
    try {
      return await $fetch('/api/articles', {
        query: { lang: currentLanguage.value }
      });
    } catch (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
  };
  
  // Fetch carousel with current language
  const fetchCarousel = async () => {
    try {
      return await $fetch('/api/carousel', {
        query: { lang: currentLanguage.value }
      });
    } catch (error) {
      console.error('Error fetching carousel:', error);
      return [];
    }
  };
  
  // Get translated field value with fallback
  const getTranslatedField = (field: any, fallbackLang: SupportedLanguage = 'en') => {
    if (typeof field === 'string') {
      return field; // Legacy single-language content
    }
    
    if (typeof field === 'object' && field !== null) {
      return field[currentLanguage.value] || field[fallbackLang] || field.en || field.th || field.zh || '';
    }
    
    return '';
  };
  
  // Check if content exists in current language
  const hasContentInCurrentLanguage = (field: any) => {
    if (typeof field === 'string') {
      return !!field.trim();
    }
    
    if (typeof field === 'object' && field !== null) {
      return !!(field[currentLanguage.value]?.trim());
    }
    
    return false;
  };
  
  // Get content status for all languages
  const getContentStatus = (field: any) => {
    if (typeof field === 'string') {
      return {
        en: !!field.trim(),
        th: false,
        zh: false
      };
    }
    
    if (typeof field === 'object' && field !== null) {
      return {
        en: !!(field.en?.trim()),
        th: !!(field.th?.trim()),
        zh: !!(field.zh?.trim())
      };
    }
    
    return {
      en: false,
      th: false,
      zh: false
    };
  };
  
  return {
    currentLanguage,
    fetchProjects,
    fetchArticles,
    fetchCarousel,
    getTranslatedField,
    hasContentInCurrentLanguage,
    getContentStatus
  };
};