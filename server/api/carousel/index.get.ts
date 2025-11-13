export default defineEventHandler(async () => {
  try {
    const slides = await db.getAll('carousel');
    return slides;
  } catch (error) {
    console.error('Error fetching carousel:', error);
    return [];
  }
});
