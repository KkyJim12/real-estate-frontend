<template>
  <div class="max-w-4xl mx-auto p-8">
    <h1 class="text-3xl font-bold mb-8">Multi-Language Component Test</h1>
    
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
      <h2 class="font-semibold text-blue-800 mb-2">Instructions:</h2>
      <ul class="text-blue-700 text-sm space-y-1">
        <li>• Click on language tabs (English, ไทย, 中文) to switch between languages</li>
        <li>• Type different content in each language - they should be separate</li>
        <li>• Green dots indicate which languages have content</li>
        <li>• The "Current Value" shows the complete multi-language object</li>
      </ul>
    </div>
    
    <div class="space-y-8">
      <!-- Test MultiLanguageInput -->
      <div class="bg-white p-6 rounded-lg border">
        <h2 class="text-xl font-semibold mb-4">MultiLanguageInput Test</h2>
        <MultiLanguageInput
          v-model="testInput"
          label="Test Input"
          placeholder="Enter some text"
          required
        />
        <div class="mt-4 p-4 bg-gray-100 rounded">
          <h3 class="font-medium mb-2">Current Value:</h3>
          <pre>{{ JSON.stringify(testInput, null, 2) }}</pre>
        </div>
      </div>

      <!-- Test MultiLanguageEditor -->
      <div class="bg-white p-6 rounded-lg border">
        <h2 class="text-xl font-semibold mb-4">MultiLanguageEditor Test</h2>
        <MultiLanguageEditor
          v-model="testEditor"
          label="Test Editor"
          placeholder="Enter some content"
        />
        <div class="mt-4 p-4 bg-gray-100 rounded">
          <h3 class="font-medium mb-2">Current Value:</h3>
          <pre>{{ JSON.stringify(testEditor, null, 2) }}</pre>
        </div>
      </div>

      <!-- Test Translation Utilities -->
      <div class="bg-white p-6 rounded-lg border">
        <h2 class="text-xl font-semibold mb-4">Translation Utilities Test</h2>
        <div class="space-y-4">
          <div>
            <h3 class="font-medium">Current Language: {{ currentLanguage }}</h3>
          </div>
          <div>
            <h3 class="font-medium">Translated Input:</h3>
            <p>{{ getTranslatedField(testInput) }}</p>
          </div>
          <div>
            <h3 class="font-medium">Has Content in Current Language:</h3>
            <p>{{ hasContentInCurrentLanguage(testInput) ? 'Yes' : 'No' }}</p>
          </div>
          <div>
            <h3 class="font-medium">Content Status:</h3>
            <pre>{{ JSON.stringify(getContentStatus(testInput), null, 2) }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { 
  currentLanguage,
  getTranslatedField,
  hasContentInCurrentLanguage,
  getContentStatus
} = useMultiLanguageContent();

const testInput = ref({
  en: '',
  th: '',
  zh: ''
});

const testEditor = ref({
  en: '',
  th: '',
  zh: ''
});
</script>