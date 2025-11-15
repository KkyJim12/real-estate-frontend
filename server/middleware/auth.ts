export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  
  // Protect /api/articles, /api/carousel, /api/projects, and /api/upload routes (not auth or public routes)
  const protectedRoutes = ['/api/articles', '/api/carousel', '/api/projects', '/api/upload'];
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
