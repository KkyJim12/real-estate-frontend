<template>
  <AdminLayout>
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <div class="mb-6">
        <button
          @click="navigateTo('/admin/articles')"
          class="flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors"
        >
          <Icon name="fa-solid:arrow-left" class="mr-2" />
          Back to Articles
        </button>
      </div>

      <div class="mb-6 sm:mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">Create New Article</h1>
        <p class="text-sm sm:text-base text-gray-600">Fill in the details to create a new article</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
        <form @submit.prevent="saveArticle" class="space-y-6 sm:space-y-8">
          <div>
            <MultiLanguageInput
              v-model="form.title"
              label="Article Title"
              placeholder="Enter a compelling title..."
              required
            />
          </div>

          <ImageUpload
            v-model="form.image"
            label="Featured Image"
            placeholder="Enter image URL or upload an image"
          />

          <div>
            <MultiLanguageEditor
              v-model="form.content"
              label="Article Content"
              placeholder="Write your article content..."
              required
            />
          </div>

          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              :disabled="saving"
              class="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#ecbc85] to-[#d4a574] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon v-if="!saving" name="fa-solid:save" class="mr-2" />
              <Icon v-else name="fa-solid:spinner" class="mr-2 animate-spin" />
              {{ saving ? 'Saving...' : 'Save Article' }}
            </button>
            <button
              type="button"
              @click="navigateTo('/admin/articles')"
              :disabled="saving"
              class="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
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

const form = ref({
  title: { en: '', th: '', zh: '' },
  image: '',
  content: { en: '', th: '', zh: '' },
});

const saving = ref(false);

const saveArticle = async () => {
  // Validate that at least one language has content
  const hasTitle = form.value.title.en || form.value.title.th || form.value.title.zh;
  const hasContent = form.value.content.en || form.value.content.th || form.value.content.zh;
  
  if (!hasTitle) {
    alert('Please enter a title in at least one language');
    return;
  }
  
  if (!hasContent) {
    alert('Please enter content in at least one language');
    return;
  }

  saving.value = true;
  try {
    console.log('Saving article:', form.value);
    const result = await $fetch('/api/articles', {
      method: 'POST',
      body: form.value,
    });
    console.log('Article saved:', result);
    navigateTo('/admin/articles');
  } catch (error: any) {
    console.error('Failed to save article:', error);
    if (error.statusCode === 401) {
      alert('Session expired. Please login again.');
      navigateTo('/admin/login');
    } else {
      alert(`Failed to save article: ${error.data?.message || error.message || error.statusMessage || 'Unknown error'}`);
    }
  } finally {
    saving.value = false;
  }
};
</script>
