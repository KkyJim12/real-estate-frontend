export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    console.log('Received article data:', body);

    const newArticle = {
      id: Date.now().toString(),
      title: body.title || '',
      image: body.image || '',
      content: body.content || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.create('articles', newArticle);

    console.log('Article saved successfully:', newArticle.id);

    return newArticle;
  } catch (error: any) {
    console.error('Error saving article:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to create article',
    });
  }
});
