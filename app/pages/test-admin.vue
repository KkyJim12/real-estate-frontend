<template>
  <div class="max-w-4xl mx-auto p-8">
    <h1 class="text-3xl font-bold mb-8">Admin Pages Test</h1>
    
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
      <h2 class="font-semibold text-blue-800 mb-2">Test Multi-Language Admin Pages</h2>
      <p class="text-blue-700 text-sm">Click the links below to test each admin page with multi-language support.</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Projects Admin -->
      <div class="bg-white p-6 rounded-lg border shadow-sm">
        <div class="flex items-center mb-4">
          <Icon name="fa-solid:building" class="text-2xl text-[#ecbc85] mr-3" />
          <h3 class="text-lg font-semibold">Projects</h3>
        </div>
        <p class="text-gray-600 text-sm mb-4">Create and manage real estate projects with multi-language support.</p>
        <div class="space-y-2">
          <NuxtLink 
            to="/admin/projects/create" 
            class="block w-full px-4 py-2 bg-[#ecbc85] text-white text-center rounded-lg hover:bg-[#d4a574] transition-colors"
          >
            Create Project
          </NuxtLink>
          <NuxtLink 
            to="/admin/projects" 
            class="block w-full px-4 py-2 bg-gray-100 text-gray-700 text-center rounded-lg hover:bg-gray-200 transition-colors"
          >
            View All Projects
          </NuxtLink>
        </div>
        <div class="mt-4 text-xs text-gray-500">
          <p>✅ Multi-language: Title, Description, Neighborhoods, Carousel, Units, Gallery</p>
        </div>
      </div>

      <!-- Articles Admin -->
      <div class="bg-white p-6 rounded-lg border shadow-sm">
        <div class="flex items-center mb-4">
          <Icon name="fa-solid:newspaper" class="text-2xl text-green-600 mr-3" />
          <h3 class="text-lg font-semibold">Articles</h3>
        </div>
        <p class="text-gray-600 text-sm mb-4">Create and manage news articles with multi-language content.</p>
        <div class="space-y-2">
          <NuxtLink 
            to="/admin/articles/create" 
            class="block w-full px-4 py-2 bg-green-600 text-white text-center rounded-lg hover:bg-green-700 transition-colors"
          >
            Create Article
          </NuxtLink>
          <NuxtLink 
            to="/admin/articles" 
            class="block w-full px-4 py-2 bg-gray-100 text-gray-700 text-center rounded-lg hover:bg-gray-200 transition-colors"
          >
            View All Articles
          </NuxtLink>
        </div>
        <div class="mt-4 text-xs text-gray-500">
          <p>✅ Multi-language: Title, Content</p>
        </div>
      </div>

      <!-- Carousel Admin -->
      <div class="bg-white p-6 rounded-lg border shadow-sm">
        <div class="flex items-center mb-4">
          <Icon name="fa-solid:images" class="text-2xl text-purple-600 mr-3" />
          <h3 class="text-lg font-semibold">Carousel</h3>
        </div>
        <p class="text-gray-600 text-sm mb-4">Manage homepage carousel slides with multi-language text.</p>
        <div class="space-y-2">
          <NuxtLink 
            to="/admin/carousel/create" 
            class="block w-full px-4 py-2 bg-purple-600 text-white text-center rounded-lg hover:bg-purple-700 transition-colors"
          >
            Create Slide
          </NuxtLink>
          <NuxtLink 
            to="/admin/carousel" 
            class="block w-full px-4 py-2 bg-gray-100 text-gray-700 text-center rounded-lg hover:bg-gray-200 transition-colors"
          >
            View All Slides
          </NuxtLink>
        </div>
        <div class="mt-4 text-xs text-gray-500">
          <p>✅ Multi-language: Title, Description</p>
        </div>
      </div>

      <!-- Settings -->
      <div class="bg-white p-6 rounded-lg border shadow-sm">
        <div class="flex items-center mb-4">
          <Icon name="fa-solid:cog" class="text-2xl text-gray-600 mr-3" />
          <h3 class="text-lg font-semibold">Settings</h3>
        </div>
        <p class="text-gray-600 text-sm mb-4">Migration tools and system settings.</p>
        <div class="space-y-2">
          <NuxtLink 
            to="/admin/settings" 
            class="block w-full px-4 py-2 bg-gray-600 text-white text-center rounded-lg hover:bg-gray-700 transition-colors"
          >
            Admin Settings
          </NuxtLink>
        </div>
        <div class="mt-4 text-xs text-gray-500">
          <p>✅ Multi-language migration tool available</p>
        </div>
      </div>

      <!-- Test Pages -->
      <div class="bg-white p-6 rounded-lg border shadow-sm">
        <div class="flex items-center mb-4">
          <Icon name="fa-solid:flask" class="text-2xl text-orange-600 mr-3" />
          <h3 class="text-lg font-semibold">Test Pages</h3>
        </div>
        <p class="text-gray-600 text-sm mb-4">Test multi-language components and APIs.</p>
        <div class="space-y-2">
          <NuxtLink 
            to="/test-multilang" 
            class="block w-full px-4 py-2 bg-orange-600 text-white text-center rounded-lg hover:bg-orange-700 transition-colors"
          >
            Test Components
          </NuxtLink>
          <NuxtLink 
            to="/test-api" 
            class="block w-full px-4 py-2 bg-gray-100 text-gray-700 text-center rounded-lg hover:bg-gray-200 transition-colors"
          >
            Test APIs
          </NuxtLink>
        </div>
        <div class="mt-4 text-xs text-gray-500">
          <p>✅ Component and API testing</p>
        </div>
      </div>

      <!-- Documentation -->
      <div class="bg-white p-6 rounded-lg border shadow-sm">
        <div class="flex items-center mb-4">
          <Icon name="fa-solid:book" class="text-2xl text-blue-600 mr-3" />
          <h3 class="text-lg font-semibold">Documentation</h3>
        </div>
        <p class="text-gray-600 text-sm mb-4">Guides and documentation for multi-language system.</p>
        <div class="space-y-2">
          <a 
            href="/ADMIN_MULTILANG_GUIDE.md" 
            target="_blank"
            class="block w-full px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
          >
            Admin Guide
          </a>
          <a 
            href="/MULTILANGUAGE.md" 
            target="_blank"
            class="block w-full px-4 py-2 bg-gray-100 text-gray-700 text-center rounded-lg hover:bg-gray-200 transition-colors"
          >
            Technical Docs
          </a>
        </div>
        <div class="mt-4 text-xs text-gray-500">
          <p>✅ Complete documentation available</p>
        </div>
      </div>
    </div>

    <!-- Status Summary -->
    <div class="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
      <h2 class="text-lg font-semibold text-green-800 mb-4">Multi-Language System Status</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <h3 class="font-medium text-green-700 mb-2">✅ Completed Features:</h3>
          <ul class="space-y-1 text-green-600">
            <li>• Multi-language input components</li>
            <li>• Multi-language editor components</li>
            <li>• Project admin with multi-language fields</li>
            <li>• Article admin with multi-language fields</li>
            <li>• Carousel admin with multi-language fields</li>
            <li>• API endpoints with language support</li>
            <li>• Migration tool for existing content</li>
            <li>• Validation and error handling</li>
          </ul>
        </div>
        <div>
          <h3 class="font-medium text-green-700 mb-2">🌐 Supported Languages:</h3>
          <ul class="space-y-1 text-green-600">
            <li>• English (EN) - Primary/Fallback</li>
            <li>• Thai (TH) - ภาษาไทย</li>
            <li>• Chinese (ZH) - 中文</li>
          </ul>
          <h3 class="font-medium text-green-700 mb-2 mt-4">🔧 Technical Features:</h3>
          <ul class="space-y-1 text-green-600">
            <li>• Language-specific content storage</li>
            <li>• Automatic fallback system</li>
            <li>• Visual content indicators</li>
            <li>• Server-side validation</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Test page for admin functionality
</script>