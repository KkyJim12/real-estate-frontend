export default defineEventHandler(async () => {
  try {
    const articles = await db.getAll('articles');
    // Return only published articles, sorted by date (newest first)
    const publishedArticles = articles
      .filter((article: any) => article.status === 'published')
      .sort((a: any, b: any) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
    return publishedArticles;
  } catch (error) {
    console.error('Error fetching public articles:', error);
    return [];
  }
});
