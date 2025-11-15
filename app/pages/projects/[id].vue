<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <SiteNavigation />

    <!-- Breadcrumb -->
    <div class="bg-white border-b border-gray-200 py-4 px-4 mt-14 lg:mt-0">
      <div class="max-w-4xl mx-auto">
        <NuxtLink to="/" class="flex items-center space-x-2 text-gray-600 hover:text-[#ecbc85] transition-colors">
          <Icon name="fa-solid:arrow-left" />
          <span>{{ $t('nav.home') }}</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="max-w-4xl mx-auto px-4 py-16">
      <div class="text-center">
        <Icon name="fa-solid:spinner" class="text-5xl text-gray-400 animate-spin mb-4" />
        <p class="text-gray-500 text-lg">{{ $t('carousel.loading') }}</p>
      </div>
    </div>

    <!-- Project Content -->
    <article v-else-if="project" class="max-w-4xl mx-auto px-4 py-12 pb-28 lg:pb-12">
      <!-- Featured Image -->
      <div v-if="project.image" class="mb-8 rounded-lg overflow-hidden shadow-lg">
        <NuxtImg
          :src="project.image"
          :alt="project.title"
          class="w-full h-96 object-cover"
          loading="eager"
          format="webp"
          quality="85"
        />
      </div>

      <!-- Project Header -->
      <header class="mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {{ project.title }}
        </h1>
      </header>

      <!-- Project Description -->
      <div class="prose prose-lg max-w-none">
        <div class="project-description text-gray-700 leading-relaxed whitespace-pre-line">
          {{ project.description }}
        </div>
      </div>

      <!-- Project Link -->
      <div v-if="project.link && project.link !== '/'" class="mt-8 pt-8 border-t border-gray-200">
        <a
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center space-x-2 bg-[#36364e] text-white px-8 py-3 rounded-lg hover:bg-[#ecbc85] transition-colors duration-200"
        >
          <span>Visit Website</span>
          <Icon name="fa-solid:external-link-alt" />
        </a>
      </div>

      <!-- Back to Home Button -->
      <div class="mt-12 text-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center space-x-2 bg-[#36364e] text-white px-8 py-3 rounded-lg hover:bg-[#ecbc85] transition-colors duration-200"
        >
          <Icon name="fa-solid:arrow-left" />
          <span>{{ $t('nav.home') }}</span>
        </NuxtLink>
      </div>
    </article>

    <!-- Error State -->
    <div v-else class="max-w-4xl mx-auto px-4 py-16">
      <div class="text-center">
        <Icon name="fa-solid:exclamation-circle" class="text-6xl text-red-400 mb-4" />
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Project Not Found</h2>
        <p class="text-gray-600 mb-8">The project you're looking for doesn't exist or has been removed.</p>
        <NuxtLink
          to="/"
          class="inline-flex items-center space-x-2 bg-[#36364e] text-white px-8 py-3 rounded-lg hover:bg-[#ecbc85] transition-colors duration-200"
        >
          <Icon name="fa-solid:arrow-left" />
          <span>{{ $t('nav.home') }}</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Mobile Bottom Bar -->
    <MobileBottomBar />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const project = ref<any>(null);
const loading = ref(true);

// Fetch project
const loadProject = async () => {
  loading.value = true;
  try {
    const data: any = await $fetch(`/api/public/projects/${route.params.id}`);
    project.value = data;
  } catch (error) {
    console.error('Failed to load project:', error);
    project.value = null;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadProject();
});

// SEO Meta
useHead(() => ({
  title: project.value ? `${project.value.title} - Emerald Bay Pattaya` : 'Project - Emerald Bay Pattaya',
  meta: [
    { 
      name: 'description', 
      content: project.value?.description || 'View project details from Emerald Bay Pattaya' 
    },
  ],
}));
</script>

<style scoped>
.project-description {
  font-size: 1.125rem;
  line-height: 1.75;
}
</style>
