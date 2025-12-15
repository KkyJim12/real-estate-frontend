export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const {
      limit = '10',
      offset = '0',
      type = '',
      featured = '',
    } = query;

    const projects = await db.getAll('projects');
    
    // Filter only active projects
    let filteredProjects = projects.filter((project: any) => project.active);

    // Filter by project type if specified
    if (type) {
      filteredProjects = filteredProjects.filter((project: any) =>
        project.projectType === type
      );
    }

    // Filter featured projects if specified
    if (featured === 'true') {
      filteredProjects = filteredProjects.filter((project: any) =>
        project.featured === true
      );
    }

    // Sort by order, then by creation date
    filteredProjects.sort((a: any, b: any) => {
      if (a.order !== b.order) {
        return (a.order || 0) - (b.order || 0);
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Pagination
    const limitNum = parseInt(limit.toString()) || 10;
    const offsetNum = parseInt(offset.toString()) || 0;
    const paginatedProjects = filteredProjects.slice(offsetNum, offsetNum + limitNum);

    // Return simplified project data for listing
    const projectList = paginatedProjects.map((project: any) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      developer: project.developer,
      location: project.location,
      projectType: project.projectType,
      image: project.image || project.gallery?.[0]?.images?.[0]?.url,
      link: project.link,
      order: project.order,
      createdAt: project.createdAt,
    }));

    return {
      projects: projectList,
      total: filteredProjects.length,
      limit: limitNum,
      offset: offsetNum,
      hasMore: offsetNum + limitNum < filteredProjects.length,
    };
  } catch (error: any) {
    console.error('Error fetching public projects:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch projects',
    });
  }
});