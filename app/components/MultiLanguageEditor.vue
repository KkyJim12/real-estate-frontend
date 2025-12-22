<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <label class="block text-sm font-semibold text-gray-700">
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </label>
      <div class="flex space-x-1">
        <button
          v-for="lang in languages"
          :key="lang.code"
          type="button"
          @click="activeLanguage = lang.code"
          :class="[
            'px-3 py-1 text-xs font-medium rounded-md transition-colors',
            activeLanguage === lang.code
              ? 'bg-[#ecbc85] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          ]"
        >
          {{ lang.name }}
        </button>
      </div>
    </div>

    <div class="relative">
      <textarea
        :value="localValue[activeLanguage]"
        @input="handleInput"
        :placeholder="getPlaceholder(activeLanguage)"
        :required="required && activeLanguage === 'en'"
        :rows="rows"
        :class="[
          'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition resize-none'
        ]"
      />
      
      <!-- Language indicator -->
      <div class="absolute top-2 right-2 px-2 py-1 bg-gray-100 text-xs text-gray-500 rounded">
        {{ languages.find(l => l.code === activeLanguage)?.name }}
      </div>
    </div>

    <!-- Content status indicators -->
    <div class="flex space-x-2 text-xs">
      <div
        v-for="lang in languages"
        :key="lang.code"
        :class="[
          'flex items-center space-x-1 px-2 py-1 rounded',
          hasContent(lang.code)
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-100 text-gray-500'
        ]"
      >
        <div
          :class="[
            'w-2 h-2 rounded-full',
            hasContent(lang.code) ? 'bg-green-500' : 'bg-gray-300'
          ]"
        ></div>
        <span>{{ lang.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Language {
  code: 'en' | 'th' | 'zh';
  name: string;
}

interface TranslatableValue {
  en: string;
  th: string;
  zh: string;
}

interface Props {
  modelValue: TranslatableValue;
  label: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  required: false,
  rows: 4
});

const emit = defineEmits<{
  'update:modelValue': [value: TranslatableValue];
}>();

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'th', name: 'ไทย' },
  { code: 'zh', name: '中文' }
];

const activeLanguage = ref<'en' | 'th' | 'zh'>('en');

// Initialize local value with proper structure
const localValue = ref<TranslatableValue>({
  en: props.modelValue?.en || '',
  th: props.modelValue?.th || '',
  zh: props.modelValue?.zh || ''
});

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    localValue.value = {
      en: newValue.en || '',
      th: newValue.th || '',
      zh: newValue.zh || ''
    };
  }
}, { deep: true, immediate: true });

// Handle input changes for the current language
const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  const value = target.value;
  
  // Update only the current language
  localValue.value[activeLanguage.value] = value;
  
  // Emit the updated value
  emit('update:modelValue', { ...localValue.value });
};

const hasContent = (lang: string) => {
  const content = localValue.value[lang as keyof TranslatableValue];
  return content && content.trim().length > 0;
};

const getPlaceholder = (lang: string) => {
  if (!props.placeholder) return '';
  
  const placeholders = {
    en: props.placeholder,
    th: `${props.placeholder} (ภาษาไทย)`,
    zh: `${props.placeholder} (中文)`
  };
  
  return placeholders[lang as keyof typeof placeholders] || props.placeholder;
};
</script>