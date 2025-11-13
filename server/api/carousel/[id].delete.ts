export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  try {
    const deleted = await db.delete('carousel', id!);

    if (!deleted) {
      throw createError({
        statusCode: 404,
        message: 'Slide not found',
      });
    }

    return { success: true, message: 'Slide deleted' };
  } catch (error) {
    console.error('Error deleting slide:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to delete slide',
    });
  }
});
