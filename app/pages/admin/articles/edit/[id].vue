<template>
  <AdminLayout>
    <div class="max-w-5xl mx-auto px-6 py-8">
      <div class="mb-6">
        <button
          @click="navigateTo('/admin/articles')"
          class="flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors"
        >
          <Icon name="fa-solid:arrow-left" class="mr-2" />
          Back to Articles
        </button>
      </div>

      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Edit Article</h1>
        <p class="text-gray-600">Update your article details</p>
      </div>

      <div v-if="loading" class="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
        <Icon name="fa-solid:spinner" class="text-4xl text-gray-400 animate-spin mb-4" />
        <p class="text-gray-500">Loading article...</p>
      </div>

      <div v-else-if="form.title" class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <form @submit.prevent="updateArticle" class="space-y-8">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Article Title</label>
            <input
              v-model="form.title"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
              placeholder="Enter a compelling title..."
              required
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Featured Image URL</label>
            <input
              v-model="form.image"
              type="url"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
              placeholder="https://example.com/image.jpg"
            />
            <div v-if="form.image" class="mt-4">
              <p class="text-sm text-gray-600 mb-2">Image Preview:</p>
              <img
                :src="form.image"
                alt="Preview"
                class="w-full h-80 object-cover rounded-lg border border-gray-200"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Article Content</label>
            <ContentEditor v-model="form.content" />
          </div>

          <div class="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              :disabled="saving || loading"
              class="flex items-center px-6 py-3 bg-gradient-to-r from-[#ecbc85] to-[#d4a574] text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon v-if="!saving" name="fa-solid:save" class="mr-2" />
              <Icon v-else name="fa-solid:spinner" class="mr-2 animate-spin" />
              {{ saving ? 'Updating...' : 'Update Article' }}
            </button>
            <button
              type="button"
              @click="navigateTo('/admin/articles')"
              :disabled="saving"
              class="flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

const route = useRoute();
const articleId = route.params.id as string;

const form = ref({
  title: '',
  image: '',
  content: '',
});

const loading = ref(true);
const saving = ref(false);

const loadArticle = async () => {
  loading.value = true;
  try {
    const article: any = await $fetch(`/api/articles/${articleId}`);
    form.value = {
      title: article.title,
      image: article.image,
      content: article.content,
    };
  } catch (error: any) {
    console.error('Failed to load article:', error);
    if (error.statusCode === 401) {
      alert('Session expired. Please login again.');
      navigateTo('/admin/login');
    } else {
      alert('Article not found');
      navigateTo('/admin/articles');
    }
  } finally {
    loading.value = false;
  }
};

const updateArticle = async () => {
  if (!form.value.title) {
    alert('Please enter a title');
    return;
  }

  saving.value = true;
  try {
    await $fetch(`/api/articles/${articleId}`, {
      method: 'PUT',
      body: form.value,
    });
    navigateTo('/admin/articles');
  } catch (error: any) {
    console.error('Failed to update article:', error);
    if (error.statusCode === 401) {
      alert('Session expired. Please login again.');
      navigateTo('/admin/login');
    } else {
      alert('Failed to update article');
    }
  } finally {
    saving.value = false;
  }
};

onMounted(() => {
  loadArticle();
});
</script>
