<template>
  <AdminLayout>
    <div class="max-w-7xl mx-auto px-6 py-8">
      <div class="mb-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-800 mb-2">Carousel Management</h1>
            <p class="text-gray-600">Manage homepage carousel slides</p>
          </div>
          <button
            @click="navigateTo('/admin/carousel/create')"
            class="flex items-center px-6 py-3 bg-gradient-to-r from-[#ecbc85] to-[#d4a574] text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <Icon name="fa-solid:plus" class="mr-2" />
            Add Slide
          </button>
        </div>
      </div>

      <div v-if="loading" class="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
        <Icon name="fa-solid:spinner" class="text-4xl text-gray-400 animate-spin mb-4" />
        <p class="text-gray-500">Loading slides...</p>
      </div>

      <div v-else-if="slides.length === 0" class="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
          <Icon name="fa-solid:images" class="text-4xl text-gray-400" />
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">No slides yet</h3>
        <p class="text-gray-500 mb-6">Create your first carousel slide</p>
        <button
          @click="navigateTo('/admin/carousel/create')"
          class="inline-flex items-center px-6 py-3 bg-[#ecbc85] text-white font-semibold rounded-lg hover:bg-[#d4a574] transition-colors"
        >
          <Icon name="fa-solid:plus" class="mr-2" />
          Add First Slide
        </button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="slide in sortedSlides"
          :key="slide.id"
          class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
        >
          <div class="relative">
            <img
              :src="slide.image"
              :alt="slide.title"
              class="w-full h-48 object-cover"
            />
            <div
              v-if="!slide.active"
              class="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full"
            >
              Inactive
            </div>
            <div class="absolute top-2 left-2 px-3 py-1 bg-black/50 text-white text-xs font-semibold rounded-full">
              Order: {{ slide.order }}
            </div>
          </div>
          <div class="p-4">
            <h3 class="text-lg font-bold text-gray-800 mb-2">{{ slide.title || 'Untitled' }}</h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ slide.description || 'No description' }}</p>
            <div class="flex gap-2">
              <button
                @click="navigateTo(`/admin/carousel/edit/${slide.id}`)"
                class="flex-1 flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Icon name="fa-solid:edit" class="mr-2" />
                Edit
              </button>
              <button
                @click="deleteSlide(slide.id)"
                class="flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors"
              >
                <Icon name="fa-solid:trash" />
              </button>
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

const slides = ref<any[]>([]);
const loading = ref(false);

const sortedSlides = computed(() => {
  return [...slides.value].sort((a, b) => a.order - b.order);
});

const loadSlides = async () => {
  loading.value = true;
  try {
    const data: any = await $fetch('/api/carousel');
    slides.value = data;
  } catch (error: any) {
    console.error('Failed to load slides:', error);
    if (error.statusCode === 401) {
      navigateTo('/admin/login');
    }
  } finally {
    loading.value = false;
  }
};

const deleteSlide = async (id: string) => {
  if (confirm('Are you sure you want to delete this slide?')) {
    try {
      await $fetch(`/api/carousel/${id}`, { method: 'DELETE' });
      await loadSlides();
    } catch (error: any) {
      console.error('Failed to delete slide:', error);
      if (error.statusCode === 401) {
        alert('Session expired. Please login again.');
        navigateTo('/admin/login');
      } else {
        alert('Failed to delete slide');
      }
    }
  }
};

onMounted(() => {
  loadSlides();
});
</script>
