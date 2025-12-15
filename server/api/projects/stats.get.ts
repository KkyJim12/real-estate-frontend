export default defineEventHandler(async (event) => {
  try {
    const projects = await db.getAll('projects');
    
    const stats = {
      total: projects.length,
      active: projects.filter((p: any) => p.active).length,
      inactive: projects.filter((p: any) => !p.active).length,
      byType: {} as Record<string, number>,
      byOwnership: {} as Record<string, number>,
      totalUnits: 0,
      totalFloors: 0,
      averageUnits: 0,
      averageFloors: 0,
      facilitiesCount: {} as Record<string, number>,
      recentProjects: projects
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
        .map((p: any) => ({
          id: p.id,
          title: p.title,
          projectType: p.projectType,
          createdAt: p.createdAt,
          active: p.active,
        })),
    };

    // Calculate statistics
    let totalUnits = 0;
    let totalFloors = 0;
    let projectsWithUnits = 0;
    let projectsWithFloors = 0;

    projects.forEach((project: any) => {
      // Project type stats
      if (project.projectType) {
        stats.byType[project.projectType] = (stats.byType[project.projectType] || 0) + 1;
      }

      // Ownership type stats
      if (project.ownershipType) {
        stats.byOwnership[project.ownershipType] = (stats.byOwnership[project.ownershipType] || 0) + 1;
      }

      // Units and floors
      if (project.units && project.units > 0) {
        totalUnits += project.units;
        projectsWithUnits++;
      }
      if (project.floors && project.floors > 0) {
        totalFloors += project.floors;
        projectsWithFloors++;
      }

      // Facilities count
      if (project.facilities && Array.isArray(project.facilities)) {
        project.facilities.forEach((facility: string) => {
          stats.facilitiesCount[facility] = (stats.facilitiesCount[facility] || 0) + 1;
        });
      }
    });

    stats.totalUnits = totalUnits;
    stats.totalFloors = totalFloors;
    stats.averageUnits = projectsWithUnits > 0 ? Math.round(totalUnits / projectsWithUnits) : 0;
    stats.averageFloors = projectsWithFloors > 0 ? Math.round(totalFloors / projectsWithFloors) : 0;

    return stats;
  } catch (error: any) {
    console.error('Error fetching project stats:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch project statistics',
    });
  }
});