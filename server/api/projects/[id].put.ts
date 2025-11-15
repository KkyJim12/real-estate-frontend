export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');
    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'Project ID is required',
      });
    }

    const body = await readBody(event);
    
    const updatedProject = await db.update('projects', id, {
      ...body,
      updatedAt: new Date().toISOString(),
    } as any);

    if (!updatedProject) {
      throw createError({
        statusCode: 404,
        message: 'Project not found',
      });
    }

    return updatedProject;
  } catch (error: any) {
    console.error('Error updating project:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to update project',
    });
  }
});
