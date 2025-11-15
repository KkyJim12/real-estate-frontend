<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm py-4 px-4 sticky top-0 z-40">
      <div class="max-w-4xl mx-auto flex items-center justify-between">
        <NuxtLink to="/articles" class="flex items-center space-x-2 text-gray-600 hover:text-[#ecbc85] transition-colors">
          <Icon name="fa-solid:arrow-left" />
          <span>{{ $t('articles.backToList') }}</span>
        </NuxtLink>
        <LanguageSwitcher />
      </div>
    </nav>

    <!-- Loading State -->
    <div v-if="loading" class="max-w-4xl mx-auto px-4 py-16">
      <div class="text-center">
        <Icon name="fa-solid:spinner" class="text-5xl text-gray-400 animate-spin mb-4" />
        <p class="text-gray-500 text-lg">{{ $t('articles.loading') }}</p>
      </div>
    </div>

    <!-- Article Content -->
    <article v-else-if="article" class="max-w-4xl mx-auto px-4 py-12">
      <!-- Featured Image -->
      <div v-if="article.featuredImage" class="mb-8 rounded-lg overflow-hidden shadow-lg">
        <NuxtImg
          :src="article.featuredImage"
          :alt="article.title"
          class="w-full h-96 object-cover"
          loading="eager"
          format="webp"
          quality="85"
        />
      </div>

      <!-- Article Header -->
      <header class="mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {{ article.title }}
        </h1>
        
        <div class="flex items-center space-x-4 text-gray-600 text-sm">
          <div class="flex items-center space-x-2">
            <Icon name="fa-solid:calendar" />
            <span>{{ formatDate(article.publishedAt || article.createdAt) }}</span>
          </div>
          <div v-if="article.author" class="flex items-center space-x-2">
            <Icon name="fa-solid:user" />
            <span>{{ article.author }}</span>
          </div>
        </div>
      </header>

      <!-- Article Body -->
      <div class="prose prose-lg max-w-none">
        <div v-html="article.content" class="article-content"></div>
      </div>

      <!-- Share Section -->
      <div class="mt-12 pt-8 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-800">Share this article</h3>
          <div class="flex items-center space-x-4">
            <a
              :href="`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`"
              target="_blank"
              class="text-gray-600 hover:text-[#1877f2] transition-colors"
            >
              <Icon name="fa-brands:facebook" class="text-2xl" />
            </a>
            <a
              :href="`https://twitter.com/intent/tweet?url=${shareUrl}&text=${article.title}`"
              target="_blank"
              class="text-gray-600 hover:text-[#1da1f2] transition-colors"
            >
              <Icon name="fa-brands:twitter" class="text-2xl" />
            </a>
            <a
              :href="`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`"
              target="_blank"
              class="text-gray-600 hover:text-[#0077b5] transition-colors"
            >
              <Icon name="fa-brands:linkedin" class="text-2xl" />
            </a>
          </div>
        </div>
      </div>

      <!-- Back to Articles Button -->
      <div class="mt-12 text-center">
        <NuxtLink
          to="/articles"
          class="inline-flex items-center space-x-2 bg-[#36364e] text-white px-8 py-3 rounded-lg hover:bg-[#ecbc85] transition-colors duration-200"
        >
          <Icon name="fa-solid:arrow-left" />
          <span>{{ $t('articles.backToList') }}</span>
        </NuxtLink>
      </div>
    </article>

    <!-- Error State -->
    <div v-else class="max-w-4xl mx-auto px-4 py-16">
      <div class="text-center">
        <Icon name="fa-solid:exclamation-circle" class="text-6xl text-red-400 mb-4" />
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Article Not Found</h2>
        <p class="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
        <NuxtLink
          to="/articles"
          class="inline-flex items-center space-x-2 bg-[#36364e] text-white px-8 py-3 rounded-lg hover:bg-[#ecbc85] transition-colors duration-200"
        >
          <Icon name="fa-solid:arrow-left" />
          <span>{{ $t('articles.backToList') }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const article = ref<any>(null);
const loading = ref(true);

// Get share URL
const shareUrl = computed(() => {
  if (process.client) {
    return encodeURIComponent(window.location.href);
  }
  return '';
});

// Fetch article
const loadArticle = async () => {
  loading.value = true;
  try {
    const data: any = await $fetch(`/api/public/articles/${route.params.id}`);
    article.value = data;
  } catch (error) {
    console.error('Failed to load article:', error);
    article.value = null;
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

onMounted(() => {
  loadArticle();
});

// SEO Meta
useHead(() => ({
  title: article.value ? `${article.value.title} - Emerald Bay Pattaya` : 'Article - Emerald Bay Pattaya',
  meta: [
    { 
      name: 'description', 
      content: article.value?.excerpt || 'Read the latest article from Emerald Bay Pattaya' 
    },
  ],
}));
</script>

<style scoped>
.article-content :deep(h1) {
  @apply text-3xl font-bold mt-8 mb-4 text-gray-900;
}

.article-content :deep(h2) {
  @apply text-2xl font-bold mt-6 mb-3 text-gray-900;
}

.article-content :deep(h3) {
  @apply text-xl font-bold mt-4 mb-2 text-gray-900;
}

.article-content :deep(p) {
  @apply mb-4 text-gray-700 leading-relaxed;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  @apply mb-4 ml-6;
}

.article-content :deep(li) {
  @apply mb-2 text-gray-700;
}

.article-content :deep(a) {
  @apply text-[#ecbc85] hover:underline;
}

.article-content :deep(img) {
  @apply rounded-lg my-6 shadow-md;
}

.article-content :deep(blockquote) {
  @apply border-l-4 border-[#ecbc85] pl-4 italic my-6 text-gray-600;
}

.article-content :deep(code) {
  @apply bg-gray-100 px-2 py-1 rounded text-sm;
}

.article-content :deep(pre) {
  @apply bg-gray-100 p-4 rounded-lg overflow-x-auto my-6;
}
</style>
