import { getTranslatedContent, type SupportedLanguage } from '../../utils/translation';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const language = (query.lang as SupportedLanguage) || 'en';
    
    const slides = await db.getAll('carousel');
    
    // Return slides with translated content based on requested language
    const translatedSlides = slides.map(slide => {
      return getTranslatedContent(slide, language);
    });
    
    // Sort by order and filter active slides
    return translatedSlides
      .filter(slide => slide.active !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
      
  } catch (error: any) {
    console.error('Error fetching carousel:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch carousel'
    });
  }
});