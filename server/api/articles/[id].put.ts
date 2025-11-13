export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);

  try {
    const updated = await db.update('articles', id!, {
      title: body.title,
      image: body.image,
      content: body.content,
      updatedAt: new Date().toISOString(),
    });

    if (!updated) {
      throw createError({
        statusCode: 404,
        message: 'Article not found',
      });
    }

    return updated;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to update article',
    });
  }
});
