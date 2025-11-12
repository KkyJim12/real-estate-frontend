export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  // Simple authentication (replace with database check in production)
  if (username === 'admin' && password === 'admin123') {
    // Set session cookie
    setCookie(event, 'admin-session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
    });

    return {
      success: true,
      user: {
        username: 'admin',
        role: 'admin',
      },
    };
  }

  throw createError({
    statusCode: 401,
    message: 'Invalid username or password',
  });
});
