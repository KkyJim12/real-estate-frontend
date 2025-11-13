export default defineEventHandler(async () => {
  try {
    const articles = await db.getAll('articles');
    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
});
