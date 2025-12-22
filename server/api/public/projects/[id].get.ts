import { getTranslatedContent } from '../../../utils/translation';

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');
    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'Project ID is required',
      });
    }

    const query = getQuery(event);
    const lang = (query.lang as string) || 'en';

    const project = await db.getById('projects', id);
    
    if (!project) {
      throw createError({
        statusCode: 404,
        message: 'Project not found',
      });
    }

    // Only return active projects for public API
    if (!project.active) {
      throw createError({
        statusCode: 404,
        message: 'Project not found',
      });
    }

    // Translate the project content
    const translatedProject = getTranslatedContent(project, lang as any);

    return translatedProject;
  } catch (error: any) {
    console.error('Error fetching public project:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch project',
    });
  }
});