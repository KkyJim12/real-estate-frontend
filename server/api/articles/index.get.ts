import fs from 'fs';
import path from 'path';

const articlesFile = path.join(process.cwd(), 'data', 'articles.json');

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(articlesFile)) {
    fs.writeFileSync(articlesFile, JSON.stringify([]));
  }
};

export default defineEventHandler(async () => {
  ensureDataDir();
  
  try {
    const data = fs.readFileSync(articlesFile, 'utf-8');
    const articles = JSON.parse(data);
    return articles;
  } catch (error) {
    return [];
  }
});
