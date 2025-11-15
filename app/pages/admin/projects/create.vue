<template>
  <AdminLayout>
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <div class="mb-6">
        <button
          @click="navigateTo('/admin/projects')"
          class="flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors"
        >
          <Icon name="fa-solid:arrow-left" class="mr-2" />
          Back to Projects
        </button>
      </div>

      <div class="mb-6 sm:mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">Create New Project</h1>
        <p class="text-sm sm:text-base text-gray-600">Fill in the details to create a new business project</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6 sm:space-y-8">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Project Title *</label>
            <input
              v-model="form.title"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
              placeholder="e.g., RAMADA EMERALD BAY"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
            <textarea
              v-model="form.description"
              required
              rows="5"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition resize-none"
              placeholder="Enter project description..."
            ></textarea>
            <p class="text-sm text-gray-500 mt-2">Use line breaks to separate paragraphs</p>
          </div>

          <ImageUpload
            v-model="form.image"
            label="Project Image *"
            placeholder="Enter image URL or upload an image"
            :required="true"
          />

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Link URL</label>
            <input
              v-model="form.link"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
              placeholder="e.g., /ramada or https://example.com"
            />
            <p class="text-sm text-gray-500 mt-2">Where the "View More" button should link to (default: /)</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Display Order</label>
              <input
                v-model.number="form.order"
                type="number"
                min="0"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
                placeholder="0"
              />
              <p class="text-sm text-gray-500 mt-2">Lower numbers appear first</p>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <div class="flex items-center h-12">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    v-model="form.active"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ecbc85]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ecbc85]"></div>
                  <span class="ml-3 text-sm font-medium text-gray-700">
                    {{ form.active ? 'Active (visible on website)' : 'Inactive (hidden)' }}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              @click="navigateTo('/admin/projects')"
              class="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="px-6 py-3 bg-gradient-to-r from-[#ecbc85] to-[#d4a574] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Icon v-if="saving" name="fa-solid:spinner" class="animate-spin" />
              <span>{{ saving ? 'Creating...' : 'Create Project' }}</span>
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
  title: '',
  description: '',
  image: '',
  link: '/',
  order: 0,
  active: true,
});

const saving = ref(false);

const handleSubmit = async () => {
  saving.value = true;
  try {
    await $fetch('/api/projects', {
      method: 'POST',
      body: form.value,
    });
    navigateTo('/admin/projects');
  } catch (error) {
    console.error('Failed to create project:', error);
    alert('Failed to create project');
  } finally {
    saving.value = false;
  }
};
</script>
