<template>
  <AdminLayout>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ $t('admin.settings.title') }}</h1>
        <p class="text-gray-600">{{ $t('admin.settings.subtitle') }}</p>
      </div>

      <!-- Database Migration Section -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div class="flex items-center mb-4">
          <div class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mr-3">
            <Icon name="fa-solid:database" class="text-blue-600" />
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-900">{{ $t('admin.settings.databaseMigration') }}</h2>
            <p class="text-sm text-gray-600">{{ $t('admin.settings.migrationDescription') }}</p>
          </div>
        </div>

        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div class="flex items-start">
            <Icon name="fa-solid:info-circle" class="text-blue-500 mt-0.5 mr-2" />
            <div class="text-sm text-blue-800">
              <p class="font-medium mb-1">{{ $t('admin.settings.migrationInfo') }}</p>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-700">Articles</span>
                <Icon name="fa-solid:newspaper" class="text-gray-400" />
              </div>
              <p class="text-2xl font-bold text-gray-900">{{ migrationStatus.articles?.itemCount || 0 }}</p>
              <p class="text-xs text-gray-500">items to migrate</p>
            </div>
            
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-700">Carousel</span>
                <Icon name="fa-solid:images" class="text-gray-400" />
              </div>
              <p class="text-2xl font-bold text-gray-900">{{ migrationStatus.carousel?.itemCount || 0 }}</p>
              <p class="text-xs text-gray-500">items to migrate</p>
            </div>
            
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-700">Projects</span>
                <Icon name="fa-solid:building" class="text-gray-400" />
              </div>
              <p class="text-2xl font-bold text-gray-900">{{ migrationStatus.projects?.itemCount || 0 }}</p>
              <p class="text-xs text-gray-500">items to migrate</p>
            </div>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <p class="text-sm font-medium text-gray-900">Environment</p>
              <p class="text-sm text-gray-600">
                {{ isProduction ? 'Production (Vercel)' : 'Development (Local)' }}
              </p>
            </div>
            
            <button
              @click="startMigration"
              :disabled="migrating || !isProduction"
              class="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Icon 
                :name="migrating ? 'fa-solid:spinner' : 'fa-solid:play'" 
                :class="{ 'animate-spin': migrating }" 
                class="mr-2" 
              />
              {{ migrating ? 'Migrating...' : 'Start Migration' }}
            </button>
          </div>
        </div>

        <!-- Migration Results -->
        <div v-if="migrationResults.length > 0" class="mt-6 pt-6 border-t border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Migration Results</h3>
          <div class="space-y-3">
            <div 
              v-for="result in migrationResults" 
              :key="result.collection"
              class="flex items-center justify-between p-3 rounded-lg"
              :class="{
                'bg-green-50 border border-green-200': result.status === 'success',
                'bg-red-50 border border-red-200': result.status === 'error',
                'bg-yellow-50 border border-yellow-200': result.status === 'skipped'
              }"
            >
              <div class="flex items-center">
                <Icon 
                  :name="getStatusIcon(result.status)" 
                  :class="{
                    'text-green-600': result.status === 'success',
                    'text-red-600': result.status === 'error',
                    'text-yellow-600': result.status === 'skipped'
                  }"
                  class="mr-3" 
                />
                <div>
                  <p class="font-medium text-gray-900 capitalize">{{ result.collection }}</p>
                  <p class="text-sm text-gray-600">{{ result.message }}</p>
                </div>
              </div>
              <div v-if="result.itemCount" class="text-sm font-medium text-gray-700">
                {{ result.itemCount }} items
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- System Information -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center mb-4">
          <div class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg mr-3">
            <Icon name="fa-solid:info-circle" class="text-gray-600" />
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-900">System Information</h2>
            <p class="text-sm text-gray-600">Current system status and configuration</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-sm font-medium text-gray-700 mb-2">Environment</h3>
            <p class="text-sm text-gray-900">{{ isProduction ? 'Production' : 'Development' }}</p>
          </div>
          
          <div>
            <h3 class="text-sm font-medium text-gray-700 mb-2">Database</h3>
            <p class="text-sm text-gray-900">{{ isProduction ? 'Vercel KV' : 'JSON Files' }}</p>
          </div>
          
          <div>
            <h3 class="text-sm font-medium text-gray-700 mb-2">Node Environment</h3>
            <p class="text-sm text-gray-900">{{ nodeEnv }}</p>
          </div>
          
          <div>
            <h3 class="text-sm font-medium text-gray-700 mb-2">Platform</h3>
            <p class="text-sm text-gray-900">{{ isVercel ? 'Vercel' : 'Local' }}</p>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
interface MigrationResult {
  collection: string;
  status: 'success' | 'error' | 'skipped';
  message: string;
  itemCount?: number;
}

interface MigrationStatus {
  articles?: { itemCount: number };
  carousel?: { itemCount: number };
  projects?: { itemCount: number };
}

const migrating = ref(false);
const migrationResults = ref<MigrationResult[]>([]);
const migrationStatus = ref<MigrationStatus>({});

// Get runtime config for environment detection
const config = useRuntimeConfig();
const isProduction = ref(false);
const nodeEnv = ref('development');
const isVercel = ref(false);

// Check environment on client side
onMounted(() => {
  // Use a simple check that works in both client and server
  isProduction.value = window.location.hostname !== 'localhost' && !window.location.hostname.includes('127.0.0.1');
  nodeEnv.value = isProduction.value ? 'production' : 'development';
  isVercel.value = window.location.hostname.includes('vercel.app');
});

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'success':
      return 'fa-solid:check-circle';
    case 'error':
      return 'fa-solid:times-circle';
    case 'skipped':
      return 'fa-solid:exclamation-triangle';
    default:
      return 'fa-solid:question-circle';
  }
};

const loadMigrationStatus = async () => {
  try {
    // Load current data counts for display
    const [articles, carousel, projects] = await Promise.all([
      $fetch('/api/public/articles').catch(() => []),
      $fetch('/api/public/carousel').catch(() => []),
      $fetch('/api/public/projects').catch(() => [])
    ]);

    migrationStatus.value = {
      articles: { itemCount: Array.isArray(articles) ? articles.length : 0 },
      carousel: { itemCount: Array.isArray(carousel) ? carousel.length : 0 },
      projects: { itemCount: Array.isArray(projects) ? projects.length : 0 }
    };
  } catch (error) {
    console.error('Failed to load migration status:', error);
    // Set default values on error
    migrationStatus.value = {
      articles: { itemCount: 0 },
      carousel: { itemCount: 0 },
      projects: { itemCount: 0 }
    };
  }
};

const startMigration = async () => {
  if (!isProduction.value) {
    alert('Migration is only available in production environment');
    return;
  }

  if (!confirm('Are you sure you want to start the migration? This will overwrite existing data in Vercel KV.')) {
    return;
  }

  migrating.value = true;
  migrationResults.value = [];

  try {
    const response = await $fetch('/api/admin/migrate', {
      method: 'POST'
    });

    migrationResults.value = response.results;
    
    if (response.success) {
      // Refresh the status after successful migration
      await loadMigrationStatus();
    }

  } catch (error: any) {
    console.error('Migration failed:', error);
    alert(`Migration failed: ${error.data?.message || error.message || 'Unknown error'}`);
  } finally {
    migrating.value = false;
  }
};

// Load initial status
onMounted(async () => {
  await loadMigrationStatus();
});
</script>