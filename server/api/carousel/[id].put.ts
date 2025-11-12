import fs from 'fs';
import path from 'path';

const carouselFile = path.join(process.cwd(), 'data', 'carousel.json');

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);

  try {
    const data = fs.readFileSync(carouselFile, 'utf-8');
    const slides = JSON.parse(data);
    const index = slides.findIndex((s: any) => s.id === id);

    if (index === -1) {
      throw createError({
        statusCode: 404,
        message: 'Slide not found',
      });
    }

    slides[index] = {
      ...slides[index],
      image: body.image,
      title: body.title,
      description: body.description,
      order: body.order,
      active: body.active,
      updatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(carouselFile, JSON.stringify(slides, null, 2));

    return slides[index];
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to update slide',
    });
  }
});
