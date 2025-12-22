import { validateTranslatableContent } from '../../utils/translation';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    console.log('Received article data:', body);

    // Validate required translatable fields
    const validation = validateTranslatableContent(body, ['title', 'content']);
    if (!validation.isValid) {
      throw createError({
        statusCode: 400,
        message: `Validation failed: ${validation.errors.join(', ')}`
      });
    }

    const newArticle = {
      id: Date.now().toString(),
      title: body.title,
      image: body.image || '',
      content: body.content,
      excerpt: body.excerpt || { en: '', th: '', zh: '' },
      author: body.author || '',
      status: body.status || 'published',
      publishedAt: body.publishedAt || new Date().toISOString(),
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
