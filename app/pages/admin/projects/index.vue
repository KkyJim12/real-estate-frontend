<template>
  <AdminLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Projects</h1>
          <p class="text-gray-600 mt-1">Manage your business projects</p>
        </div>
        <NuxtLink
          to="/admin/projects/create"
          class="bg-[#ecbc85] text-white px-6 py-3 rounded-lg hover:bg-[#d4a574] transition-colors flex items-center space-x-2"
        >
          <Icon name="fa-solid:plus" />
          <span>Create Project</span>
        </NuxtLink>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <Icon name="fa-solid:spinner" class="text-4xl text-gray-400 animate-spin mb-4" />
        <p class="text-gray-500">Loading projects...</p>
      </div>

      <!-- Projects List -->
      <div v-else-if="projects.length > 0" class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Updated
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="project in projects" :key="project.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="flex items-center space-x-4">
                  <img
                    v-if="project.image"
                    :src="project.image"
                    :alt="project.title"
                    class="w-16 h-16 object-cover rounded"
                  />
                  <div v-else class="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                    <Icon name="fa-solid:image" class="text-gray-400 text-2xl" />
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ project.title }}</div>
                    <div class="text-sm text-gray-500 line-clamp-1">{{ project.description }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm text-gray-900">{{ project.order }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    project.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  ]"
                >
                  {{ project.active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(project.updatedAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                <NuxtLink
                  :to="`/admin/projects/edit/${project.id}`"
                  class="text-[#ecbc85] hover:text-[#d4a574]"
                >
                  <Icon name="fa-solid:edit" class="text-lg" />
                </NuxtLink>
                <button
                  @click="confirmDelete(project)"
                  class="text-red-600 hover:text-red-900"
                >
                  <Icon name="fa-solid:trash" class="text-lg" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-lg shadow p-12 text-center">
        <Icon name="fa-solid:folder-open" class="text-6xl text-gray-300 mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
        <p class="text-gray-500 mb-6">Get started by creating your first project.</p>
        <NuxtLink
          to="/admin/projects/create"
          class="inline-flex items-center space-x-2 bg-[#ecbc85] text-white px-6 py-3 rounded-lg hover:bg-[#d4a574] transition-colors"
        >
          <Icon name="fa-solid:plus" />
          <span>Create Project</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <UModal v-model="showDeleteModal">
      <div class="p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Delete Project</h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete "{{ projectToDelete?.title }}"? This action cannot be undone.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="deleteProject"
            :disabled="deleting"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            <span v-if="!deleting">Delete</span>
            <span v-else class="flex items-center space-x-2">
              <Icon name="fa-solid:spinner" class="animate-spin" />
              <span>Deleting...</span>
            </span>
          </button>
        </div>
      </div>
    </UModal>
  </AdminLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

const projects = ref<any[]>([]);
const loading = ref(true);
const showDeleteModal = ref(false);
const projectToDelete = ref<any>(null);
const deleting = ref(false);

const loadProjects = async () => {
  loading.value = true;
  try {
    const data: any = await $fetch('/api/projects');
    projects.value = data.sort((a: any, b: any) => a.order - b.order);
  } catch (error) {
    console.error('Failed to load projects:', error);
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const confirmDelete = (project: any) => {
  projectToDelete.value = project;
  showDeleteModal.value = true;
};

const deleteProject = async () => {
  if (!projectToDelete.value) return;

  deleting.value = true;
  try {
    await $fetch(`/api/projects/${projectToDelete.value.id}`, {
      method: 'DELETE',
    });
    projects.value = projects.value.filter((p) => p.id !== projectToDelete.value.id);
    showDeleteModal.value = false;
    projectToDelete.value = null;
  } catch (error) {
    console.error('Failed to delete project:', error);
    alert('Failed to delete project');
  } finally {
    deleting.value = false;
  }
};

onMounted(() => {
  loadProjects();
});
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
