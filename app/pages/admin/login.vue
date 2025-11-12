<template>
  <div class="min-h-screen bg-gradient-to-br from-[#1d1d39] via-[#2d2d49] to-[#36364e] flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-2xl p-8">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#ecbc85] to-[#d4a574] rounded-full mb-4">
            <Icon name="fa-solid:user-shield" class="text-3xl text-white" />
          </div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Admin Panel</h1>
          <p class="text-gray-500">Sign in to manage your content</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="fa-solid:user" class="text-gray-400" />
              </div>
              <input
                v-model="form.username"
                type="text"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="fa-solid:lock" class="text-gray-400" />
              </div>
              <input
                v-model="form.password"
                type="password"
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <div v-if="error" class="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
            <div class="flex items-center">
              <Icon name="fa-solid:exclamation-circle" class="text-red-500 mr-2" />
              <p class="text-red-700 text-sm font-medium">{{ error }}</p>
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gradient-to-r from-[#ecbc85] to-[#d4a574] text-white font-semibold py-3 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!loading" class="flex items-center justify-center">
              <Icon name="fa-solid:sign-in-alt" class="mr-2" />
              Sign In
            </span>
            <span v-else class="flex items-center justify-center">
              <Icon name="fa-solid:spinner" class="mr-2 animate-spin" />
              Signing in...
            </span>
          </button>
        </form>

        <div class="mt-6 pt-6 border-t border-gray-200">
          <div class="bg-blue-50 rounded-lg p-3 text-center">
            <p class="text-xs text-gray-600 mb-1">Demo Credentials</p>
            <p class="text-sm font-mono text-gray-800">admin / admin123</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = ref({
  username: '',
  password: '',
});

const error = ref('');
const loading = ref(false);

const handleLogin = async () => {
  error.value = '';
  loading.value = true;

  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        username: form.value.username,
        password: form.value.password,
      },
    });

    if (response.success) {
      navigateTo('/admin/articles');
    }
  } catch (err: any) {
    error.value = err.data?.message || err.message || 'Invalid username or password';
  } finally {
    loading.value = false;
  }
};

// Check if already logged in
onMounted(async () => {
  try {
    const response: any = await $fetch('/api/auth/check');
    if (response.authenticated) {
      navigateTo('/admin/articles');
    }
  } catch (err) {
    // Not authenticated, stay on login page
  }
});
</script>
