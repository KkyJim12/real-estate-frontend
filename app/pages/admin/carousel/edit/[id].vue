<template>
  <AdminLayout>
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <div class="mb-6">
        <button
          @click="navigateTo('/admin/carousel')"
          class="flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors"
        >
          <Icon name="fa-solid:arrow-left" class="mr-2" />
          Back to Carousel
        </button>
      </div>

      <div class="mb-6 sm:mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">Edit Slide</h1>
        <p class="text-sm sm:text-base text-gray-600">Update carousel slide details</p>
      </div>

      <div v-if="loading" class="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
        <Icon name="fa-solid:spinner" class="text-4xl text-gray-400 animate-spin mb-4" />
        <p class="text-gray-500">Loading slide...</p>
      </div>

      <div v-else-if="form.image" class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
        <form @submit.prevent="updateSlide" class="space-y-5 sm:space-y-6">
          <ImageUpload
            v-model="form.image"
            label="Slide Image"
            placeholder="Enter image URL or upload an image"
          />

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Title (Optional)</label>
            <input
              v-model="form.title"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
              placeholder="Enter slide title..."
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Description (Optional)</label>
            <textarea
              v-model="form.description"
              rows="3"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
              placeholder="Enter slide description..."
            ></textarea>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Display Order</label>
              <input
                v-model.number="form.order"
                type="number"
                min="0"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
                placeholder="0"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <select
                v-model="form.active"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
              >
                <option :value="true">Active</option>
                <option :value="false">Inactive</option>
              </select>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              :disabled="saving || loading"
              class="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#ecbc85] to-[#d4a574] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon v-if="!saving" name="fa-solid:save" class="mr-2" />
              <Icon v-else name="fa-solid:spinner" class="mr-2 animate-spin" />
              {{ saving ? 'Updating...' : 'Update Slide' }}
            </button>
            <button
              type="button"
              @click="navigateTo('/admin/carousel')"
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

const route = useRoute();
const slideId = route.params.id as string;

const form = ref({
  image: '',
  title: '',
  description: '',
  order: 0,
  active: true,
});

const loading = ref(true);
const saving = ref(false);

const loadSlide = async () => {
  loading.value = true;
  try {
    const slide: any = await $fetch(`/api/carousel/${slideId}`);
    form.value = {
      image: slide.image,
      title: slide.title,
      description: slide.description,
      order: slide.order,
      active: slide.active,
    };
  } catch (error: any) {
    console.error('Failed to load slide:', error);
    if (error.statusCode === 401) {
      alert('Session expired. Please login again.');
      navigateTo('/admin/login');
    } else {
      alert('Slide not found');
      navigateTo('/admin/carousel');
    }
  } finally {
    loading.value = false;
  }
};

const updateSlide = async () => {
  if (!form.value.image) {
    alert('Please enter an image URL');
    return;
  }

  saving.value = true;
  try {
    await $fetch(`/api/carousel/${slideId}`, {
      method: 'PUT',
      body: form.value,
    });
    navigateTo('/admin/carousel');
  } catch (error: any) {
    console.error('Failed to update slide:', error);
    if (error.statusCode === 401) {
      alert('Session expired. Please login again.');
      navigateTo('/admin/login');
    } else {
      alert('Failed to update slide');
    }
  } finally {
    saving.value = false;
  }
};

onMounted(() => {
  loadSlide();
});
</script>
