import fs from 'fs';
import path from 'path';

const articlesFile = path.join(process.cwd(), 'data', 'articles.json');

const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(articlesFile)) {
    fs.writeFileSync(articlesFile, JSON.stringify([]));
  }
};

export default defineEventHandler(async (event) => {
  try {
    ensureDataDir();
    
    const body = await readBody(event);
    
    console.log('Received article data:', body);
    
    const newArticle = {
      id: Date.now().toString(),
      title: body.title || '',
      image: body.image || '',
      content: body.content || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const data = fs.readFileSync(articlesFile, 'utf-8');
    const articles = JSON.parse(data || '[]');
    articles.push(newArticle);
    fs.writeFileSync(articlesFile, JSON.stringify(articles, null, 2));
    
    console.log('Article saved successfully:', newArticle.id);
    
    return newArticle;
  } catch (error: any) {
    console.error('Error saving article:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to create article',
    });
  }
});
