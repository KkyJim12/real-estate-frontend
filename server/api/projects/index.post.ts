import { migrateToTranslatable, validateTranslatableContent } from '../../utils/translation';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    
    // Validate required translatable fields
    const validation = validateTranslatableContent(body, ['title', 'description']);
    if (!validation.isValid) {
      throw createError({
        statusCode: 400,
        message: `Validation failed: ${validation.errors.join(', ')}`
      });
    }
    
    const project = {
      id: Date.now().toString(),
      // Multi-language fields
      title: body.title,
      description: body.description,
      
      // Single language fields
      developer: body.developer,
      location: body.location,
      area: body.area,
      projectType: body.projectType,
      ownershipType: body.ownershipType,
      constructionPeriod: body.constructionPeriod,
      expectedFinish: body.expectedFinish,
      floors: body.floors,
      units: body.units,
      
      // Arrays with potential multi-language content
      facilities: body.facilities || [],
      neighborhoods: body.neighborhoods || [],
      heroCarousel: body.heroCarousel || [],
      showUnits: body.showUnits || [],
      gallery: body.gallery || [],
      
      // Files
      brochure: body.brochure,
      
      // Location
      coordinates: body.coordinates || { lat: null, lng: null },
      
      // Legacy fields for compatibility
      image: body.image,
      link: body.link || '/',
      order: body.order || 0,
      active: body.active !== false,
      
      // Timestamps
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await db.create('projects', project);
    return project;
  } catch (error: any) {
    console.error('Error creating project:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to create project',
    });
  }
});
