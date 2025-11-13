<template>
  <AdminLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <div class="mb-6 sm:mb-8">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">News Articles</h1>
            <p class="text-sm sm:text-base text-gray-600">Manage your news articles and content</p>
          </div>
          <button
            @click="navigateTo('/admin/articles/create')"
            class="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#ecbc85] to-[#d4a574] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 whitespace-nowrap"
          >
            <Icon name="fa-solid:plus" class="mr-2" />
            Create Article
          </button>
        </div>
      </div>

      <div v-if="loading" class="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
        <Icon name="fa-solid:spinner" class="text-4xl text-gray-400 animate-spin mb-4" />
        <p class="text-gray-500">Loading articles...</p>
      </div>

      <div v-else-if="articles.length === 0" class="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
          <Icon name="fa-solid:newspaper" class="text-4xl text-gray-400" />
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">No articles yet</h3>
        <p class="text-gray-500 mb-6">Get started by creating your first article</p>
        <button
          @click="navigateTo('/admin/articles/create')"
          class="inline-flex items-center px-6 py-3 bg-[#ecbc85] text-white font-semibold rounded-lg hover:bg-[#d4a574] transition-colors"
        >
          <Icon name="fa-solid:plus" class="mr-2" />
          Create First Article
        </button>
      </div>

      <div v-else class="grid grid-cols-1 gap-4 sm:gap-6">
        <div
          v-for="article in articles"
          :key="article.id"
          class="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
        >
          <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6">
            <div v-if="article.image" class="flex-shrink-0">
              <img
                :src="article.image"
                :alt="article.title"
                class="w-full sm:w-48 md:w-64 h-48 sm:h-32 md:h-40 object-cover rounded-lg"
              />
            </div>
            <div class="flex-1 min-w-0">
              <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">{{ article.title }}</h2>
              <div class="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3" v-html="article.content"></div>
              <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
                <button
                  @click="navigateTo(`/admin/articles/edit/${article.id}`)"
                  class="flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Icon name="fa-solid:edit" class="mr-2" />
                  Edit
                </button>
                <button
                  @click="deleteArticle(article.id)"
                  class="flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Icon name="fa-solid:trash" class="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

const articles = ref<any[]>([]);
const loading = ref(false);

const loadArticles = async () => {
  loading.value = true;
  try {
    const data: any = await $fetch('/api/articles');
    articles.value = data;
  } catch (error: any) {
    console.error('Failed to load articles:', error);
    if (error.statusCode === 401) {
      navigateTo('/admin/login');
    }
  } finally {
    loading.value = false;
  }
};

const deleteArticle = async (id: string) => {
  if (confirm('Are you sure you want to delete this article?')) {
    try {
      await $fetch(`/api/articles/${id}`, { method: 'DELETE' });
      await loadArticles();
    } catch (error: any) {
      console.error('Failed to delete article:', error);
      if (error.statusCode === 401) {
        alert('Session expired. Please login again.');
        navigateTo('/admin/login');
      } else {
        alert('Failed to delete article');
      }
    }
  }
};

onMounted(() => {
  loadArticles();
});
</script>
