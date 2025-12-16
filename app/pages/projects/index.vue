<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <SiteNavigation />

    <!-- Header -->
    <header class="bg-[#1d1d39] text-white py-40 px-4 mt-14 lg:mt-0">
      <div class="max-w-6xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ $t('home.businessTitle') }}</h1>
        <p class="text-lg md:text-xl text-white/80">{{ $t('projects.subtitle') }}</p>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="max-w-6xl mx-auto px-4 py-16">
      <div class="text-center">
        <Icon name="fa-solid:spinner" class="text-4xl text-gray-400 animate-spin mb-4" />
        <p class="text-gray-500">{{ $t('projects.loading') }}</p>
      </div>
    </div>

    <!-- Projects Grid -->
    <div v-else-if="projects.length > 0" class="max-w-6xl mx-auto px-4 py-12 pb-28 lg:pb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <article
          v-for="project in projects"
          :key="project.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <NuxtLink :to="`/projects/${project.id}`" class="block">
            <!-- Project Image -->
            <div class="relative h-64 bg-gray-200 overflow-hidden">
              <NuxtImg
                v-if="project.image"
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
                format="webp"
                quality="80"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1d1d39] to-[#36364e]">
                <Icon name="fa-solid:building" class="text-6xl text-white/30" />
              </div>
            </div>

            <!-- Project Content -->
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-800 mb-3 hover:text-[#ecbc85] transition-colors">
                {{ project.title }}
              </h3>
              
              <p class="text-gray-600 text-base mb-4 line-clamp-3">
                {{ project.description }}
              </p>

              <div class="flex items-center justify-end">
                <span class="text-[#ecbc85] font-semibold flex items-center space-x-1">
                  <span>{{ $t('projects.viewProject') }}</span>
                  <Icon name="fa-solid:arrow-right" class="text-xs" />
                </span>
              </div>
            </div>
          </NuxtLink>
        </article>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="max-w-6xl mx-auto px-4 py-16">
      <div class="text-center">
        <Icon name="fa-solid:building" class="text-6xl text-gray-300 mb-4" />
        <p class="text-gray-500 text-lg">{{ $t('projects.noProjects') }}</p>
      </div>
    </div>

    <!-- Mobile Bottom Bar -->
    <MobileBottomBar />
  </div>
</template>

<script setup lang="ts">
const projects = ref<any[]>([]);
const loading = ref(true);

// Fetch projects
const loadProjects = async () => {
  loading.value = true;
  try {
    const data: any = await $fetch('/api/public/projects');
    projects.value = data;
  } catch (error) {
    console.error('Failed to load projects:', error);
    projects.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadProjects();
});

// SEO Meta
useHead({
  title: 'Our Projects - Emerald Bay Pattaya',
  meta: [
    { name: 'description', content: 'Explore our business projects at Emerald Bay Pattaya' },
  ],
});
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
