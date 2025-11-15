<template>
  <AdminLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <div class="mb-6 sm:mb-8">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">Projects</h1>
            <p class="text-sm sm:text-base text-gray-600">Manage your business projects</p>
          </div>
          <button
            @click="navigateTo('/admin/projects/create')"
            class="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#ecbc85] to-[#d4a574] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 whitespace-nowrap"
          >
            <Icon name="fa-solid:plus" class="mr-2" />
            Create Project
          </button>
        </div>
      </div>

      <div v-if="loading" class="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
        <Icon name="fa-solid:spinner" class="text-4xl text-gray-400 animate-spin mb-4" />
        <p class="text-gray-500">Loading projects...</p>
      </div>

      <div v-else-if="projects.length === 0" class="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
          <Icon name="fa-solid:building" class="text-4xl text-gray-400" />
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">No projects yet</h3>
        <p class="text-gray-500 mb-6">Get started by creating your first project</p>
        <button
          @click="navigateTo('/admin/projects/create')"
          class="inline-flex items-center px-6 py-3 bg-[#ecbc85] text-white font-semibold rounded-lg hover:bg-[#d4a574] transition-colors"
        >
          <Icon name="fa-solid:plus" class="mr-2" />
          Create First Project
        </button>
      </div>

      <div v-else class="grid grid-cols-1 gap-4 sm:gap-6">
        <div
          v-for="project in projects"
          :key="project.id"
          class="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
        >
          <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6">
            <div class="flex-shrink-0">
              <img
                v-if="project.image"
                :src="project.image"
                :alt="project.title"
                class="w-full sm:w-32 h-32 object-cover rounded-lg"
              />
              <div v-else class="w-full sm:w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <Icon name="fa-solid:building" class="text-4xl text-gray-300" />
              </div>
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg font-semibold text-gray-900 mb-1 truncate">{{ project.title }}</h3>
                  <p class="text-sm text-gray-600 line-clamp-2">{{ project.description }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <span
                    :class="[
                      'px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap',
                      project.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    ]"
                  >
                    {{ project.active ? 'Active' : 'Inactive' }}
                  </span>
                </div>
              </div>

              <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                <div class="flex items-center gap-1">
                  <Icon name="fa-solid:sort" class="text-xs" />
                  <span>Order: {{ project.order }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <Icon name="fa-solid:calendar" class="text-xs" />
                  <span>{{ formatDate(project.updatedAt) }}</span>
                </div>
                <div v-if="project.link" class="flex items-center gap-1">
                  <Icon name="fa-solid:link" class="text-xs" />
                  <span class="truncate max-w-xs">{{ project.link }}</span>
                </div>
              </div>

              <div class="flex flex-wrap gap-2">
                <button
                  @click="navigateTo(`/admin/projects/edit/${project.id}`)"
                  class="flex items-center gap-2 px-4 py-2 bg-[#ecbc85] text-white text-sm font-medium rounded-lg hover:bg-[#d4a574] transition-colors"
                >
                  <Icon name="fa-solid:edit" />
                  <span>Edit</span>
                </button>
                <button
                  @click="confirmDelete(project)"
                  class="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Icon name="fa-solid:trash" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <UModal v-model="showDeleteModal">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Delete Project</h3>
            <button
              @click="showDeleteModal = false"
              class="text-gray-400 hover:text-gray-600"
            >
              <Icon name="fa-solid:times" class="text-xl" />
            </button>
          </div>
        </template>

        <div class="py-4">
          <p class="text-gray-600">
            Are you sure you want to delete "<strong>{{ projectToDelete?.title }}</strong>"? This action cannot be undone.
          </p>
        </div>

        <template #footer>
          <div class="flex justify-end gap-3">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="deleteProject"
              :disabled="deleting"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              <Icon v-if="deleting" name="fa-solid:spinner" class="animate-spin" />
              <span>{{ deleting ? 'Deleting...' : 'Delete' }}</span>
            </button>
          </div>
        </template>
      </UCard>
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
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
