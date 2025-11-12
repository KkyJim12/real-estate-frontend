export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  
  // Only protect /api/articles routes (not auth routes)
  if (url.pathname.startsWith('/api/articles')) {
    const session = getCookie(event, 'admin-session');
    
    if (session !== 'authenticated') {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized - Please login',
      });
    }
  }
});
