export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);
  console.log('Carousel PUT - Received body:', body);

  try {
    const updated = await db.update('carousel', id!, {
      image: body.image,
      title: body.title,
      description: body.description,
      videoLink: body.videoLink,
      order: body.order,
      active: body.active,
      updatedAt: new Date().toISOString(),
    });

    if (!updated) {
      throw createError({
        statusCode: 404,
        message: 'Slide not found',
      });
    }

    return updated;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to update slide',
    });
  }
});
