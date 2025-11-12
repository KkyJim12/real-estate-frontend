import fs from 'fs';
import path from 'path';

const carouselFile = path.join(process.cwd(), 'data', 'carousel.json');

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  try {
    const data = fs.readFileSync(carouselFile, 'utf-8');
    let slides = JSON.parse(data);
    const index = slides.findIndex((s: any) => s.id === id);

    if (index === -1) {
      throw createError({
        statusCode: 404,
        message: 'Slide not found',
      });
    }

    slides = slides.filter((s: any) => s.id !== id);
    fs.writeFileSync(carouselFile, JSON.stringify(slides, null, 2));

    return { success: true, message: 'Slide deleted' };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to delete slide',
    });
  }
});
