<template>
  <div>
    <label class="block text-sm font-semibold text-gray-700 mb-2">{{ label }}</label>
    
    <div class="space-y-4">
      <!-- URL Input -->
      <div class="flex gap-2">
        <input
          v-model="imageUrl"
          type="url"
          class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
          :placeholder="placeholder"
          @input="handleUrlChange"
        />
        <button
          type="button"
          @click="triggerFileInput"
          class="px-6 py-3 bg-gradient-to-r from-[#ecbc85] to-[#d4a574] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
          :disabled="uploading"
        >
          <Icon v-if="!uploading" name="fa-solid:upload" class="mr-2" />
          <Icon v-else name="fa-solid:spinner" class="mr-2 animate-spin" />
          {{ uploading ? 'Uploading...' : 'Upload' }}
        </button>
      </div>

      <!-- Hidden File Input -->
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleFileChange"
      />

      <!-- Upload Progress -->
      <div v-if="uploading" class="flex items-center gap-2 text-sm text-gray-600">
        <Icon name="fa-solid:spinner" class="animate-spin" />
        <span>Uploading image...</span>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
        <div class="flex items-center">
          <Icon name="fa-solid:exclamation-circle" class="text-red-500 mr-2" />
          <p class="text-red-700 text-sm">{{ error }}</p>
        </div>
      </div>

      <!-- Image Preview -->
      <div v-if="imageUrl" class="mt-4">
        <p class="text-sm text-gray-600 mb-2">Image Preview:</p>
        <div class="relative">
          <img
            :src="imageUrl"
            alt="Preview"
            class="w-full h-80 object-cover rounded-lg border border-gray-200"
            @error="handleImageError"
          />
          <button
            type="button"
            @click="clearImage"
            class="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            title="Remove image"
          >
            <Icon name="fa-solid:times" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  label?: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const imageUrl = ref(props.modelValue);
const fileInput = ref<HTMLInputElement | null>(null);
const uploading = ref(false);
const error = ref('');

watch(() => props.modelValue, (newValue) => {
  imageUrl.value = newValue;
});

const handleUrlChange = () => {
  error.value = '';
  emit('update:modelValue', imageUrl.value);
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  // Validate file type
  if (!file.type.startsWith('image/')) {
    error.value = 'Please select an image file';
    return;
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    error.value = 'Image size must be less than 5MB';
    return;
  }

  uploading.value = true;
  error.value = '';

  try {
    const formData = new FormData();
    formData.append('file', file);

    const response: any = await $fetch('/api/upload/image', {
      method: 'POST',
      body: formData,
    });

    if (response.success && response.url) {
      imageUrl.value = response.url;
      emit('update:modelValue', response.url);
    }
  } catch (err: any) {
    console.error('Upload failed:', err);
    error.value = err.data?.message || err.message || 'Failed to upload image';
  } finally {
    uploading.value = false;
    // Reset file input
    if (fileInput.value) {
      fileInput.value.value = '';
    }
  }
};

const handleImageError = () => {
  error.value = 'Failed to load image. Please check the URL.';
};

const clearImage = () => {
  imageUrl.value = '';
  emit('update:modelValue', '');
  error.value = '';
};
</script>
