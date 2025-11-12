import fs from 'fs';
import path from 'path';

const carouselFile = path.join(process.cwd(), 'data', 'carousel.json');

const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(carouselFile)) {
    fs.writeFileSync(carouselFile, JSON.stringify([]));
  }
};

export default defineEventHandler(async () => {
  ensureDataDir();

  try {
    const data = fs.readFileSync(carouselFile, 'utf-8');
    const slides = JSON.parse(data);
    return slides;
  } catch (error) {
    return [];
  }
});
