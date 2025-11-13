export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  try {
    const article = await db.getById('articles', id!);

    if (!article) {
      throw createError({
        statusCode: 404,
        message: 'Article not found',
      });
    }

    return article;
  } catch (error) {
    throw createError({
      statusCode: 404,
      message: 'Article not found',
    });
  }
});
