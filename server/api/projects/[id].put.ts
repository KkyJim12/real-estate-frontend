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
    const existingProject = await db.get('projects', id);

    if (!existingProject) {
      throw createError({
        statusCode: 404,
        message: 'Project not found',
      });
    }

    const updatedProject = {
      ...existingProject,
      title: body.title ?? existingProject.title,
      description: body.description ?? existingProject.description,
      image: body.image ?? existingProject.image,
      link: body.link ?? existingProject.link,
      order: body.order ?? existingProject.order,
      active: body.active ?? existingProject.active,
      updatedAt: new Date().toISOString(),
    };

    await db.set('projects', id, updatedProject);
    return updatedProject;
  } catch (error: any) {
    console.error('Error updating project:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to update project',
    });
  }
});
