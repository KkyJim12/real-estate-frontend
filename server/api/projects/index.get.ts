export default defineEventHandler(async () => {
  try {
    const projects = await db.getAll('projects');
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
});
