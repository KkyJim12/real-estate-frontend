<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <SiteNavigation />

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <Icon name="fa-solid:spinner" class="text-5xl text-gray-400 animate-spin mb-4" />
        <p class="text-gray-500 text-lg">Loading project...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="!project" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <Icon name="fa-solid:exclamation-circle" class="text-6xl text-red-400 mb-4" />
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Project Not Found</h2>
        <p class="text-gray-600 mb-8">The project you're looking for doesn't exist or has been removed.</p>
        <NuxtLink
          to="/"
          class="inline-flex items-center space-x-2 bg-[#36364e] text-white px-8 py-3 rounded-lg hover:bg-[#ecbc85] transition-colors duration-200"
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
        <div class="absolute inset-0">
          <NuxtImg
            :src="project.gallery?.[0]?.images?.[0]?.url || project.image || '/images/default-project.jpg'"
            :alt="project.title"
            class="w-full h-full object-cover"
            loading="eager"
            format="webp"
            quality="90"
          />
          <div class="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        
        <div class="relative z-10 flex items-center justify-center h-full">
          <div class="text-center text-white px-4">
            <h1 class="text-5xl md:text-7xl font-bold mb-4 tracking-wide">
              {{ project.title }}
            </h1>
            <p class="text-xl md:text-2xl font-light opacity-90">
              {{ project.developer }}
            </p>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <Icon name="fa-solid:chevron-down" class="text-2xl" />
        </div>
      </section>

      <!-- Concept Section -->
      <section class="py-20 bg-white">
        <div class="max-w-6xl mx-auto px-4 text-center">
          <h2 class="text-4xl font-bold text-gray-800 mb-8">CONCEPT</h2>
          <div class="max-w-4xl mx-auto">
            <p class="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
              {{ project.description }}
            </p>
          </div>
        </div>
      </section>

      <!-- Project Info Section with Tabs -->
      <section class="py-20 bg-[#2c2c54] text-white">
        <div class="max-w-6xl mx-auto px-4">
          <!-- Header -->
          <div class="text-center mb-16">
            <div class="flex items-center justify-center mb-6">
              <div class="h-px bg-[#ecbc85] flex-1 max-w-32"></div>
              <h2 class="text-4xl font-bold mx-8">PROJECT INFO</h2>
              <div class="h-px bg-[#ecbc85] flex-1 max-w-32"></div>
            </div>
            <p class="text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Pattaya may be a seaside destination, but EMERALD BAY offers you so much more,
              with complete facilities included in the project, you can relax more than ever before.
            </p>
          </div>

          <!-- Tabs Navigation -->
          <div class="flex justify-center mb-12">
            <div class="flex space-x-8 border-b border-gray-600">
              <button
                @click="activeTab = 'facilities'"
                :class="[
                  'pb-4 px-2 font-medium text-sm uppercase tracking-wider transition-colors relative',
                  activeTab === 'facilities'
                    ? 'text-[#ecbc85] border-b-2 border-[#ecbc85]'
                    : 'text-gray-300 hover:text-white'
                ]"
              >
                Facilities
              </button>
              <button
                @click="activeTab = 'neighbourhood'"
                :class="[
                  'pb-4 px-2 font-medium text-sm uppercase tracking-wider transition-colors relative',
                  activeTab === 'neighbourhood'
                    ? 'text-[#ecbc85] border-b-2 border-[#ecbc85]'
                    : 'text-gray-300 hover:text-white'
                ]"
              >
                Neighbourhood
              </button>
              <button
                @click="activeTab = 'factsheet'"
                :class="[
                  'pb-4 px-2 font-medium text-sm uppercase tracking-wider transition-colors relative',
                  activeTab === 'factsheet'
                    ? 'text-[#ecbc85] border-b-2 border-[#ecbc85]'
                    : 'text-gray-300 hover:text-white'
                ]"
              >
                Factsheet
              </button>
            </div>
          </div>

          <!-- Tab Content -->
          <div class="min-h-96">
            <!-- Facilities Tab -->
            <div v-show="activeTab === 'facilities'" class="fade-in">
              <div class="grid grid-cols-2 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
                <!-- The Club House -->
                <div class="text-center">
                  <div class="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.16.21 2.76.21 3.91 0C20.16 27 24 22.55 24 17V7l-10-5z"/>
                      <path d="M8 11h8v2H8v-2zm0 4h8v2H8v-2z"/>
                    </svg>
                  </div>
                  <h3 class="text-lg font-medium">The Club House</h3>
                </div>

                <!-- The Aqua Based Design -->
                <div class="text-center">
                  <div class="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </div>
                  <h3 class="text-lg font-medium">The Aqua Based Design</h3>
                </div>

                <!-- 4 Story Low-Rise -->
                <div class="text-center">
                  <div class="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <h3 class="text-lg font-medium">4 Story Low-Rise</h3>
                </div>

                <!-- Fitness -->
                <div class="text-center">
                  <div class="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z"/>
                    </svg>
                  </div>
                  <h3 class="text-lg font-medium">Fitness</h3>
                </div>

                <!-- Basketball Court -->
                <div class="text-center">
                  <div class="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </div>
                  <h3 class="text-lg font-medium">Basketball Court</h3>
                </div>

                <!-- Park -->
                <div class="text-center">
                  <div class="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66C7.71 17.33 9.73 12.2 18 10c-1.33-1.33-2.67-2.67-4-4 2.67 0 5.33.67 8 2-2.67-2.67-5.33-4-8-4z"/>
                      <path d="M12 2L8 6h8l-4-4z"/>
                    </svg>
                  </div>
                  <h3 class="text-lg font-medium">Park</h3>
                </div>
              </div>
            </div>

            <!-- Neighbourhood Tab -->
            <div v-show="activeTab === 'neighbourhood'" class="fade-in">
              <div class="max-w-4xl mx-auto">
                <div v-if="project.neighborhoods && project.neighborhoods.length" class="space-y-6">
                  <div class="text-center mb-12">
                    <h3 class="text-2xl font-bold mb-4">Nearby Areas</h3>
                    <p class="text-gray-300">Discover the convenience of our prime location</p>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                      v-for="neighborhood in project.neighborhoods"
                      :key="neighborhood.name"
                      class="bg-white bg-opacity-10 rounded-lg p-6 hover:bg-opacity-20 transition-colors"
                    >
                      <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 bg-[#ecbc85] rounded-full flex items-center justify-center">
                          <Icon name="fa-solid:location-dot" class="text-white" />
                        </div>
                        <div>
                          <h4 class="font-semibold text-lg">{{ neighborhood.name }}</h4>
                          <p v-if="neighborhood.number" class="text-gray-300 text-sm">{{ neighborhood.number }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div v-else class="text-center py-12">
                  <Icon name="fa-solid:map-marker-alt" class="text-4xl text-gray-400 mb-4" />
                  <p class="text-gray-300">Neighborhood information will be available soon</p>
                </div>
              </div>
            </div>

            <!-- Factsheet Tab -->
            <div v-show="activeTab === 'factsheet'" class="fade-in">
              <div class="max-w-4xl mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <!-- Project Details -->
                  <div class="space-y-6">
                    <h3 class="text-2xl font-bold mb-6 text-[#ecbc85]">Project Details</h3>
                    
                    <div class="space-y-4">
                      <div class="flex justify-between items-center py-3 border-b border-gray-600">
                        <span class="text-gray-300">Project Name</span>
                        <span class="font-medium">{{ project.title }}</span>
                      </div>
                      
                      <div class="flex justify-between items-center py-3 border-b border-gray-600">
                        <span class="text-gray-300">Developer</span>
                        <span class="font-medium">{{ project.developer || 'N/A' }}</span>
                      </div>
                      
                      <div class="flex justify-between items-center py-3 border-b border-gray-600">
                        <span class="text-gray-300">Project Location</span>
                        <span class="font-medium">{{ project.location || 'N/A' }}</span>
                      </div>
                      
                      <div class="flex justify-between items-center py-3 border-b border-gray-600">
                        <span class="text-gray-300">Project Area</span>
                        <span class="font-medium">{{ project.area || 'N/A' }}</span>
                      </div>
                      
                      <div class="flex justify-between items-center py-3 border-b border-gray-600">
                        <span class="text-gray-300">Project Type</span>
                        <span class="font-medium capitalize">{{ project.projectType || 'N/A' }}</span>
                      </div>
                      
                      <div class="flex justify-between items-center py-3 border-b border-gray-600">
                        <span class="text-gray-300">Ownership Type</span>
                        <span class="font-medium capitalize">{{ project.ownershipType || 'N/A' }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Construction Details -->
                  <div class="space-y-6">
                    <h3 class="text-2xl font-bold mb-6 text-[#ecbc85]">Construction Info</h3>
                    
                    <div class="space-y-4">
                      <div class="flex justify-between items-center py-3 border-b border-gray-600">
                        <span class="text-gray-300">Construction Period</span>
                        <span class="font-medium">{{ project.constructionPeriod || 'N/A' }}</span>
                      </div>
                      
                      <div class="flex justify-between items-center py-3 border-b border-gray-600">
                        <span class="text-gray-300">Expected Finish</span>
                        <span class="font-medium">{{ project.expectedFinish || 'N/A' }}</span>
                      </div>
                      
                      <div class="flex justify-between items-center py-3 border-b border-gray-600">
                        <span class="text-gray-300">Number of Floors</span>
                        <span class="font-medium">{{ project.floors || 'N/A' }}</span>
                      </div>
                      
                      <div class="flex justify-between items-center py-3 border-b border-gray-600">
                        <span class="text-gray-300">Number of Units</span>
                        <span class="font-medium">{{ project.units || 'N/A' }}</span>
                      </div>
                      
                      <div class="flex justify-between items-start py-3 border-b border-gray-600">
                        <span class="text-gray-300">Room Types</span>
                        <div class="text-right">
                          <div v-if="project.showUnits && project.showUnits.length" class="space-y-1">
                            <div
                              v-for="unit in project.showUnits"
                              :key="unit.roomType"
                              class="font-medium capitalize"
                            >
                              {{ unit.roomType?.replace('br', ' Bedroom') || 'Unit' }}
                            </div>
                          </div>
                          <span v-else class="font-medium">N/A</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Brochure Download -->
                <div v-if="project.brochure" class="mt-12 text-center">
                  <div class="bg-white bg-opacity-10 rounded-lg p-8">
                    <Icon name="fa-solid:file-pdf" class="text-4xl text-[#ecbc85] mb-4" />
                    <h4 class="text-xl font-bold mb-2">Project Brochure</h4>
                    <p class="text-gray-300 mb-6">Download detailed information about this project</p>
                    <a
                      :href="project.brochure.url || project.brochure.data"
                      :download="project.brochure.name"
                      class="inline-flex items-center space-x-2 bg-[#ecbc85] text-white px-6 py-3 rounded-lg hover:bg-[#d4a574] transition-colors"
                    >
                      <Icon name="fa-solid:download" />
                      <span>Download Brochure</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Show Units Section -->
      <section v-if="project.showUnits && project.showUnits.length" class="py-20 bg-gray-50">
        <div class="max-w-6xl mx-auto px-4">
          <h2 class="text-4xl font-bold text-center text-gray-800 mb-16">SHOW UNIT</h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Unit Types List -->
            <div>
              <h3 class="text-2xl font-bold text-gray-800 mb-8">Unit Types</h3>
              <div class="space-y-6">
                <div
                  v-for="(unit, index) in project.showUnits"
                  :key="index"
                  class="bg-white rounded-lg p-6 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                  @click="selectedUnit = index"
                  :class="{ 'ring-2 ring-[#ecbc85]': selectedUnit === index }"
                >
                  <h4 class="text-xl font-semibold text-gray-800 mb-2 capitalize">
                    {{ unit.roomType?.replace('br', ' Bedroom') || 'Unit Type' }}
                  </h4>
                  <p class="text-gray-600 text-sm">{{ unit.description }}</p>
                </div>
              </div>
            </div>

            <!-- Unit Images -->
            <div>
              <div v-if="project.showUnits[selectedUnit]?.images?.length" class="space-y-4">
                <div class="aspect-video rounded-lg overflow-hidden">
                  <NuxtImg
                    :src="project.showUnits[selectedUnit].images[selectedUnitImage]?.url || project.showUnits[selectedUnit].images[selectedUnitImage]"
                    :alt="`${project.showUnits[selectedUnit].roomType} unit`"
                    class="w-full h-full object-cover"
                    format="webp"
                    quality="85"
                  />
                </div>
                
                <!-- Image Thumbnails -->
                <div class="grid grid-cols-4 gap-2">
                  <div
                    v-for="(image, imgIndex) in project.showUnits[selectedUnit].images"
                    :key="imgIndex"
                    class="aspect-square rounded-lg overflow-hidden cursor-pointer"
                    :class="{ 'ring-2 ring-[#ecbc85]': selectedUnitImage === imgIndex }"
                    @click="selectedUnitImage = imgIndex"
                  >
                    <NuxtImg
                      :src="image?.url || image"
                      :alt="`Unit image ${imgIndex + 1}`"
                      class="w-full h-full object-cover"
                      format="webp"
                      quality="70"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Gallery Section -->
      <section v-if="project.gallery && project.gallery.length" class="py-20 bg-[#2c2c54]">
        <div class="max-w-7xl mx-auto px-4">
          <h2 class="text-4xl font-bold text-center text-white mb-16">GALLERY</h2>
          
          <!-- Gallery Filter -->
          <div class="flex flex-wrap justify-center gap-4 mb-12">
            <button
              @click="selectedGalleryTag = 'all'"
              :class="[
                'px-6 py-2 rounded-full font-medium transition-colors',
                selectedGalleryTag === 'all'
                  ? 'bg-[#ecbc85] text-white'
                  : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
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
                  : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
              ]"
            >
              {{ tag }}
            </button>
          </div>

          <!-- Gallery Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(image, index) in filteredGalleryImages"
              :key="index"
              class="aspect-square rounded-lg overflow-hidden cursor-pointer group"
              @click="openLightbox(image, index)"
            >
              <NuxtImg
                :src="image.url || image.src"
                :alt="image.alt || `Gallery image ${index + 1}`"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                format="webp"
                quality="80"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Form Section -->
      <section class="py-20 bg-white">
        <div class="max-w-6xl mx-auto px-4">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <!-- Contact Form -->
            <div>
              <h2 class="text-4xl font-bold text-gray-800 mb-8">REGISTER FOR SPECIAL PRIVILEGE</h2>
              
              <form @submit.prevent="submitContactForm" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      v-model="contactForm.firstName"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
                      placeholder="Your first name"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      v-model="contactForm.lastName"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    v-model="contactForm.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    v-model="contactForm.phone"
                    type="tel"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition"
                    placeholder="+66 XX XXX XXXX"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    v-model="contactForm.message"
                    rows="4"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ecbc85] focus:border-transparent outline-none transition resize-none"
                    placeholder="Tell us about your interest in this project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  :disabled="submittingForm"
                  class="w-full bg-[#2c2c54] text-white py-4 rounded-lg font-semibold hover:bg-[#ecbc85] transition-colors duration-200 disabled:opacity-50"
                >
                  <span v-if="submittingForm">Sending...</span>
                  <span v-else>Send Message</span>
                </button>
              </form>
            </div>

            <!-- Contact Image -->
            <div class="hidden lg:block">
              <NuxtImg
                :src="project.gallery?.[0]?.images?.[0]?.url || project.image || '/images/contact-image.jpg'"
                alt="Contact us"
                class="w-full h-96 object-cover rounded-lg shadow-lg"
                format="webp"
                quality="85"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Location Section -->
      <section v-if="project.coordinates?.lat && project.coordinates?.lng" class="py-20 bg-gray-50">
        <div class="max-w-6xl mx-auto px-4">
          <h2 class="text-4xl font-bold text-center text-gray-800 mb-16">LOCATION</h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Location Info -->
            <div>
              <h3 class="text-2xl font-bold text-gray-800 mb-6">Project Location</h3>
              <div class="space-y-4">
                <div class="flex items-start space-x-3">
                  <Icon name="fa-solid:map-marker-alt" class="text-[#ecbc85] mt-1" />
                  <div>
                    <h4 class="font-semibold text-gray-800">Address</h4>
                    <p class="text-gray-600">{{ project.location }}</p>
                  </div>
                </div>

                <div v-if="project.neighborhoods && project.neighborhoods.length" class="space-y-2">
                  <h4 class="font-semibold text-gray-800">Nearby Areas</h4>
                  <div class="space-y-1">
                    <div
                      v-for="neighborhood in project.neighborhoods"
                      :key="neighborhood.name"
                      class="flex items-center space-x-2 text-gray-600"
                    >
                      <Icon name="fa-solid:location-dot" class="text-[#ecbc85] text-sm" />
                      <span>{{ neighborhood.name }}</span>
                      <span v-if="neighborhood.number" class="text-sm text-gray-500">({{ neighborhood.number }})</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Map Provider Buttons -->
              <div class="mt-8 flex gap-4">
                <button
                  @click="openGoogleMaps"
                  class="flex items-center space-x-2 bg-[#4285f4] text-white px-6 py-3 rounded-lg hover:bg-[#3367d6] transition-colors"
                >
                  <Icon name="fa-solid:map" />
                  <span>Google Maps</span>
                </button>
                <button
                  @click="openBaiduMaps"
                  class="flex items-center space-x-2 bg-[#38f] text-white px-6 py-3 rounded-lg hover:bg-[#2d7ce6] transition-colors"
                >
                  <Icon name="fa-solid:map-marked-alt" />
                  <span>Baidu Maps</span>
                </button>
              </div>
            </div>

            <!-- Map Preview -->
            <div class="h-96 bg-gray-200 rounded-lg overflow-hidden">
              <div class="w-full h-full flex items-center justify-center text-gray-500">
                <div class="text-center">
                  <Icon name="fa-solid:map" class="text-4xl mb-4" />
                  <p class="font-medium">Interactive Map</p>
                  <p class="text-sm">Lat: {{ project.coordinates.lat }}, Lng: {{ project.coordinates.lng }}</p>
                  <p class="text-xs mt-2">Map integration will be implemented</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>

    <!-- Mobile Bottom Bar -->
    <MobileBottomBar />
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

// Contact Form
const contactForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
});
const submittingForm = ref(false);

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

// Lightbox functionality
const openLightbox = (image: any, index: number) => {
  // In a real implementation, you would open a lightbox/modal here
  console.log('Open lightbox for image:', image, 'at index:', index);
  // You can integrate with a lightbox library like vue-easy-lightbox
};

// Contact form submission
const submitContactForm = async () => {
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
    
    alert('Thank you for your interest! We will contact you soon.');
  } catch (error) {
    console.error('Failed to submit contact form:', error);
    alert('Failed to send message. Please try again.');
  } finally {
    submittingForm.value = false;
  }
};

// Map functionality
const openGoogleMaps = () => {
  if (project.value?.coordinates?.lat && project.value?.coordinates?.lng) {
    const url = `https://www.google.com/maps?q=${project.value.coordinates.lat},${project.value.coordinates.lng}`;
    window.open(url, '_blank');
  }
};

const openBaiduMaps = () => {
  if (project.value?.coordinates?.lat && project.value?.coordinates?.lng) {
    const url = `https://map.baidu.com/?q=${project.value.coordinates.lat},${project.value.coordinates.lng}`;
    window.open(url, '_blank');
  }
};

// Watch for unit selection changes
watch(selectedUnit, () => {
  selectedUnitImage.value = 0; // Reset to first image when unit changes
});

// Initialize
onMounted(() => {
  loadProject();
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

/* Custom scrollbar for gallery */
.gallery-scroll::-webkit-scrollbar {
  height: 8px;
}

.gallery-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.gallery-scroll::-webkit-scrollbar-thumb {
  background: #ecbc85;
  border-radius: 4px;
}

.gallery-scroll::-webkit-scrollbar-thumb:hover {
  background: #d4a574;
}

/* Animation for hero section */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.8s ease-out;
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

/* Button hover effects */
.btn-primary {
  background: linear-gradient(135deg, #2c2c54 0%, #ecbc85 100%);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(44, 44, 84, 0.3);
}

/* Tab animations */
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

/* Tab styling */
.tab-button {
  position: relative;
  transition: all 0.3s ease;
}

.tab-button::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: #ecbc85;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.tab-button.active::after {
  transform: scaleX(1);
}

/* Facility icons hover effect */
.facility-icon {
  transition: transform 0.3s ease;
}

.facility-icon:hover {
  transform: translateY(-5px);
}

/* Gallery grid responsive */
@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}

/* Responsive tabs */
@media (max-width: 640px) {
  .tab-navigation {
    flex-direction: column;
    space-y: 2;
  }
  
  .tab-button {
    width: 100%;
    text-align: center;
    padding: 12px 0;
  }
}
</style>