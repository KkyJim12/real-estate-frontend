<template>
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">{{ label }}</label>
      <input
        type="file"
        @change="handleFileUpload"
        multiple
        accept="image/*"
        :disabled="uploading"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <p v-if="description" class="text-sm text-gray-500 mt-1">{{ description }}</p>
      <p class="text-sm text-gray-500 mt-1">{{ images.length }}/{{ maxFiles }} images uploaded</p>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
      <div class="flex items-center">
        <Icon name="fa-solid:exclamation-circle" class="text-red-500 mr-2" />
        <p class="text-red-700 text-sm">{{ error }}</p>
      </div>
    </div>
    
    <div v-if="images.length > 0" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
      <div v-for="(image, index) in images" :key="index" class="relative group">
        <img 
          :src="image.url || image" 
          :alt="`Image ${index + 1}`" 
          class="w-full h-24 object-cover rounded-lg border border-gray-200"
        />
        <button
          type="button"
          @click="removeImage(index)"
          class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ×
        </button>
        <div v-if="image.name" class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg truncate">
          {{ image.name }}
        </div>
      </div>
    </div>
    
    <div v-if="uploading" class="flex items-center justify-center py-8">
      <Icon name="fa-solid:spinner" class="animate-spin text-2xl text-[#ecbc85] mr-2" />
      <span class="text-gray-600">Uploading images...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: any[];
  label: string;
  description?: string;
  maxFiles?: number;
}

interface Emits {
  (e: 'update:modelValue', value: any[]): void;
}

const props = withDefaults(defineProps<Props>(), {
  maxFiles: 10,
});

const emit = defineEmits<Emits>();

const images = computed({
  get: () => props.modelValue || [],
  set: (value) => emit('update:modelValue', value),
});

const uploading = ref(false);
const error = ref('');

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (!files) return;

  const remainingSlots = props.maxFiles - images.value.length;
  const filesToUpload = Array.from(files).slice(0, remainingSlots);

  if (filesToUpload.length === 0) {
    alert(`Maximum ${props.maxFiles} images allowed`);
    return;
  }

  uploading.value = true;
  error.value = '';

  try {
    // Upload files to server
    const uploadPromises = filesToUpload.map(async (file) => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error(`${file.name} is not an image file`);
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error(`${file.name} is too large (max 5MB)`);
      }

      const formData = new FormData();
      formData.append('file', file);

      const response: any = await $fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      if (response.success && response.url) {
        return {
          url: response.url,
          name: file.name,
          size: file.size,
          type: file.type,
        };
      } else {
        throw new Error(`Failed to upload ${file.name}`);
      }
    });

    const newImages = await Promise.all(uploadPromises);
    images.value = [...images.value, ...newImages];
  } catch (err: any) {
    console.error('Error uploading images:', err);
    error.value = err.message || 'Failed to upload images';
  } finally {
    uploading.value = false;
    // Clear the input
    target.value = '';
  }
};

const removeImage = (index: number) => {
  const newImages = [...images.value];
  newImages.splice(index, 1);
  images.value = newImages;
};
</script>