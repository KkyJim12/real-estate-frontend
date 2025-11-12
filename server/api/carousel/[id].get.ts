import fs from 'fs';
import path from 'path';

const carouselFile = path.join(process.cwd(), 'data', 'carousel.json');

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  try {
    const data = fs.readFileSync(carouselFile, 'utf-8');
    const slides = JSON.parse(data);
    const slide = slides.find((s: any) => s.id === id);

    if (!slide) {
      throw createError({
        statusCode: 404,
        message: 'Slide not found',
      });
    }

    return slide;
  } catch (error) {
    throw createError({
      statusCode: 404,
      message: 'Slide not found',
    });
  }
});
