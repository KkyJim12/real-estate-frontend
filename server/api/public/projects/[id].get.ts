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

    // Only return active projects for public API
    if (!project.active) {
      throw createError({
        statusCode: 404,
        message: 'Project not found',
      });
    }

    // Return project data with all the enhanced fields
    return {
      id: project.id,
      title: project.title,
      description: project.description,
      developer: project.developer,
      location: project.location,
      area: project.area,
      projectType: project.projectType,
      ownershipType: project.ownershipType,
      constructionPeriod: project.constructionPeriod,
      expectedFinish: project.expectedFinish,
      floors: project.floors,
      units: project.units,
      facilities: project.facilities || [],
      neighborhoods: project.neighborhoods || [],
      showUnits: project.showUnits || [],
      gallery: project.gallery || [],
      coordinates: project.coordinates || { lat: null, lng: null },
      brochure: project.brochure,
      heroCarousel: project.heroCarousel || [],
      // Legacy fields for compatibility
      image: project.image,
      link: project.link,
      order: project.order,
      active: project.active,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  } catch (error: any) {
    console.error('Error fetching public project:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch project',
    });
  }
});