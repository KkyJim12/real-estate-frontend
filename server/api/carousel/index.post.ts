export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const newSlide = {
      id: Date.now().toString(),
      image: body.image || '',
      title: body.title || '',
      description: body.description || '',
      order: body.order || 0,
      active: body.active !== undefined ? body.active : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.create('carousel', newSlide);

    return newSlide;
  } catch (error: any) {
    console.error('Error saving slide:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to create slide',
    });
  }
});
