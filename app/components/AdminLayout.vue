<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile Header -->
    <div class="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-[#1d1d39] to-[#2d2d49] text-white shadow-xl z-50">
      <div class="flex items-center justify-between px-4 py-3">
        <div class="flex items-center space-x-3">
          <div class="flex items-center justify-center w-10 h-10 bg-[#ecbc85] rounded-lg">
            <Icon name="fa-solid:user-shield" class="text-lg text-white" />
          </div>
          <div>
            <h1 class="text-lg font-bold">Admin Panel</h1>
          </div>
        </div>
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="p-2">
          <Icon :name="mobileMenuOpen ? 'fa-solid:times' : 'fa-solid:bars'" class="text-2xl" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div
      v-if="mobileMenuOpen"
      class="lg:hidden fixed inset-0 bg-black/50 z-40"
      @click="mobileMenuOpen = false"
    ></div>

    <!-- Sidebar -->
    <aside
      class="w-64 bg-gradient-to-b from-[#1d1d39] to-[#2d2d49] text-white fixed h-full shadow-2xl z-40 transition-transform duration-300"
      :class="{
        'translate-x-0': mobileMenuOpen,
        '-translate-x-full lg:translate-x-0': !mobileMenuOpen,
      }"
    >
      <div class="p-6 pt-20 lg:pt-6">
        <div class="hidden lg:flex items-center space-x-3 mb-8">
          <div class="flex items-center justify-center w-12 h-12 bg-[#ecbc85] rounded-xl">
            <Icon name="fa-solid:user-shield" class="text-2xl text-white" />
          </div>
          <div>
            <h1 class="text-xl font-bold">Admin Panel</h1>
            <p class="text-xs text-gray-400">CMS</p>
          </div>
        </div>

        <nav class="space-y-2">
          <NuxtLink
            to="/admin/articles"
            @click="mobileMenuOpen = false"
            class="flex items-center px-4 py-3 rounded-lg transition-colors hover:bg-white/10"
            :class="{ 'bg-[#ecbc85] text-white': isActive('/admin/articles') }"
          >
            <Icon name="fa-solid:newspaper" class="mr-3 text-lg" />
            <span class="font-medium">Articles</span>
          </NuxtLink>

          <NuxtLink
            to="/admin/carousel"
            @click="mobileMenuOpen = false"
            class="flex items-center px-4 py-3 rounded-lg transition-colors hover:bg-white/10"
            :class="{ 'bg-[#ecbc85] text-white': isActive('/admin/carousel') }"
          >
            <Icon name="fa-solid:images" class="mr-3 text-lg" />
            <span class="font-medium">Carousel</span>
          </NuxtLink>
        </nav>
      </div>

      <div class="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
        <button
          @click="navigateTo('/')"
          class="flex items-center w-full px-4 py-2 mb-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          <Icon name="fa-solid:home" class="mr-2" />
          <span class="text-sm font-medium">View Site</span>
        </button>
        <button
          @click="handleLogout"
          class="flex items-center w-full px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
        >
          <Icon name="fa-solid:sign-out-alt" class="mr-2" />
          <span class="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 lg:ml-64 pt-16 lg:pt-0">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const mobileMenuOpen = ref(false);

const isActive = (path: string) => {
  return route.path.startsWith(path);
};

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

// Close mobile menu on route change
watch(() => route.path, () => {
  mobileMenuOpen.value = false;
});
</script>
