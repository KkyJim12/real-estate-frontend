export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    try {
      const response: any = await $fetch('/api/auth/check');
      
      if (!response.authenticated && to.path !== '/admin/login') {
        return navigateTo('/admin/login');
      }
      
      if (response.authenticated && to.path === '/admin/login') {
        return navigateTo('/admin/projects');
      }
    } catch (error) {
      if (to.path !== '/admin/login') {
        return navigateTo('/admin/login');
      }
    }
  }
});
