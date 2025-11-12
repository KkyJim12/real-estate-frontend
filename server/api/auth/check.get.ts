export default defineEventHandler(async (event) => {
  const session = getCookie(event, 'admin-session');

  if (session === 'authenticated') {
    return {
      authenticated: true,
      user: {
        username: 'admin',
        role: 'admin',
      },
    };
  }

  return {
    authenticated: false,
  };
});
