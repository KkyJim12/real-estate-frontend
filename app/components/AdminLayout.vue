<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-gradient-to-r from-[#1d1d39] to-[#2d2d49] text-white shadow-xl sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="flex items-center justify-center w-10 h-10 bg-[#ecbc85] rounded-lg">
              <Icon name="fa-solid:user-shield" class="text-xl text-white" />
            </div>
            <div>
              <h1 class="text-xl font-bold">Admin Panel</h1>
              <p class="text-xs text-gray-300">Content Management System</p>
            </div>
          </div>
          <div class="flex gap-3">
            <button
              @click="navigateTo('/')"
              class="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <Icon name="fa-solid:home" class="mr-2" />
              <span class="text-sm font-medium">View Site</span>
            </button>
            <button
              @click="handleLogout"
              class="flex items-center px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
            >
              <Icon name="fa-solid:sign-out-alt" class="mr-2" />
              <span class="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>

<script setup lang="ts">
const handleLogout = async () => {
  if (confirm('Are you sure you want to logout?')) {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' });
      navigateTo('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
      navigateTo('/admin/login');
    }
  }
};
</script>
