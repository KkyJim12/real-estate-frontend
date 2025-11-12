import fs from 'fs';
import path from 'path';

const articlesFile = path.join(process.cwd(), 'data', 'articles.json');

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  
  try {
    const data = fs.readFileSync(articlesFile, 'utf-8');
    const articles = JSON.parse(data);
    const article = articles.find((a: any) => a.id === id);
    
    if (!article) {
      throw createError({
        statusCode: 404,
        message: 'Article not found',
      });
    }
    
    return article;
  } catch (error) {
    throw createError({
      statusCode: 404,
      message: 'Article not found',
    });
  }
});
