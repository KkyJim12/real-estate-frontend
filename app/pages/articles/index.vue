<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <SiteNavigation />

    <!-- Header -->
    <header class="bg-[#1d1d39] text-white py-40 px-4 mt-14 lg:mt-0">
      <div class="max-w-6xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ $t('articles.title') }}</h1>
        <p class="text-lg md:text-xl text-white/80">{{ $t('articles.subtitle') }}</p>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="max-w-6xl mx-auto px-4 py-16">
      <div class="text-center">
        <Icon name="fa-solid:spinner" class="text-5xl text-gray-400 animate-spin mb-4" />
        <p class="text-gray-500 text-lg">{{ $t('articles.loading') }}</p>
      </div>
    </div>

    <!-- Articles Grid -->
    <div v-else-if="articles.length > 0" class="max-w-6xl mx-auto px-4 py-12 pb-28 lg:pb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="article in articles"
          :key="article.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <NuxtLink :to="`/articles/${article.id}`" class="block">
            <!-- Article Image -->
            <div class="relative h-48 bg-gray-200 overflow-hidden">
              <NuxtImg
                v-if="article.image"
                :src="article.image"
                :alt="article.title"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
                format="webp"
                quality="80"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1d1d39] to-[#36364e]">
                <Icon name="fa-solid:newspaper" class="text-6xl text-white/30" />
              </div>
            </div>

            <!-- Article Content -->
            <div class="p-6">
              <h2 class="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-[#ecbc85] transition-colors">
                {{ article.title }}
              </h2>
              
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
    </div>

    <!-- Empty State -->
    <div v-else class="max-w-6xl mx-auto px-4 py-16">
      <div class="text-center">
        <Icon name="fa-solid:newspaper" class="text-6xl text-gray-300 mb-4" />
        <p class="text-gray-500 text-lg">{{ $t('articles.noArticles') }}</p>
      </div>
    </div>

    <!-- Mobile Bottom Bar -->
    <MobileBottomBar />
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();

const articles = ref<any[]>([]);
const loading = ref(true);

// Fetch articles
const loadArticles = async () => {
  loading.value = true;
  try {
    const data: any = await $fetch('/api/public/articles', {
      query: { lang: locale.value }
    });
    articles.value = data;
  } catch (error) {
    console.error('Failed to load articles:', error);
    articles.value = [];
  } finally {
    loading.value = false;
  }
};

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Strip HTML tags for excerpt
const stripHtml = (html: string) => {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

onMounted(() => {
  loadArticles();
});

// Watch for language changes and reload content
watch(locale, () => {
  loadArticles();
});

// SEO Meta
useHead({
  title: 'News & Articles - Emerald Bay Pattaya',
  meta: [
    { name: 'description', content: 'Stay updated with the latest news and insights from Emerald Bay Pattaya' },
  ],
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
