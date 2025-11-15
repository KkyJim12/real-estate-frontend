export default defineEventHandler(async () => {
  try {
    const projects = await db.getAll('projects');
    // Return only active projects, sorted by order
    const activeProjects = projects
      .filter((project: any) => project.active)
      .sort((a: any, b: any) => a.order - b.order);
    return activeProjects;
  } catch (error) {
    console.error('Error fetching public projects:', error);
    return [];
  }
});
