import { getTranslatedContent } from '../../../utils/translation';

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');
    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'Article ID is required',
      });
    }

    const query = getQuery(event);
    const lang = (query.lang as string) || 'en';

    const article = await db.getById('articles', id);
    
    if (!article) {
      throw createError({
        statusCode: 404,
        message: 'Article not found',
      });
    }

    // Only return published articles (or articles without status for backward compatibility)
    if (article.status && article.status !== 'published') {
      throw createError({
        statusCode: 404,
        message: 'Article not found',
      });
    }

    // Translate the article content
    const translatedArticle = getTranslatedContent(article, lang as any);

    return translatedArticle;
  } catch (error: any) {
    console.error('Error fetching article:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch article',
    });
  }
});
