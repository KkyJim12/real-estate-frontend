import { getTranslatedContent } from '../../utils/translation';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const lang = (query.lang as string) || 'en';
    
    const slides = await db.getAll('carousel');
    // Return only active slides, sorted by order
    const activeSlides = slides
      .filter((slide: any) => slide.active)
      .sort((a: any, b: any) => a.order - b.order);
    
    // Translate content based on requested language
    const translatedSlides = activeSlides.map((slide: any) => 
      getTranslatedContent(slide, lang as any)
    );
    
    return translatedSlides;
  } catch (error) {
    console.error('Error fetching public carousel:', error);
    return [];
  }
});
