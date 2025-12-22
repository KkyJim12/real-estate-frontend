import { getTranslatedContent } from '../../utils/translation';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const lang = (query.lang as string) || 'en';
    
    const projects = await db.getAll('projects');
    // Return only active projects, sorted by order
    const activeProjects = projects
      .filter((project: any) => project.active)
      .sort((a: any, b: any) => a.order - b.order);
    
    // Translate content based on requested language
    const translatedProjects = activeProjects.map((project: any) => 
      getTranslatedContent(project, lang as any)
    );
    
    return translatedProjects;
  } catch (error) {
    console.error('Error fetching public projects:', error);
    return [];
  }
});
