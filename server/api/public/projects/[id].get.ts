export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');
    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'Project ID is required',
      });
    }

    const project = await db.getById('projects', id);
    
    if (!project) {
      throw createError({
        statusCode: 404,
        message: 'Project not found',
      });
    }

    // Only return active projects
    if (!project.active) {
      throw createError({
        statusCode: 404,
        message: 'Project not found',
      });
    }

    return project;
  } catch (error: any) {
    console.error('Error fetching project:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch project',
    });
  }
});
