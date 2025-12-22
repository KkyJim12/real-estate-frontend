<template>
  <div class="max-w-4xl mx-auto p-8">
    <h1 class="text-3xl font-bold mb-8">Multi-Language API Test</h1>
    
    <div class="space-y-8">
      <!-- Test Projects API -->
      <div class="bg-white p-6 rounded-lg border">
        <h2 class="text-xl font-semibold mb-4">Projects API Test</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Language:</label>
            <select v-model="selectedLang" class="border rounded px-3 py-2">
              <option value="en">English</option>
              <option value="th">Thai</option>
              <option value="zh">Chinese</option>
            </select>
          </div>
          <button 
            @click="testProjectsAPI" 
            :disabled="loading"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {{ loading ? 'Loading...' : 'Test Projects API' }}
          </button>
          <div v-if="projectsResult" class="mt-4 p-4 bg-gray-100 rounded">
            <h3 class="font-medium mb-2">Projects Result:</h3>
            <pre class="text-sm overflow-auto">{{ JSON.stringify(projectsResult, null, 2) }}</pre>
          </div>
        </div>
      </div>

      <!-- Test Articles API -->
      <div class="bg-white p-6 rounded-lg border">
        <h2 class="text-xl font-semibold mb-4">Articles API Test</h2>
        <button 
          @click="testArticlesAPI" 
          :disabled="loading"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {{ loading ? 'Loading...' : 'Test Articles API' }}
        </button>
        <div v-if="articlesResult" class="mt-4 p-4 bg-gray-100 rounded">
          <h3 class="font-medium mb-2">Articles Result:</h3>
          <pre class="text-sm overflow-auto">{{ JSON.stringify(articlesResult, null, 2) }}</pre>
        </div>
      </div>

      <!-- Test Carousel API -->
      <div class="bg-white p-6 rounded-lg border">
        <h2 class="text-xl font-semibold mb-4">Carousel API Test</h2>
        <button 
          @click="testCarouselAPI" 
          :disabled="loading"
          class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
        >
          {{ loading ? 'Loading...' : 'Test Carousel API' }}
        </button>
        <div v-if="carouselResult" class="mt-4 p-4 bg-gray-100 rounded">
          <h3 class="font-medium mb-2">Carousel Result:</h3>
          <pre class="text-sm overflow-auto">{{ JSON.stringify(carouselResult, null, 2) }}</pre>
        </div>
      </div>

      <!-- Error Display -->
      <div v-if="error" class="bg-red-50 border border-red-200 p-4 rounded">
        <h3 class="font-medium text-red-800 mb-2">Error:</h3>
        <p class="text-red-700">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const selectedLang = ref('en');
const loading = ref(false);
const error = ref('');
const projectsResult = ref(null);
const articlesResult = ref(null);
const carouselResult = ref(null);

const testProjectsAPI = async () => {
  loading.value = true;
  error.value = '';
  try {
    const result = await $fetch('/api/projects', {
      query: { lang: selectedLang.value }
    });
    projectsResult.value = result;
  } catch (err: any) {
    error.value = `Projects API Error: ${err.message || err}`;
  } finally {
    loading.value = false;
  }
};

const testArticlesAPI = async () => {
  loading.value = true;
  error.value = '';
  try {
    const result = await $fetch('/api/articles', {
      query: { lang: selectedLang.value }
    });
    articlesResult.value = result;
  } catch (err: any) {
    error.value = `Articles API Error: ${err.message || err}`;
  } finally {
    loading.value = false;
  }
};

const testCarouselAPI = async () => {
  loading.value = true;
  error.value = '';
  try {
    const result = await $fetch('/api/carousel', {
      query: { lang: selectedLang.value }
    });
    carouselResult.value = result;
  } catch (err: any) {
    error.value = `Carousel API Error: ${err.message || err}`;
  } finally {
    loading.value = false;
  }
};
</script>