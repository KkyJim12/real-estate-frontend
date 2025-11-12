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

export default defineEventHandler(async (event) => {
  try {
    ensureDataDir();

    const body = await readBody(event);

    const newSlide = {
      id: Date.now().toString(),
      image: body.image || '',
      title: body.title || '',
      description: body.description || '',
      order: body.order || 0,
      active: body.active !== undefined ? body.active : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const data = fs.readFileSync(carouselFile, 'utf-8');
    const slides = JSON.parse(data || '[]');
    slides.push(newSlide);
    fs.writeFileSync(carouselFile, JSON.stringify(slides, null, 2));

    return newSlide;
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to create slide',
    });
  }
});
