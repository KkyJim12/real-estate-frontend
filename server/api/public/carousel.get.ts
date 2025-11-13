export default defineEventHandler(async () => {
  try {
    const slides = await db.getAll('carousel');
    // Return only active slides, sorted by order
    const activeSlides = slides
      .filter((slide: any) => slide.active)
      .sort((a: any, b: any) => a.order - b.order);
    return activeSlides;
  } catch (error) {
    console.error('Error fetching public carousel:', error);
    return [];
  }
});
