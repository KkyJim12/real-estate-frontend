<template>
  <!-- Navigation -->
  <SiteNavigation />

  <!-- Carousel -->
  <div class="w-full">
    <!-- Loading State -->
    <div v-if="loading"
      class="w-full h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-7rem)] bg-gray-200 flex items-center justify-center">
      <div class="text-center">
        <Icon name="fa-solid:spinner" class="text-4xl text-gray-400 animate-spin mb-4" />
        <p class="text-gray-500">{{ $t('carousel.loading') }}</p>
      </div>
    </div>

    <!-- Carousel -->
    <UCarousel v-else-if="items.length > 0" v-slot="{ item }" :items="items" loop :autoplay="{ delay: 4000 }" arrows
      dots class="w-full h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-7rem)] overflow-hidden" :ui="{
        root: 'relative w-full h-full',
        viewport: 'w-full h-full overflow-hidden',
        container: 'flex h-full w-full',
        item: 'min-w-full h-full flex-shrink-0',
        dots: 'absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center space-x-2 sm:space-x-3 z-20',
        dot: 'h-1 w-8 sm:w-10 rounded-sm bg-[#ecbc85]/50 data-[active=true]:bg-[#ecbc85] transition-colors duration-300',
      }">
      <div class="w-full h-full relative">
        <NuxtImg :src="item" alt="Carousel slide" class="absolute inset-0 w-full h-full object-cover" loading="lazy"
          format="webp" quality="80" />
      </div>
    </UCarousel>

    <!-- Empty State -->
    <div v-else
      class="w-full h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-7rem)] bg-gray-100 flex items-center justify-center">
      <div class="text-center px-4">
        <Icon name="fa-solid:images" class="text-6xl text-gray-300 mb-4" />
        <p class="text-gray-500 text-lg">{{ $t('carousel.noSlides') }}</p>
      </div>
    </div>
  </div>

  <!-- About Us Section -->
  <div
    class="py-10 sm:py-16 lg:py-20 flex flex-col items-center justify-center space-y-4 sm:space-y-6 px-4 sm:px-8 lg:px-96">
    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#36384f] text-center">
      {{ $t('home.aboutTitle') }}
    </h2>
    <p class="text-sm sm:text-base lg:text-xl text-[#2c3c51] text-center max-w-4xl">
      <span class="block mb-2">{{ $t('home.aboutText1') }}</span>
      <span class="block mb-2">{{ $t('home.aboutText2') }}</span>
      <span class="block">{{ $t('home.aboutText3') }}</span>
    </p>
  </div>

  <!-- Our Business Section Header -->
  <div class="py-10 sm:py-16 lg:py-20 flex flex-col justify-center space-y-4 sm:space-y-6 px-4 sm:px-8 lg:px-96">
    <div class="flex items-center w-full">
      <hr class="flex-grow border-t-2 sm:border-t-3 border-[#ecbc85]" />
      <h2 class="px-3 sm:px-6 text-xl sm:text-3xl lg:text-4xl font-bold text-[#36384f] whitespace-nowrap">
        {{ $t('home.businessTitle') }}
      </h2>
      <hr class="flex-grow border-t-2 sm:border-t-3 border-[#ecbc85]" />
    </div>
  </div>

  <!-- Business Items -->
  <div class="flex flex-col space-y-12 sm:space-y-16 lg:space-y-20 px-4 sm:px-8 lg:px-96 pb-16 sm:pb-24 lg:pb-32">
    <!-- Dynamic Projects -->
    <div v-for="(project, index) in projects" :key="project.id"
      class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-x-20">
      <!-- Content (Left on even, Right on odd) -->
      <div :class="[
        'lg:col-span-7',
        index % 2 === 0 ? 'order-2 lg:order-1' : 'order-2'
      ]">
        <div
          class="flex flex-col justify-center lg:items-start items-center h-full space-y-4 sm:space-y-6 lg:space-y-8 w-full text-center lg:text-left">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#36384f]">
            {{ project.title }}
          </h2>
          <hr class="border-t-2 sm:border-t-3 border-[#ecbc85] w-4/5 sm:w-4/5" />
          <p class="text-sm sm:text-base lg:text-xl text-[#2c3c51] whitespace-pre-line">
            {{ project.description }}
          </p>
          <NuxtLink :to="project.link && project.link !== '/' ? project.link : `/projects/${project.id}`"
            class="bg-[#36364e] w-60 sm:w-48 lg:w-40 py-2 sm:py-3 flex justify-center text-white text-base sm:text-lg lg:text-xl duration-200 hover:bg-[#ecbc85]">
            {{ $t('ramada.viewMore') }}
          </NuxtLink>
        </div>
      </div>

      <!-- Image (Right on even, Left on odd) -->
      <div :class="[
        'lg:col-span-5',
        index % 2 === 0 ? 'order-1 lg:order-2 flex justify-center' : 'order-1 flex justify-center lg:justify-start'
      ]">
        <NuxtImg v-if="project.image"
          class="w-3/5 lg:w-full h-64 sm:h-80 lg:h-full object-cover rounded-lg lg:rounded-none" :src="project.image"
          :alt="project.title" loading="lazy" format="webp" quality="80" />
        <div v-else
          class="w-3/5 lg:w-full h-64 sm:h-80 lg:h-full bg-gray-200 rounded-lg lg:rounded-none flex items-center justify-center">
          <Icon name="fa-solid:building" class="text-6xl text-gray-400" />
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="projects.length === 0 && !loadingProjects" class="text-center py-12">
      <Icon name="fa-solid:building" class="text-6xl text-gray-300 mb-4" />
      <p class="text-gray-500 text-lg">No projects available</p>
    </div>
  </div>

  <!-- Latest News Section -->
  <div class="bg-gray-50 py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-96">
    <!-- Section Header -->
    <div class="flex flex-col items-center mb-12">
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#36384f] mb-4 text-center">
        {{ $t('news.title') }}
      </h2>
      <p class="text-base sm:text-lg text-gray-600 text-center max-w-2xl mb-8">
        {{ $t('news.subtitle') }}
      </p>
      <hr class="border-t-2 border-[#ecbc85] w-24" />
    </div>

    <!-- Loading State -->
    <div v-if="loadingArticles" class="text-center py-12">
      <Icon name="fa-solid:spinner" class="text-4xl text-gray-400 animate-spin mb-4" />
      <p class="text-gray-500">{{ $t('articles.loading') }}</p>
    </div>

    <!-- Articles Grid -->
    <div v-else-if="latestArticles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      <article v-for="article in latestArticles" :key="article.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <NuxtLink :to="`/articles/${article.id}`" class="block">
          <!-- Article Image -->
          <div class="relative h-48 bg-gray-200 overflow-hidden">
            <NuxtImg v-if="article.featuredImage" :src="article.featuredImage" :alt="article.title"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy"
              format="webp" quality="80" />
            <div v-else
              class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1d1d39] to-[#36364e]">
              <Icon name="fa-solid:newspaper" class="text-6xl text-white/30" />
            </div>
          </div>

          <!-- Article Content -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-[#ecbc85] transition-colors">
              {{ article.title }}
            </h3>

            <p class="text-gray-600 text-sm mb-4 line-clamp-3">
              {{ article.excerpt || stripHtml(article.content) }}
            </p>

            <div class="flex items-center justify-between text-sm text-gray-500">
              <span>{{ formatDate(article.publishedAt || article.createdAt) }}</span>
              <span class="text-[#ecbc85] font-semibold flex items-center space-x-1">
                <span>{{ $t('articles.readMore') }}</span>
                <Icon name="fa-solid:arrow-right" class="text-xs" />
              </span>
            </div>
          </div>
        </NuxtLink>
      </article>
    </div>

    <!-- View All Button -->
    <div v-if="latestArticles.length > 0" class="text-center">
      <NuxtLink to="/articles"
        class="inline-flex items-center space-x-2 bg-[#36364e] text-white px-8 py-3 rounded-lg hover:bg-[#ecbc85] transition-colors duration-200 text-lg font-semibold">
        <span>{{ $t('news.viewAll') }}</span>
        <Icon name="fa-solid:arrow-right" />
      </NuxtLink>
    </div>

    <!-- Empty State -->
    <div v-else-if="!loadingArticles" class="text-center py-12">
      <Icon name="fa-solid:newspaper" class="text-6xl text-gray-300 mb-4" />
      <p class="text-gray-500 text-lg">{{ $t('articles.noArticles') }}</p>
    </div>
  </div>

  <Footer />

  <!-- Mobile Bottom Bar -->
  <MobileBottomBar />
</template>

<script setup lang="ts">
const carouselSlides = ref<any[]>([]);
const loading = ref(true);
const latestArticles = ref<any[]>([]);
const loadingArticles = ref(true);
const projects = ref<any[]>([]);
const loadingProjects = ref(true);

// Fetch carousel slides from backend
const loadCarousel = async () => {
  loading.value = true;
  try {
    const data: any = await $fetch('/api/public/carousel');
    // Filter only active slides and sort by order
    const activeSlides = data
      .filter((slide: any) => slide.active)
      .sort((a: any, b: any) => a.order - b.order);
    carouselSlides.value = activeSlides;
  } catch (error) {
    console.error('Failed to load carousel:', error);
    // Fallback to placeholder images if API fails
    carouselSlides.value = [
      { id: '1', image: 'https://picsum.photos/1920/1080?random=1', title: '', description: '' },
      { id: '2', image: 'https://picsum.photos/1920/1080?random=2', title: '', description: '' },
      { id: '3', image: 'https://picsum.photos/1920/1080?random=3', title: '', description: '' },
    ];
  } finally {
    loading.value = false;
  }
};

// Fetch latest articles
const loadLatestArticles = async () => {
  loadingArticles.value = true;
  try {
    const data: any = await $fetch('/api/public/articles');
    // Get only the latest 3 articles
    latestArticles.value = data.slice(0, 3);
  } catch (error) {
    console.error('Failed to load articles:', error);
    latestArticles.value = [];
  } finally {
    loadingArticles.value = false;
  }
};

// Fetch projects
const loadProjects = async () => {
  loadingProjects.value = true;
  try {
    const data: any = await $fetch('/api/public/projects');
    projects.value = data;
  } catch (error) {
    console.error('Failed to load projects:', error);
    projects.value = [];
  } finally {
    loadingProjects.value = false;
  }
};

// Computed property to get carousel items (just the image URLs)
const items = computed(() => {
  return carouselSlides.value.map((slide) => slide.image);
});

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Strip HTML tags for excerpt
const stripHtml = (html: string) => {
  if (!html) return '';
  if (process.client) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
  return html.replace(/<[^>]*>/g, '');
};

onMounted(() => {
  loadCarousel();
  loadLatestArticles();
  loadProjects();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
