export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');
    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'Article ID is required',
      });
    }

    const article = await db.get('articles', id);
    
    if (!article) {
      throw createError({
        statusCode: 404,
        message: 'Article not found',
      });
    }

    // Only return published articles
    if (article.status !== 'published') {
      throw createError({
        statusCode: 404,
        message: 'Article not found',
      });
    }

    return article;
  } catch (error: any) {
    console.error('Error fetching article:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch article',
    });
  }
});
