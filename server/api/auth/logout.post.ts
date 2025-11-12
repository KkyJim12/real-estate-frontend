export default defineEventHandler(async (event) => {
  // Clear session cookie
  deleteCookie(event, 'admin-session');

  return {
    success: true,
    message: 'Logged out successfully',
  };
});
