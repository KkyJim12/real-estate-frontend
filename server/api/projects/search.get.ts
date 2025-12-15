export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const {
      q = '',
      type = '',
      ownership = '',
      facilities = '',
      active = '',
      limit = '10',
      offset = '0',
    } = query;

    const projects = await db.getAll('projects');
    let filteredProjects = [...projects];

    // Text search
    if (q) {
      const searchTerm = q.toString().toLowerCase();
      filteredProjects = filteredProjects.filter((project: any) =>
        project.title?.toLowerCase().includes(searchTerm) ||
        project.description?.toLowerCase().includes(searchTerm) ||
        project.developer?.toLowerCase().includes(searchTerm) ||
        project.location?.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by project type
    if (type) {
      filteredProjects = filteredProjects.filter((project: any) =>
        project.projectType === type
      );
    }

    // Filter by ownership type
    if (ownership) {
      filteredProjects = filteredProjects.filter((project: any) =>
        project.ownershipType === ownership
      );
    }

    // Filter by facilities
    if (facilities) {
      const requiredFacilities = facilities.toString().split(',');
      filteredProjects = filteredProjects.filter((project: any) =>
        requiredFacilities.every(facility =>
          project.facilities?.includes(facility.trim())
        )
      );
    }

    // Filter by active status
    if (active !== '') {
      const isActive = active === 'true';
      filteredProjects = filteredProjects.filter((project: any) =>
        project.active === isActive
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

    return {
      projects: paginatedProjects,
      total: filteredProjects.length,
      limit: limitNum,
      offset: offsetNum,
      hasMore: offsetNum + limitNum < filteredProjects.length,
    };
  } catch (error: any) {
    console.error('Error searching projects:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to search projects',
    });
  }
});