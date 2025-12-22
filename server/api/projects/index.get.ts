import { getTranslatedContent, type SupportedLanguage } from '../../utils/translation';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const language = (query.lang as SupportedLanguage) || 'en';
    
    const projects = await db.getAll('projects');
    
    // Return projects with translated content based on requested language
    const translatedProjects = projects.map(project => {
      return getTranslatedContent(project, language);
    });
    
    // Sort by order and active status
    return translatedProjects
      .filter(project => project.active !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
      
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch projects'
    });
  }
});