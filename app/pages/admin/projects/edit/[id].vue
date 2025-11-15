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
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Edit Project</h1>
        <p class="text-gray-600 mt-1">Update project information</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="bg-white rounded-lg shadow p-12 text-center">
        <Icon name="fa-solid:spinner" class="text-4xl text-gray-400 animate-spin mb-4" />
        <p class="text-gray-500">Loading project...</p>
      </div>

      <!-- Form -->
      <form v-else-if="form" @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow p-6 space-y-6">
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
          />
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
          />
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
            <span>{{ saving ? 'Saving...' : 'Save Changes' }}</span>
          </button>
        </div>
      </form>

      <!-- Error State -->
      <div v-else class="bg-white rounded-lg shadow p-12 text-center">
        <Icon name="fa-solid:exclamation-circle" class="text-6xl text-red-400 mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">Project not found</h3>
        <NuxtLink
          to="/admin/projects"
          class="text-[#ecbc85] hover:text-[#d4a574]"
        >
          Back to Projects
        </NuxtLink>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

const route = useRoute();
const form = ref<any>(null);
const loading = ref(true);
const saving = ref(false);

const loadProject = async () => {
  loading.value = true;
  try {
    const data: any = await $fetch(`/api/projects/${route.params.id}`);
    form.value = { ...data };
  } catch (error) {
    console.error('Failed to load project:', error);
    form.value = null;
  } finally {
    loading.value = false;
  }
};

const handleSubmit = async () => {
  saving.value = true;
  try {
    await $fetch(`/api/projects/${route.params.id}`, {
      method: 'PUT',
      body: form.value,
    });
    navigateTo('/admin/projects');
  } catch (error) {
    console.error('Failed to update project:', error);
    alert('Failed to update project');
  } finally {
    saving.value = false;
  }
};

onMounted(() => {
  loadProject();
});
</script>
