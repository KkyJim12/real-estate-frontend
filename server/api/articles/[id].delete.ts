export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  try {
    const deleted = await db.delete('articles', id!);

    if (!deleted) {
      throw createError({
        statusCode: 404,
        message: 'Article not found',
      });
    }

    return { success: true, message: 'Article deleted' };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to delete article',
    });
  }
});
