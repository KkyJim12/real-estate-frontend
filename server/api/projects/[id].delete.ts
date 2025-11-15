export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');
    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'Project ID is required',
      });
    }

    const project = await db.get('projects', id);
    if (!project) {
      throw createError({
        statusCode: 404,
        message: 'Project not found',
      });
    }

    await db.delete('projects', id);
    return { success: true, message: 'Project deleted successfully' };
  } catch (error: any) {
    console.error('Error deleting project:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to delete project',
    });
  }
});
