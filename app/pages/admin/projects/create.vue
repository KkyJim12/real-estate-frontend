<template>
  <AdminLayout>
    <div class="p-6 max-w-4xl">
      <!-- Header -->
      <div class="mb-6">
        <NuxtLink
          to="/admin/projects"
          class="text-gray-600 hover:text-gray-900 flex items-center space-x-2 mb-4"
        >
          <Icon name="fa-solid:arrow-left" />
          <span>Back to Projects</span>
        </NuxtLink>
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Create Project</h1>
        <p class="text-gray-600 mt-1">Add a new business project</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow p-6 space-y-6">
        <!-- Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Project Title *
          </label>
          <input
            v-model="form.title"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent"
            placeholder="e.g., RAMADA EMERALD BAY"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            v-model="form.description"
            required
            rows="4"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent"
            placeholder="Enter project description..."
          ></textarea>
        </div>

        <!-- Image Upload -->
        <ImageUpload
          v-model="form.image"
          label="Project Image"
          :required="true"
        />

        <!-- Link -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Link URL
          </label>
          <input
            v-model="form.link"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent"
            placeholder="e.g., /ramada or https://example.com"
          />
          <p class="text-sm text-gray-500 mt-1">
            Leave empty to use default link (/)
          </p>
        </div>

        <!-- Order -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Display Order
          </label>
          <input
            v-model.number="form.order"
            type="number"
            min="0"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent"
            placeholder="0"
          />
          <p class="text-sm text-gray-500 mt-1">
            Lower numbers appear first
          </p>
        </div>

        <!-- Active Status -->
        <div class="flex items-center space-x-3">
          <input
            v-model="form.active"
            type="checkbox"
            id="active"
            class="w-4 h-4 text-[#ecbc85] border-gray-300 rounded focus:ring-[#ecbc85]"
          />
          <label for="active" class="text-sm font-medium text-gray-700">
            Active (visible on website)
          </label>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
          <NuxtLink
            to="/admin/projects"
            class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-center"
          >
            Cancel
          </NuxtLink>
          <button
            type="submit"
            :disabled="saving"
            class="px-6 py-2 bg-[#ecbc85] text-white rounded-lg hover:bg-[#d4a574] disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <Icon v-if="saving" name="fa-solid:spinner" class="animate-spin" />
            <span>{{ saving ? 'Creating...' : 'Create Project' }}</span>
          </button>
        </div>
      </form>
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
