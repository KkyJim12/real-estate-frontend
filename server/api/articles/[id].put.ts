import fs from 'fs';
import path from 'path';

const articlesFile = path.join(process.cwd(), 'data', 'articles.json');

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);
  
  try {
    const data = fs.readFileSync(articlesFile, 'utf-8');
    const articles = JSON.parse(data);
    const index = articles.findIndex((a: any) => a.id === id);
    
    if (index === -1) {
      throw createError({
        statusCode: 404,
        message: 'Article not found',
      });
    }
    
    articles[index] = {
      ...articles[index],
      title: body.title,
      image: body.image,
      content: body.content,
      updatedAt: new Date().toISOString(),
    };
    
    fs.writeFileSync(articlesFile, JSON.stringify(articles, null, 2));
    
    return articles[index];
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to update article',
    });
  }
});
