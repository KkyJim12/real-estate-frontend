export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  
  // Protect /api/articles, /api/carousel, and /api/upload routes (not auth routes)
  const protectedRoutes = ['/api/articles', '/api/carousel', '/api/upload'];
  const isProtected = protectedRoutes.some(route => url.pathname.startsWith(route));
  
  if (isProtected) {
    const session = getCookie(event, 'admin-session');
    
    if (session !== 'authenticated') {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized - Please login',
      });
    }
  }
});
