<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <SiteNavigation />

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-[#ecbc85]/30 border-t-[#ecbc85] rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-gray-600 font-light">Loading project...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="!project" class="flex items-center justify-center min-h-screen">
      <div class="text-center max-w-md mx-auto px-6">
        <div class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="fa-solid:exclamation-triangle" class="text-2xl text-red-500" />
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Project Not Found</h2>
        <p class="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
        <NuxtLink
          to="/"
          class="inline-flex items-center space-x-2 bg-[#2c2c54] text-white px-6 py-3 rounded-lg hover:bg-[#ecbc85] transition-colors"
        >
          <Icon name="fa-solid:arrow-left" />
          <span>Back to Home</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Project Content -->
    <div v-else>
      <!-- Hero Section -->
      <section class="relative h-screen overflow-hidden">
        <!-- Background Image with Parallax Effect -->
        <div class="absolute inset-0 hero-parallax">
          <NuxtImg
            :src="project.gallery?.[0]?.images?.[0]?.url || project.image || '/images/default-project.jpg'"
            :alt="project.title"
            class="w-full h-full object-cover scale-110"
            loading="eager"
            format="webp"
            quality="95"
          />
          <!-- Sophisticated Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-[#2c2c54]/80 via-black/40 to-[#2c2c54]/60"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <!-- Luxury Pattern Overlay -->
          <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 25% 25%, #ecbc85 2px, transparent 2px), radial-gradient(circle at 75% 75%, #ecbc85 2px, transparent 2px); background-size: 100px 100px;"></div>
        </div>

        <!-- Floating Elements -->
        <div class="absolute top-20 left-10 w-32 h-32 bg-[#ecbc85]/10 rounded-full blur-xl animate-float"></div>
        <div class="absolute bottom-32 right-16 w-24 h-24 bg-white/5 rounded-full blur-lg animate-float-delayed"></div>

        <!-- Hero Content -->
        <div class="relative z-10 flex items-center justify-center h-full px-6">
          <div class="text-center text-white max-w-5xl mx-auto">
            <!-- Luxury Badge with Animation -->
            <div class="inline-flex items-center space-x-3 bg-gradient-to-r from-white/15 to-white/5 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 mb-8 shadow-2xl luxury-badge">
              <div class="w-3 h-3 bg-gradient-to-r from-[#ecbc85] to-[#d4a574] rounded-full animate-pulse"></div>
              <span class="text-sm font-semibold tracking-widest uppercase text-[#ecbc85]">{{ project.projectType || 'Luxury Development' }}</span>
              <div class="w-px h-4 bg-white/30"></div>
              <span class="text-xs text-white/80 uppercase tracking-wide">Premium Collection</span>
            </div>

            <!-- Main Title with Luxury Typography -->
            <h1 class="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight luxury-title">
              <span class="bg-gradient-to-r from-white via-white to-[#ecbc85] bg-clip-text text-transparent">
                {{ project.title }}
              </span>
            </h1>
            
            <!-- Elegant Separator -->
            <div class="flex items-center justify-center mb-8">
              <div class="h-px bg-gradient-to-r from-transparent via-[#ecbc85] to-transparent w-32"></div>
              <div class="mx-4 w-2 h-2 bg-[#ecbc85] rounded-full"></div>
              <div class="h-px bg-gradient-to-r from-transparent via-[#ecbc85] to-transparent w-32"></div>
            </div>

            <!-- Developer & Location with Icons -->
            <div class="space-y-4 mb-12">
              <div class="flex items-center justify-center space-x-3">
                <Icon name="fa-solid:building" class="text-[#ecbc85] text-lg" />
                <p class="text-xl md:text-2xl font-light text-white/95">{{ project.developer }}</p>
              </div>
              <div class="flex items-center justify-center space-x-3">
                <Icon name="fa-solid:map-marker-alt" class="text-[#ecbc85] text-lg" />
                <p class="text-lg md:text-xl font-light text-white/85">{{ project.location }}</p>
              </div>
            </div>

            <!-- Premium CTA Button -->
            <button
              @click="scrollToSection('details')"
              class="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-[#ecbc85] to-[#d4a574] text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-[#ecbc85]/25 hover:scale-105 transition-all duration-500 luxury-button"
            >
              <span>Discover Excellence</span>
              <Icon name="fa-solid:arrow-down" class="group-hover:translate-y-1 transition-transform duration-300" />
              <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        <!-- Elegant Scroll Indicator -->
        <div class="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2">
          <div class="text-white/60 text-sm font-light tracking-wide">Scroll to explore</div>
          <div class="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"></div>
          <Icon name="fa-solid:chevron-down" class="text-white/60 text-sm animate-bounce" />
        </div>
      </section>

      <!-- Project Overview -->
      <section id="details" class="py-32 relative overflow-hidden">
        <!-- Ultra-Modern Luxury Background -->
        <div class="absolute inset-0">
          <!-- Primary Gradient -->
          <div class="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-gray-50"></div>
          
          <!-- Sophisticated Mesh Gradient -->
          <div class="absolute inset-0 bg-gradient-to-tr from-[#2c2c54]/5 via-transparent to-[#ecbc85]/10"></div>
          
          <!-- Luxury Geometric Pattern -->
          <div class="absolute inset-0 opacity-[0.02]">
            <div class="absolute inset-0" style="background-image: 
              radial-gradient(circle at 25% 25%, #2c2c54 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, #ecbc85 1px, transparent 1px),
              linear-gradient(45deg, transparent 49%, rgba(44, 44, 84, 0.1) 50%, transparent 51%),
              linear-gradient(-45deg, transparent 49%, rgba(236, 188, 133, 0.1) 50%, transparent 51%);
              background-size: 120px 120px, 80px 80px, 60px 60px, 60px 60px;
              background-position: 0 0, 40px 40px, 0 0, 30px 30px;"></div>
          </div>
          
          <!-- Floating Orbs -->
          <div class="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#ecbc85]/10 via-[#ecbc85]/5 to-transparent rounded-full blur-3xl animate-float opacity-60"></div>
          <div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-[#2c2c54]/8 via-[#2c2c54]/4 to-transparent rounded-full blur-3xl animate-float-delayed opacity-40"></div>
          <div class="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-[#ecbc85]/6 to-[#2c2c54]/6 rounded-full blur-2xl animate-pulse opacity-30"></div>
          
          <!-- Luxury Light Rays -->
          <div class="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#ecbc85]/20 to-transparent"></div>
          <div class="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-[#2c2c54]/15 to-transparent"></div>
        </div>

        <div class="max-w-7xl mx-auto px-6 relative">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <!-- Content -->
            <div class="space-y-8">
              <!-- Section Header -->
              <div class="space-y-4">
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-px bg-gradient-to-r from-[#ecbc85] to-transparent"></div>
                  <span class="text-[#ecbc85] font-bold text-sm uppercase tracking-[0.2em]">About Project</span>
                </div>
                <h2 class="text-5xl lg:text-6xl font-black text-[#2c2c54] leading-tight">
                  Project
                  <span class="block bg-gradient-to-r from-[#2c2c54] to-[#ecbc85] bg-clip-text text-transparent">
                    Overview
                  </span>
                </h2>
              </div>
              
              <!-- Description -->
              <div class="relative">
                <div class="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#ecbc85] to-transparent rounded-full"></div>
                <p class="text-xl text-gray-700 leading-relaxed font-light pl-8">
                  {{ project.description }}
                </p>
              </div>

              <!-- Luxury Stats Grid -->
              <div class="grid grid-cols-2 gap-6 pt-8">
                <div class="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#ecbc85]/20">
                  <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ecbc85] to-[#d4a574] rounded-t-2xl"></div>
                  <div class="text-center">
                    <div class="text-4xl font-black bg-gradient-to-r from-[#ecbc85] to-[#d4a574] bg-clip-text text-transparent mb-3">
                      {{ project.floors || 'N/A' }}
                    </div>
                    <div class="text-sm text-gray-600 font-semibold uppercase tracking-wide">Floors</div>
                  </div>
                  <div class="absolute inset-0 bg-gradient-to-br from-[#ecbc85]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <div class="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#ecbc85]/20">
                  <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2c2c54] to-[#ecbc85] rounded-t-2xl"></div>
                  <div class="text-center">
                    <div class="text-4xl font-black bg-gradient-to-r from-[#2c2c54] to-[#ecbc85] bg-clip-text text-transparent mb-3">
                      {{ project.units || 'N/A' }}
                    </div>
                    <div class="text-sm text-gray-600 font-semibold uppercase tracking-wide">Units</div>
                  </div>
                  <div class="absolute inset-0 bg-gradient-to-br from-[#2c2c54]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>

            <!-- Premium Image Display -->
            <div class="relative">
              <!-- Decorative Elements -->
              <div class="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-[#ecbc85]/20 to-transparent rounded-full blur-2xl"></div>
              <div class="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-[#2c2c54]/20 to-transparent rounded-full blur-xl"></div>
              
              <!-- Main Image Container -->
              <div class="relative group">
                <div class="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <NuxtImg
                    :src="project.gallery?.[1]?.images?.[0]?.url || project.gallery?.[0]?.images?.[1]?.url || project.image"
                    :alt="project.title + ' overview'"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    format="webp"
                    quality="95"
                  />
                  <!-- Luxury Overlay -->
                  <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <!-- Floating Badge -->
                <div class="absolute -bottom-6 -right-6 bg-gradient-to-r from-[#2c2c54] to-[#ecbc85] text-white px-6 py-3 rounded-2xl shadow-xl">
                  <div class="text-sm font-bold uppercase tracking-wide">Premium</div>
                  <div class="text-xs opacity-90">Development</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Project Information Tabs -->
      <section class="py-20 bg-[#2c2c54] text-white">
        <div class="max-w-7xl mx-auto px-6">
          <!-- Section Header -->
          <div class="text-center mb-16">
            <span class="text-[#ecbc85] font-semibold text-sm uppercase tracking-wide">Project Details</span>
            <h2 class="text-4xl font-bold mt-2 mb-4">Complete Information</h2>
            <p class="text-xl text-white/80 max-w-3xl mx-auto">
              Discover all the details about this exceptional project
            </p>
          </div>

          <!-- Tabs Navigation -->
          <div class="flex justify-center mb-12">
            <div class="bg-white/10 backdrop-blur-sm rounded-full p-1">
              <div class="flex space-x-1">
                <button
                  @click="activeTab = 'facilities'"
                  :class="[
                    'px-6 py-3 rounded-full font-medium text-sm uppercase tracking-wide transition-all duration-300',
                    activeTab === 'facilities'
                      ? 'bg-[#ecbc85] text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  ]"
                >
                  Facilities
                </button>
                <button
                  @click="activeTab = 'neighbourhood'"
                  :class="[
                    'px-6 py-3 rounded-full font-medium text-sm uppercase tracking-wide transition-all duration-300',
                    activeTab === 'neighbourhood'
                      ? 'bg-[#ecbc85] text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  ]"
                >
                  Location
                </button>
                <button
                  @click="activeTab = 'factsheet'"
                  :class="[
                    'px-6 py-3 rounded-full font-medium text-sm uppercase tracking-wide transition-all duration-300',
                    activeTab === 'factsheet'
                      ? 'bg-[#ecbc85] text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  ]"
                >
                  Specifications
                </button>
              </div>
            </div>
          </div>

          <!-- Tab Content -->
          <div class="min-h-[400px]">
            <!-- Facilities Tab -->
            <div v-show="activeTab === 'facilities'" class="fade-in">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Featured Facilities -->
                <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/15 transition-colors">
                  <div class="w-16 h-16 bg-[#ecbc85] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="fa-solid:swimming-pool" class="text-2xl text-white" />
                  </div>
                  <h3 class="text-xl font-semibold mb-2">Swimming Pool</h3>
                  <p class="text-white/70 text-sm">Luxury swimming pool with stunning views</p>
                </div>

                <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/15 transition-colors">
                  <div class="w-16 h-16 bg-[#ecbc85] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="fa-solid:dumbbell" class="text-2xl text-white" />
                  </div>
                  <h3 class="text-xl font-semibold mb-2">Fitness Center</h3>
                  <p class="text-white/70 text-sm">State-of-the-art fitness equipment</p>
                </div>

                <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/15 transition-colors">
                  <div class="w-16 h-16 bg-[#ecbc85] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon name="fa-solid:shield-alt" class="text-2xl text-white" />
                  </div>
                  <h3 class="text-xl font-semibold mb-2">24/7 Security</h3>
                  <p class="text-white/70 text-sm">Round-the-clock security service</p>
                </div>
              </div>

              <!-- Additional Facilities -->
              <div v-if="project.facilities && project.facilities.length" class="mt-12">
                <h3 class="text-2xl font-semibold text-center mb-8">Additional Amenities</h3>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div
                    v-for="facility in project.facilities"
                    :key="facility"
                    class="bg-white/5 rounded-lg p-4 text-center hover:bg-white/10 transition-colors"
                  >
                    <Icon name="fa-solid:check" class="text-[#ecbc85] mb-2" />
                    <p class="text-sm">{{ facility }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Location Tab -->
            <div v-show="activeTab === 'neighbourhood'" class="fade-in">
              <div class="max-w-4xl mx-auto">
                <div v-if="project.neighborhoods && project.neighborhoods.length">
                  <h3 class="text-2xl font-semibold text-center mb-8">Nearby Areas</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                      v-for="neighborhood in project.neighborhoods"
                      :key="neighborhood.name"
                      class="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center space-x-4"
                    >
                      <div class="w-12 h-12 bg-[#ecbc85] rounded-lg flex items-center justify-center">
                        {{ neighborhood.number }}m
                      </div>
                      <div>
                        <h4 class="font-semibold text-lg">{{ neighborhood.name }}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="text-center py-12">
                  <Icon name="fa-solid:map-marker-alt" class="text-4xl text-white/40 mb-4" />
                  <p class="text-white/70">Location details will be available soon</p>
                </div>
              </div>
            </div>

            <!-- Specifications Tab -->
            <div v-show="activeTab === 'factsheet'" class="fade-in">
              <div class="max-w-4xl mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <!-- Project Details -->
                  <div class="bg-white/5 backdrop-blur-sm rounded-xl p-8">
                    <h3 class="text-2xl font-semibold mb-6 text-[#ecbc85]">Project Details</h3>
                    <div class="space-y-4">
                      <div class="flex justify-between py-2 border-b border-white/10">
                        <span class="text-white/70">Developer</span>
                        <span>{{ project.developer || 'N/A' }}</span>
                      </div>
                      <div class="flex justify-between py-2 border-b border-white/10">
                        <span class="text-white/70">Project Type</span>
                        <span class="capitalize">{{ project.projectType || 'N/A' }}</span>
                      </div>
                      <div class="flex justify-between py-2 border-b border-white/10">
                        <span class="text-white/70">Ownership</span>
                        <span class="capitalize">{{ project.ownershipType || 'N/A' }}</span>
                      </div>
                      <div class="flex justify-between py-2 border-b border-white/10">
                        <span class="text-white/70">Project Area</span>
                        <span>{{ project.area || 'N/A' }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Construction Details -->
                  <div class="bg-white/5 backdrop-blur-sm rounded-xl p-8">
                    <h3 class="text-2xl font-semibold mb-6 text-[#ecbc85]">Construction Info</h3>
                    <div class="space-y-4">
                      <div class="flex justify-between py-2 border-b border-white/10">
                        <span class="text-white/70">Construction Period</span>
                        <span>{{ project.constructionPeriod || 'N/A' }}</span>
                      </div>
                      <div class="flex justify-between py-2 border-b border-white/10">
                        <span class="text-white/70">Expected Completion</span>
                        <span>{{ project.expectedFinish || 'N/A' }}</span>
                      </div>
                      <div class="flex justify-between py-2 border-b border-white/10">
                        <span class="text-white/70">Number of Floors</span>
                        <span>{{ project.floors || 'N/A' }}</span>
                      </div>
                      <div class="flex justify-between py-2 border-b border-white/10">
                        <span class="text-white/70">Total Units</span>
                        <span>{{ project.units || 'N/A' }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Show Units Section -->
      <section v-if="project.showUnits && project.showUnits.length" class="py-32 bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden">
        <!-- Luxury Background Elements -->
        <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#ecbc85]/10 to-transparent rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#2c2c54]/10 to-transparent rounded-full blur-3xl"></div>

        <div class="max-w-7xl mx-auto px-6 relative">
          <!-- Luxury Section Header -->
          <div class="text-center mb-20">
            <div class="flex items-center justify-center space-x-4 mb-6">
              <div class="w-16 h-px bg-gradient-to-r from-transparent via-[#ecbc85] to-transparent"></div>
              <span class="text-[#ecbc85] font-bold text-sm uppercase tracking-[0.3em]">Unit Collection</span>
              <div class="w-16 h-px bg-gradient-to-r from-transparent via-[#ecbc85] to-transparent"></div>
            </div>
            <h2 class="text-5xl lg:text-6xl font-black text-[#2c2c54] mb-6 leading-tight">
              Exclusive
              <span class="block bg-gradient-to-r from-[#2c2c54] to-[#ecbc85] bg-clip-text text-transparent">
                Residences
              </span>
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Discover our meticulously crafted living spaces, each designed to embody luxury and sophistication
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <!-- Luxury Unit Selection -->
            <div class="space-y-6">
              <h3 class="text-2xl font-bold text-[#2c2c54] mb-8 flex items-center">
                <Icon name="fa-solid:home" class="text-[#ecbc85] mr-3" />
                Available Floor Plans
              </h3>
              <div class="space-y-4">
                <div
                  v-for="(unit, index) in project.showUnits"
                  :key="index"
                  class="group relative p-8 bg-white rounded-2xl cursor-pointer border-2 transition-all duration-500 hover:shadow-2xl"
                  :class="selectedUnit === index 
                    ? 'border-[#ecbc85] bg-gradient-to-br from-[#ecbc85]/5 to-white shadow-xl' 
                    : 'border-gray-100 hover:border-[#ecbc85]/30'"
                  @click="selectedUnit = index"
                >
                  <!-- Selection Indicator -->
                  <div 
                    class="absolute top-4 right-4 w-6 h-6 rounded-full border-2 transition-all duration-300"
                    :class="selectedUnit === index 
                      ? 'border-[#ecbc85] bg-[#ecbc85]' 
                      : 'border-gray-300 group-hover:border-[#ecbc85]'"
                  >
                    <div 
                      v-if="selectedUnit === index"
                      class="w-full h-full rounded-full bg-white scale-50 flex items-center justify-center"
                    >
                      <Icon name="fa-solid:check" class="text-[#ecbc85] text-xs" />
                    </div>
                  </div>

                  <!-- Unit Content -->
                  <div class="space-y-3">
                    <h4 class="text-2xl font-bold text-[#2c2c54] capitalize flex items-center">
                      <Icon name="fa-solid:bed" class="text-[#ecbc85] mr-3 text-lg" />
                      {{ unit.roomType?.replace('br', ' Bedroom') || 'Luxury Unit' }}
                    </h4>
                    <p class="text-gray-600 leading-relaxed font-light">{{ unit.description }}</p>
                  </div>

                  <!-- Luxury Accent -->
                  <div 
                    class="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#ecbc85] to-[#d4a574] rounded-b-2xl transition-all duration-500"
                    :class="selectedUnit === index ? 'w-full' : 'w-0 group-hover:w-full'"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Premium Unit Gallery -->
            <div class="space-y-6">
              <h3 class="text-2xl font-bold text-[#2c2c54] mb-8 flex items-center">
                <Icon name="fa-solid:images" class="text-[#ecbc85] mr-3" />
                Interior Showcase
              </h3>
              
              <div v-if="project.showUnits[selectedUnit]?.images?.length" class="space-y-6">
                <!-- Main Image Display -->
                <div class="relative group">
                  <div class="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                    <NuxtImg
                      :src="project.showUnits[selectedUnit].images[selectedUnitImage]?.url || project.showUnits[selectedUnit].images[selectedUnitImage]"
                      :alt="`${project.showUnits[selectedUnit].roomType} unit`"
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      format="webp"
                      quality="95"
                    />
                    <!-- Luxury Overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  <!-- Image Counter -->
                  <div class="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {{ selectedUnitImage + 1 }} / {{ project.showUnits[selectedUnit].images.length }}
                  </div>
                </div>
                
                <!-- Luxury Thumbnails -->
                <div class="grid grid-cols-4 gap-3">
                  <div
                    v-for="(image, imgIndex) in project.showUnits[selectedUnit].images"
                    :key="imgIndex"
                    class="group relative aspect-square rounded-xl overflow-hidden cursor-pointer border-3 transition-all duration-300"
                    :class="selectedUnitImage === imgIndex 
                      ? 'border-[#ecbc85] shadow-lg' 
                      : 'border-gray-200 hover:border-[#ecbc85]/50'"
                    @click="selectedUnitImage = imgIndex"
                  >
                    <NuxtImg
                      :src="image?.url || image"
                      :alt="`Unit image ${imgIndex + 1}`"
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      format="webp"
                      quality="80"
                    />
                    <!-- Selection Overlay -->
                    <div 
                      class="absolute inset-0 bg-gradient-to-br from-[#ecbc85]/20 to-transparent transition-opacity duration-300"
                      :class="selectedUnitImage === imgIndex ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Gallery Section -->
      <section v-if="project.gallery && project.gallery.length" class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <span class="text-[#ecbc85] font-semibold text-sm uppercase tracking-wide">Project Gallery</span>
            <h2 class="text-4xl font-bold text-[#2c2c54] mt-2 mb-4">Visual Experience</h2>
          </div>

          <!-- Gallery Filter -->
          <div class="flex flex-wrap justify-center gap-4 mb-12">
            <button
              @click="selectedGalleryTag = 'all'"
              :class="[
                'px-6 py-2 rounded-full font-medium transition-colors',
                selectedGalleryTag === 'all'
                  ? 'bg-[#ecbc85] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              ]"
            >
              All
            </button>
            <button
              v-for="tag in galleryTags"
              :key="tag"
              @click="selectedGalleryTag = tag"
              :class="[
                'px-6 py-2 rounded-full font-medium transition-colors capitalize',
                selectedGalleryTag === tag
                  ? 'bg-[#ecbc85] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              ]"
            >
              {{ tag }}
            </button>
          </div>

          <!-- Gallery Grid - Limited to 2 rows x 4 columns -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div
              v-for="(image, index) in limitedGalleryImages"
              :key="index"
              class="aspect-square rounded-xl overflow-hidden cursor-pointer group relative"
              @click="openLightbox(index)"
            >
              <NuxtImg
                :src="image.url || image.src"
                :alt="image.alt || `Gallery image ${index + 1}`"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                format="webp"
                quality="80"
              />
              <!-- Show remaining count on last image if there are more -->
              <div
                v-if="index === 7 && filteredGalleryImages.length > 8"
                class="absolute inset-0 bg-black/60 flex items-center justify-center group-hover:bg-black/70 transition-colors"
              >
                <div class="text-center text-white">
                  <div class="text-2xl font-bold">+{{ filteredGalleryImages.length - 8 }}</div>
                  <div class="text-sm">More Photos</div>
                </div>
              </div>
            </div>
          </div>

          <!-- View All Button -->
          <div v-if="filteredGalleryImages.length > 8" class="text-center">
            <button
              @click="openLightbox(0)"
              class="inline-flex items-center space-x-2 bg-[#2c2c54] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#ecbc85] transition-colors"
            >
              <Icon name="fa-solid:images" />
              <span>View All {{ filteredGalleryImages.length }} Photos</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Contact Our Team Section -->
      <section class="py-24 bg-gradient-to-br from-white via-gray-50/30 to-white relative overflow-hidden px-10 lg:px-60">
        <!-- Elegant Background Elements -->
        <div class="absolute inset-0 opacity-20">
          <div class="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#ecbc85]/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div class="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tl from-[#2c2c54]/15 to-transparent rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
        </div>

        <div class="w-full relative z-10">
          <!-- Section Header -->
          <div class="text-center mb-16">
            <div class="inline-flex items-center space-x-4 mb-8">
              <div class="w-16 h-px bg-gradient-to-r from-transparent via-[#ecbc85] to-transparent"></div>
              <span class="text-[#ecbc85] font-bold text-lg uppercase tracking-[0.3em]">Get In Touch</span>
              <div class="w-16 h-px bg-gradient-to-r from-transparent via-[#ecbc85] to-transparent"></div>
            </div>
            <h2 class="text-4xl lg:text-5xl font-bold text-[#2c2c54] mb-6 leading-tight">
              Contact Our Team
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Ready to make this luxury development your new home? Our expert team is here to assist you every step of the way.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <!-- Contact Form -->
            <div class="relative">
              <!-- Decorative Elements -->
              <div class="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-[#ecbc85]/10 to-transparent rounded-full blur-2xl"></div>
              <div class="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-[#2c2c54]/10 to-transparent rounded-full blur-xl"></div>
              
              <div class="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 lg:p-10">
                <div class="mb-8">
                  <h3 class="text-2xl font-bold text-[#2c2c54] mb-3 flex items-center">
                    <Icon name="fa-solid:envelope" class="text-[#ecbc85] mr-3 text-xl" />
                    Send Us a Message
                  </h3>
                  <p class="text-gray-600 font-light">Fill out the form below and we'll get back to you within 24 hours.</p>
                </div>

                <form @submit.prevent="submitContactForm" class="space-y-6">
                  <!-- Name Fields -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="group">
                      <label class="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                      <div class="relative">
                        <input
                          v-model="contactForm.firstName"
                          type="text"
                          required
                          class="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#ecbc85] focus:ring-0 transition-colors duration-300 bg-gray-50 focus:bg-white"
                          placeholder="Enter your first name"
                        />
                        <div class="absolute inset-y-0 right-0 flex items-center pr-4">
                          <Icon name="fa-solid:user" class="text-gray-400 group-focus-within:text-[#ecbc85] transition-colors duration-300" />
                        </div>
                      </div>
                    </div>
                    
                    <div class="group">
                      <label class="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                      <div class="relative">
                        <input
                          v-model="contactForm.lastName"
                          type="text"
                          required
                          class="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#ecbc85] focus:ring-0 transition-colors duration-300 bg-gray-50 focus:bg-white"
                          placeholder="Enter your last name"
                        />
                        <div class="absolute inset-y-0 right-0 flex items-center pr-4">
                          <Icon name="fa-solid:user" class="text-gray-400 group-focus-within:text-[#ecbc85] transition-colors duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Email Field -->
                  <div class="group">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <div class="relative">
                      <input
                        v-model="contactForm.email"
                        type="email"
                        required
                        class="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#ecbc85] focus:ring-0 transition-colors duration-300 bg-gray-50 focus:bg-white"
                        placeholder="Enter your email address"
                      />
                      <div class="absolute inset-y-0 right-0 flex items-center pr-4">
                        <Icon name="fa-solid:envelope" class="text-gray-400 group-focus-within:text-[#ecbc85] transition-colors duration-300" />
                      </div>
                    </div>
                  </div>

                  <!-- Phone Field -->
                  <div class="group">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <div class="relative">
                      <input
                        v-model="contactForm.phone"
                        type="tel"
                        class="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#ecbc85] focus:ring-0 transition-colors duration-300 bg-gray-50 focus:bg-white"
                        placeholder="Enter your phone number"
                      />
                      <div class="absolute inset-y-0 right-0 flex items-center pr-4">
                        <Icon name="fa-solid:phone" class="text-gray-400 group-focus-within:text-[#ecbc85] transition-colors duration-300" />
                      </div>
                    </div>
                  </div>

                  <!-- Message Field -->
                  <div class="group">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                    <textarea
                      v-model="contactForm.message"
                      required
                      rows="5"
                      class="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#ecbc85] focus:ring-0 transition-colors duration-300 bg-gray-50 focus:bg-white resize-none"
                      placeholder="Tell us about your interest in this project..."
                    ></textarea>
                  </div>

                  <!-- Submit Button -->
                  <button
                    type="submit"
                    :disabled="submittingForm"
                    class="group relative w-full bg-gradient-to-r from-[#ecbc85] to-[#d4a574] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-[#ecbc85]/25 hover:scale-105 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                  >
                    <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span v-if="!submittingForm" class="relative z-10 flex items-center justify-center space-x-3">
                      <span>Send Message</span>
                      <Icon name="fa-solid:paper-plane" class="group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <span v-else class="relative z-10 flex items-center justify-center space-x-3">
                      <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </span>
                  </button>
                </form>
              </div>
            </div>

            <!-- Contact Information -->
            <div class="space-y-8">
              <!-- Contact Details -->
              <div class="bg-gradient-to-br from-[#2c2c54] to-[#1a1a3a] rounded-3xl p-8 lg:p-10 text-white relative overflow-hidden">
                <!-- Background Pattern -->
                <div class="absolute inset-0 opacity-10">
                  <div class="absolute top-0 right-0 w-32 h-32 bg-[#ecbc85] rounded-full blur-3xl"></div>
                  <div class="absolute bottom-0 left-0 w-24 h-24 bg-[#ecbc85] rounded-full blur-2xl"></div>
                </div>
                
                <div class="relative z-10">
                  <h3 class="text-2xl font-bold mb-8 flex items-center">
                    <Icon name="fa-solid:building" class="text-[#ecbc85] mr-3 text-xl" />
                    {{ project?.title || 'Luxury Development' }}
                  </h3>
                  
                  <div class="space-y-6">
                    <div class="flex items-start space-x-4">
                      <div class="w-12 h-12 bg-[#ecbc85]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name="fa-solid:map-marker-alt" class="text-[#ecbc85] text-lg" />
                      </div>
                      <div>
                        <h4 class="font-semibold mb-1">Project Location</h4>
                        <p class="text-white/80 leading-relaxed">{{ project?.location || 'Prime Location, Bangkok' }}</p>
                      </div>
                    </div>
                    
                    <div class="flex items-start space-x-4">
                      <div class="w-12 h-12 bg-[#ecbc85]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name="fa-solid:phone" class="text-[#ecbc85] text-lg" />
                      </div>
                      <div>
                        <h4 class="font-semibold mb-1">Sales Hotline</h4>
                        <p class="text-white/80">+66 2 XXX XXXX</p>
                        <p class="text-white/60 text-sm">Available 24/7</p>
                      </div>
                    </div>
                    
                    <div class="flex items-start space-x-4">
                      <div class="w-12 h-12 bg-[#ecbc85]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name="fa-solid:envelope" class="text-[#ecbc85] text-lg" />
                      </div>
                      <div>
                        <h4 class="font-semibold mb-1">Email Us</h4>
                        <p class="text-white/80">info@luxuryproject.com</p>
                        <p class="text-white/60 text-sm">We'll respond within 24 hours</p>
                      </div>
                    </div>
                    
                    <div class="flex items-start space-x-4">
                      <div class="w-12 h-12 bg-[#ecbc85]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name="fa-solid:clock" class="text-[#ecbc85] text-lg" />
                      </div>
                      <div>
                        <h4 class="font-semibold mb-1">Sales Office Hours</h4>
                        <p class="text-white/80">Monday - Sunday</p>
                        <p class="text-white/60 text-sm">9:00 AM - 8:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Why Choose Us -->
              <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-10">
                <h3 class="text-2xl font-bold text-[#2c2c54] mb-6 flex items-center">
                  <Icon name="fa-solid:star" class="text-[#ecbc85] mr-3 text-xl" />
                  Why Choose Us
                </h3>
                
                <div class="space-y-4">
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-[#ecbc85] rounded-full"></div>
                    <span class="text-gray-700 font-medium">Expert consultation and guidance</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-[#ecbc85] rounded-full"></div>
                    <span class="text-gray-700 font-medium">Flexible payment plans available</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-[#ecbc85] rounded-full"></div>
                    <span class="text-gray-700 font-medium">Exclusive pre-launch offers</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-[#ecbc85] rounded-full"></div>
                    <span class="text-gray-700 font-medium">Dedicated after-sales support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Interactive Maps Section -->
          <div class="mt-20">
            <!-- Header Section with Padding -->
            <div class="px-8">
              <div class="text-center mb-12">
                <h3 class="text-3xl font-bold text-[#2c2c54] mb-4 flex items-center justify-center">
                  <Icon name="fa-solid:map-marked-alt" class="text-[#ecbc85] mr-3 text-2xl" />
                  Project Location
                </h3>
                <p class="text-gray-600 font-light">Explore our prime location with interactive maps</p>
              </div>

              <!-- Map Controls -->
              <div class="flex items-center justify-between mb-6">
                <h4 class="text-xl font-bold text-[#2c2c54] flex items-center">
                  <Icon name="fa-brands:google" class="text-blue-600 mr-3 text-lg" />
                  Google Maps - Interactive Location
                </h4>
                
                <button
                  @click="openGoogleMaps()"
                  class="flex items-center space-x-2 text-[#ecbc85] hover:text-[#2c2c54] font-medium text-sm transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <Icon name="fa-solid:external-link-alt" class="text-xs" />
                </button>
              </div>
            </div>

            <!-- Full Width Map Display Area (No Card, No Padding) -->
            <div class="w-full">
              <div class="aspect-[21/9] relative">
                <!-- Google Maps -->
                <div class="w-full h-full">
                  <iframe
                    v-if="project?.coordinates?.lat && project?.coordinates?.lng"
                    :src="`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${project.coordinates.lat},${project.coordinates.lng}&zoom=15&maptype=roadmap`"
                    width="100%"
                    height="100%"
                    style="border:0;"
                    allowfullscreen
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    class="transition-all duration-500"
                  ></iframe>
                  
                  <!-- Google Maps Fallback -->
                  <div v-else class="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <div class="text-center">
                      <Icon name="fa-brands:google" class="text-4xl text-blue-400 mb-4" />
                      <p class="text-blue-600 font-medium text-lg">{{ project?.location || 'Location coordinates not available' }}</p>
                      <button
                        @click="openGoogleMaps"
                        class="mt-4 inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Icon name="fa-brands:google" />
                        <span>Search on Google Maps</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <Footer />
    </div>

    <!-- Mobile Bottom Bar -->
    <MobileBottomBar />

    <!-- Gallery Lightbox Modal -->
    <div
      v-if="lightboxOpen"
      class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      @click="closeLightbox"
    >
      <!-- Modal Content -->
      <div class="relative w-full h-full flex items-center justify-center p-4" @click.stop>
        <!-- Close Button -->
        <button
          @click="closeLightbox"
          class="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <Icon name="fa-solid:times" class="text-xl" />
        </button>

        <!-- Navigation Buttons -->
        <button
          v-if="filteredGalleryImages.length > 1"
          @click="previousImage"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <Icon name="fa-solid:chevron-left" class="text-xl" />
        </button>

        <button
          v-if="filteredGalleryImages.length > 1"
          @click="nextImage"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <Icon name="fa-solid:chevron-right" class="text-xl" />
        </button>

        <!-- Main Image -->
        <div class="max-w-6xl max-h-full flex items-center justify-center">
          <NuxtImg
            v-if="currentLightboxImage"
            :src="currentLightboxImage.url || currentLightboxImage.src"
            :alt="currentLightboxImage.alt || `Gallery image ${currentLightboxIndex + 1}`"
            class="max-w-full max-h-full object-contain rounded-lg"
            format="webp"
            quality="95"
          />
        </div>

        <!-- Image Counter -->
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
          {{ currentLightboxIndex + 1 }} / {{ filteredGalleryImages.length }}
        </div>

        <!-- Thumbnails -->
        <div class="absolute bottom-16 left-1/2 transform -translate-x-1/2 max-w-4xl overflow-x-auto">
          <div class="flex space-x-2 px-4">
            <div
              v-for="(image, index) in filteredGalleryImages"
              :key="index"
              class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-colors"
              :class="index === currentLightboxIndex ? 'border-[#ecbc85]' : 'border-transparent'"
              @click="currentLightboxIndex = index"
            >
              <NuxtImg
                :src="image.url || image.src"
                :alt="`Thumbnail ${index + 1}`"
                class="w-full h-full object-cover"
                format="webp"
                quality="60"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const project = ref<any>(null);
const loading = ref(true);

// UI State
const selectedUnit = ref(0);
const selectedUnitImage = ref(0);
const selectedGalleryTag = ref('all');
const activeTab = ref('facilities');

// Lightbox State
const lightboxOpen = ref(false);
const currentLightboxIndex = ref(0);

// Contact Form
const contactForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
});
const submittingForm = ref(false);

// Map API Keys (replace with your actual API keys)
const googleMapsApiKey = 'AIzaSyC2PxSAoZekJT872yb4zzDZ3P58cbZC0Wo';

// Scroll functionality
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

// Fetch project data
const loadProject = async () => {
  loading.value = true;
  try {
    const data: any = await $fetch(`/api/public/projects/${route.params.id}`);
    project.value = data;
    
    // Initialize UI state
    if (data.showUnits && data.showUnits.length > 0) {
      selectedUnit.value = 0;
      selectedUnitImage.value = 0;
    }
  } catch (error) {
    console.error('Failed to load project:', error);
    project.value = null;
  } finally {
    loading.value = false;
  }
};

// Gallery functionality
const galleryTags = computed(() => {
  if (!project.value?.gallery) return [];
  return [...new Set(project.value.gallery.map((item: any) => item.tag).filter(Boolean))] as string[];
});

const filteredGalleryImages = computed(() => {
  if (!project.value?.gallery) return [];
  
  let images: any[] = [];
  
  project.value.gallery.forEach((galleryItem: any) => {
    if (galleryItem.images && Array.isArray(galleryItem.images)) {
      galleryItem.images.forEach((image: any) => {
        images.push({
          url: image.url || image,
          src: image.url || image,
          alt: `${galleryItem.tag || 'Gallery'} image`,
          tag: galleryItem.tag,
        });
      });
    }
  });
  
  if (selectedGalleryTag.value === 'all') {
    return images;
  }
  
  return images.filter((image: any) => image.tag === selectedGalleryTag.value);
});

// Limited gallery images for preview (8 images max)
const limitedGalleryImages = computed(() => {
  return filteredGalleryImages.value.slice(0, 8);
});

// Current lightbox image
const currentLightboxImage = computed(() => {
  return filteredGalleryImages.value[currentLightboxIndex.value];
});

// Lightbox functionality
const openLightbox = (index: number) => {
  currentLightboxIndex.value = index;
  lightboxOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  lightboxOpen.value = false;
  document.body.style.overflow = 'auto';
};

const nextImage = () => {
  if (currentLightboxIndex.value < filteredGalleryImages.value.length - 1) {
    currentLightboxIndex.value++;
  } else {
    currentLightboxIndex.value = 0;
  }
};

const previousImage = () => {
  if (currentLightboxIndex.value > 0) {
    currentLightboxIndex.value--;
  } else {
    currentLightboxIndex.value = filteredGalleryImages.value.length - 1;
  }
};

// Keyboard navigation for lightbox
const handleKeydown = (event: KeyboardEvent) => {
  if (!lightboxOpen.value) return;
  
  switch (event.key) {
    case 'Escape':
      closeLightbox();
      break;
    case 'ArrowLeft':
      previousImage();
      break;
    case 'ArrowRight':
      nextImage();
      break;
  }
};

// Contact form submission
const submitContactForm = async () => {
  // Validate required fields
  if (!contactForm.value.firstName || !contactForm.value.lastName || !contactForm.value.email || !contactForm.value.message) {
    alert('Please fill in all required fields.');
    return;
  }

  submittingForm.value = true;
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        ...contactForm.value,
        projectId: route.params.id,
        projectTitle: project.value?.title,
        type: 'project_inquiry',
      },
    });
    
    // Reset form
    contactForm.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    };
    
    // Success notification
    alert('🎉 Thank you for your interest! Our team will contact you within 24 hours.');
  } catch (error: any) {
    console.error('Failed to submit contact form:', error);
    
    // Better error handling
    const errorMessage = error?.data?.message || error?.message || 'Failed to send message. Please try again.';
    alert(`❌ ${errorMessage}`);
  } finally {
    submittingForm.value = false;
  }
};

// Map functionality
const openGoogleMaps = () => {
  if (project.value?.coordinates?.lat && project.value?.coordinates?.lng) {
    const url = `https://www.google.com/maps?q=${project.value.coordinates.lat},${project.value.coordinates.lng}`;
    window.open(url, '_blank');
  } else if (project.value?.location) {
    // Fallback to search by location name
    const url = `https://www.google.com/maps/search/${encodeURIComponent(project.value.location)}`;
    window.open(url, '_blank');
  } else {
    alert('Location information not available');
  }
};



// Watch for unit selection changes
watch(selectedUnit, () => {
  selectedUnitImage.value = 0;
});

// Initialize
onMounted(() => {
  loadProject();
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = 'auto';
});

// SEO Meta
useHead(() => ({
  title: project.value ? `${project.value.title} - Real Estate Project` : 'Project Details',
  meta: [
    { 
      name: 'description', 
      content: project.value?.description || 'Discover this amazing real estate project with luxury amenities and prime location.' 
    },
    {
      property: 'og:title',
      content: project.value?.title || 'Real Estate Project'
    },
    {
      property: 'og:description',
      content: project.value?.description || 'Discover this amazing real estate project'
    },
    {
      property: 'og:image',
      content: project.value?.gallery?.[0]?.images?.[0]?.url || project.value?.image || '/images/default-project.jpg'
    },
    {
      property: 'og:type',
      content: 'website'
    },
  ],
}));
</script>

<style scoped>
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Fade in animation */
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover effects */
.hover-scale {
  transition: transform 0.3s ease;
}

.hover-scale:hover {
  transform: scale(1.05);
}

/* Form focus styles */
input:focus,
textarea:focus,
select:focus {
  box-shadow: 0 0 0 3px rgba(236, 188, 133, 0.1);
}

/* Button effects */
button {
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-1px);
}

/* Lightbox styles */
.lightbox-overlay {
  backdrop-filter: blur(10px);
}

/* Luxury Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes float-delayed {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(-3deg);
  }
}

@keyframes luxury-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(236, 188, 133, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(236, 188, 133, 0.6);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
  animation-delay: 2s;
}

/* Luxury Components */
.luxury-badge {
  position: relative;
  overflow: hidden;
}

.luxury-badge::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.luxury-badge:hover::before {
  left: 100%;
}

.luxury-title {
  text-shadow: 0 4px 20px rgba(44, 44, 84, 0.3);
  position: relative;
}

.luxury-button {
  position: relative;
  overflow: hidden;
  background-size: 200% 100%;
  animation: luxury-glow 3s ease-in-out infinite;
}

.luxury-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s;
}

.luxury-button:hover::before {
  left: 100%;
}

/* Hero Parallax Effect */
.hero-parallax {
  transform: translateZ(0);
  will-change: transform;
}

/* Premium Glass Effect */
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Luxury Border Gradient */
.border-gradient {
  position: relative;
  background: linear-gradient(white, white) padding-box,
              linear-gradient(45deg, #ecbc85, #2c2c54) border-box;
  border: 2px solid transparent;
}

/* Premium Hover Effects */
.premium-hover {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.premium-hover:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 50px rgba(44, 44, 84, 0.15);
}

/* Lightbox Enhancements */
.lightbox-overlay {
  backdrop-filter: blur(20px);
  background: rgba(0, 0, 0, 0.95);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .fade-in {
    animation-duration: 0.3s;
  }
  
  .luxury-title {
    font-size: 2.5rem;
  }
  
  .animate-float,
  .animate-float-delayed {
    animation-duration: 4s;
  }
  
  /* Mobile lightbox adjustments */
  .lightbox-overlay .absolute.bottom-16 {
    bottom: 8px;
  }
  
  .lightbox-overlay .w-16.h-16 {
    width: 3rem;
    height: 3rem;
  }
}

/* High-end Typography */
.luxury-text {
  font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1, 'pnum' 1, 'tnum' 0, 'onum' 1, 'lnum' 0, 'dlig' 1;
}
</style>