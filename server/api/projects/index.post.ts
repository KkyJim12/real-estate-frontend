export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    
    const project = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description,
      image: body.image,
      link: body.link || '/',
      order: body.order || 0,
      active: body.active !== false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.set('projects', project.id, project);
    return project;
  } catch (error: any) {
    console.error('Error creating project:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to create project',
    });
  }
});
