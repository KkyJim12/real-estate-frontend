import { migrateToTranslatable, type SupportedLanguage } from '../../utils/translation';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const sourceLanguage = (body.sourceLanguage as SupportedLanguage) || 'en';
    
    let migratedCount = 0;
    
    // Migrate Projects
    const projects = await db.getAll('projects');
    const migratedProjects = projects.map(project => {
      const translatableFields = ['title', 'description'];
      const migratedProject = migrateToTranslatable(project, translatableFields, sourceLanguage);
      
      // Migrate nested arrays
      if (migratedProject.neighborhoods) {
        migratedProject.neighborhoods = migratedProject.neighborhoods.map((neighborhood: any) => ({
          ...neighborhood,
          name: typeof neighborhood.name === 'string' 
            ? { [sourceLanguage]: neighborhood.name, en: '', th: '', zh: '' }
            : neighborhood.name
        }));
      }
      
      if (migratedProject.heroCarousel) {
        migratedProject.heroCarousel = migratedProject.heroCarousel.map((item: any) => ({
          ...item,
          title: typeof item.title === 'string' 
            ? { [sourceLanguage]: item.title, en: '', th: '', zh: '' }
            : item.title,
          description: typeof item.description === 'string' 
            ? { [sourceLanguage]: item.description, en: '', th: '', zh: '' }
            : item.description,
          buttonText: typeof item.buttonText === 'string' 
            ? { [sourceLanguage]: item.buttonText, en: '', th: '', zh: '' }
            : item.buttonText
        }));
      }
      
      if (migratedProject.showUnits) {
        migratedProject.showUnits = migratedProject.showUnits.map((unit: any) => ({
          ...unit,
          roomType: typeof unit.roomType === 'string' 
            ? { [sourceLanguage]: unit.roomType, en: '', th: '', zh: '' }
            : unit.roomType,
          description: typeof unit.description === 'string' 
            ? { [sourceLanguage]: unit.description, en: '', th: '', zh: '' }
            : unit.description
        }));
      }
      
      if (migratedProject.gallery) {
        migratedProject.gallery = migratedProject.gallery.map((item: any) => ({
          ...item,
          tag: typeof item.tag === 'string' 
            ? { [sourceLanguage]: item.tag, en: '', th: '', zh: '' }
            : item.tag
        }));
      }
      
      return migratedProject;
    });
    
    await db.setAll('projects', migratedProjects);
    migratedCount += projects.length;
    
    // Migrate Articles
    const articles = await db.getAll('articles');
    const migratedArticles = articles.map(article => {
      const translatableFields = ['title', 'content'];
      return migrateToTranslatable(article, translatableFields, sourceLanguage);
    });
    
    await db.setAll('articles', migratedArticles);
    migratedCount += articles.length;
    
    // Migrate Carousel
    const carousel = await db.getAll('carousel');
    const migratedCarousel = carousel.map(slide => {
      const translatableFields = ['title', 'description'];
      return migrateToTranslatable(slide, translatableFields, sourceLanguage);
    });
    
    await db.setAll('carousel', migratedCarousel);
    migratedCount += carousel.length;
    
    return {
      success: true,
      message: `Successfully migrated ${migratedCount} items to multi-language format`,
      details: {
        projects: projects.length,
        articles: articles.length,
        carousel: carousel.length
      }
    };
    
  } catch (error: any) {
    console.error('Migration error:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to migrate content'
    });
  }
});