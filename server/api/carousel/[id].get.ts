export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  try {
    const slide = await db.getById('carousel', id!);

    if (!slide) {
      throw createError({
        statusCode: 404,
        message: 'Slide not found',
      });
    }

    return slide;
  } catch (error) {
    throw createError({
      statusCode: 404,
      message: 'Slide not found',
    });
  }
});
