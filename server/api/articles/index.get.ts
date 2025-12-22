import { getTranslatedContent, type SupportedLanguage } from '../../utils/translation';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const language = (query.lang as SupportedLanguage) || 'en';
    
    const articles = await db.getAll('articles');
    
    // Return articles with translated content based on requested language
    const translatedArticles = articles.map(article => {
      return getTranslatedContent(article, language);
    });
    
    // Sort by publishedAt date (newest first)
    return translatedArticles
      .filter(article => article.status === 'published')
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      
  } catch (error: any) {
    console.error('Error fetching articles:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch articles'
    });
  }
});