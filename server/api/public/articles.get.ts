import { getTranslatedContent } from '../../utils/translation';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const lang = (query.lang as string) || 'en';
    
    const articles = await db.getAll('articles');
    // Return only published articles (or articles without status field for backward compatibility)
    // sorted by date (newest first)
    const publishedArticles = articles
      .filter((article: any) => !article.status || article.status === 'published')
      .sort((a: any, b: any) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
    
    // Translate content based on requested language
    const translatedArticles = publishedArticles.map((article: any) => 
      getTranslatedContent(article, lang as any)
    );
    
    return translatedArticles;
  } catch (error) {
    console.error('Error fetching public articles:', error);
    return [];
  }
});
