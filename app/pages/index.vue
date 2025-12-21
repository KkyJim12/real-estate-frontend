<template>
  <!-- Navigation -->
  <SiteNavigation />

  <!-- Ultra-Modern Hero Carousel -->
  <div class="w-full relative overflow-hidden">
    <!-- Sophisticated Loading State -->
    <div
      v-if="loading"
      class="w-full h-screen bg-gradient-to-br from-[#1d1d39] via-[#2c2c54] to-[#1d1d39] flex items-center justify-center relative"
    >
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 opacity-20">
        <div
          class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-[#ecbc85]/30 to-transparent rounded-full blur-3xl animate-pulse"
        ></div>
        <div
          class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-[#ecbc85]/20 to-transparent rounded-full blur-3xl animate-pulse"
          style="animation-delay: 1s"
        ></div>
      </div>
      <div class="relative z-10 flex flex-col items-center">
        <div class="relative mb-8">
          <div
            class="w-24 h-24 border-4 border-[#ecbc85]/20 rounded-full animate-spin"
          ></div>
          <div
            class="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-[#ecbc85] rounded-full animate-spin"
            style="animation-duration: 1.5s"
          ></div>
        </div>
        <p class="text-white/90 text-2xl font-light tracking-[0.2em] uppercase">
          {{ $t("carousel.loading") }}
        </p>
        <div class="mt-4 flex justify-center space-x-2">
          <div class="w-2 h-2 bg-[#ecbc85] rounded-full animate-bounce"></div>
          <div
            class="w-2 h-2 bg-[#ecbc85] rounded-full animate-bounce"
            style="animation-delay: 0.1s"
          ></div>
          <div
            class="w-2 h-2 bg-[#ecbc85] rounded-full animate-bounce"
            style="animation-delay: 0.2s"
          ></div>
        </div>
      </div>
    </div>

    <!-- Ultra-Premium Luxury Carousel -->
    <UCarousel
      v-else-if="carouselSlides.length > 0"
      v-slot="{ item, index }"
      :items="carouselSlides"
      loop
      :autoplay="{ delay: 6000 }"
      arrows
      dots
      class="w-full h-screen overflow-hidden"
      :ui="{
        root: 'relative w-full h-full',
        viewport: 'w-full h-full overflow-hidden',
        container: 'flex h-full w-full',
        item: 'min-w-full h-full flex-shrink-0',
        dots: 'absolute bottom-12 left-0 right-0 flex justify-center space-x-4 z-30',
        dot: 'h-3 w-16 rounded-full bg-white/20 data-[state=active]:bg-[#ddac7c] transition-all duration-700 hover:bg-white/40 cursor-pointer',
        arrows: 'absolute inset-y-0 flex items-center z-30'
      }"
    >
      <div class="w-full h-full relative group overflow-hidden">
        <!-- Ultra-Luxury Hero Image -->
        <NuxtImg
          :src="item.image"
          alt="Luxury Development"
          class="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[12s] ease-out"
          loading="lazy"
          format="webp"
          quality="95"
        />

        <!-- Multi-Layer Sophisticated Overlay System -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-[#1d1d39]/80 via-[#2c2c54]/60 to-[#1d1d39]/80"
        ></div>
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"
        ></div>
        <div
          class="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"
        ></div>

        <!-- Premium Pattern Overlay -->
        <div
          class="absolute inset-0 opacity-15"
          style="
            background-image: radial-gradient(
                circle at 20% 20%,
                #ecbc85 1.5px,
                transparent 1.5px
              ),
              radial-gradient(circle at 80% 80%, #ecbc85 1px, transparent 1px),
              radial-gradient(
                circle at 40% 60%,
                rgba(236, 188, 133, 0.3) 0.5px,
                transparent 0.5px
              );
            background-size: 150px 150px, 100px 100px, 200px 200px;
          "
        ></div>

        <!-- Floating Luxury Elements -->
        <div
          class="absolute top-32 left-16 w-40 h-40 bg-gradient-to-br from-[#ecbc85]/15 to-transparent rounded-full blur-3xl animate-float-slow"
        ></div>
        <div
          class="absolute bottom-40 right-20 w-32 h-32 bg-gradient-to-tl from-white/8 to-transparent rounded-full blur-2xl animate-float-delayed-slow"
        ></div>
        <div
          class="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-[#ecbc85]/10 to-transparent rounded-full blur-xl animate-float-reverse"
        ></div>

        <!-- Premium Content Overlay -->
        <div class="absolute inset-0 flex items-center justify-center z-20">
          <div class="text-center text-white max-w-7xl mx-auto px-8">
            <!-- Ultra-Luxury Badge -->
            <div
              class="inline-flex items-center space-x-3 bg-white/8 backdrop-blur-xl border border-white/20 rounded-full px-8 py-4 mb-8 luxury-badge-premium shadow-2xl"
            >
              <div class="relative">
                <div
                  class="w-3 h-3 bg-gradient-to-r from-[#ecbc85] to-[#d4a574] rounded-full animate-pulse"
                ></div>
                <div
                  class="absolute inset-0 w-3 h-3 bg-gradient-to-r from-[#ecbc85] to-[#d4a574] rounded-full animate-ping opacity-30"
                ></div>
              </div>
              <span
                class="text-sm font-bold tracking-[0.3em] uppercase text-[#ecbc85] luxury-text"
                >Luxury Development</span
              >
              <div
                class="w-px h-6 bg-gradient-to-b from-transparent via-white/40 to-transparent"
              ></div>
              <span
                class="text-xs text-white/90 uppercase tracking-[0.2em] font-light"
                >Premium Collection</span
              >
            </div>

            <!-- Dynamic Ultra-Luxury Typography -->
            <div class="mb-8">
              <h1
                class="text-3xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight luxury-title-premium"
              >
                <span
                  class="bg-gradient-to-r from-white via-[#ecbc85] to-white bg-clip-text text-transparent drop-shadow-2xl"
                >
                  {{ item.title || "Emerald Bay" }}
                </span>
              </h1>
              <p
                class="text-white/95 text-lg md:text-xl lg:text-2xl font-light tracking-wide luxury-subtitle max-w-4xl mx-auto"
              >
                {{ item.description || "Where Luxury Meets Excellence" }}
              </p>
            </div>

            <!-- Elegant Diamond Separator -->
            <div class="flex items-center justify-center mb-8">
              <div
                class="h-px bg-gradient-to-r from-transparent via-[#ecbc85] to-transparent w-24"
              ></div>
              <div class="mx-6 relative">
                <div class="w-3 h-3 bg-[#ecbc85] rotate-45 shadow-lg"></div>
                <div
                  class="absolute inset-0 w-3 h-3 bg-gradient-to-br from-[#ecbc85] to-[#d4a574] rotate-45 animate-pulse"
                ></div>
              </div>
              <div
                class="h-px bg-gradient-to-r from-transparent via-[#ecbc85] to-transparent w-24"
              ></div>
            </div>

            <!-- Ultra-Premium CTA Buttons -->
            <div
              class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <NuxtLink
                to="/projects"
                class="group relative bg-gradient-to-r from-[#ecbc85] via-[#d4a574] to-[#ecbc85] text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-[#ecbc85]/30 hover:scale-105 transition-all duration-500 luxury-button-premium overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                ></div>
                <span class="relative z-10 flex items-center space-x-3">
                  <span class="tracking-wide">Explore Projects</span>
                  <Icon
                    name="fa-solid:arrow-right"
                    class="group-hover:translate-x-2 transition-transform duration-300"
                  />
                </span>
              </NuxtLink>

              <button
                v-if="item.videoLink"
                @click="openVideo(item.videoLink)"
                class="group cursor-pointer relative bg-white/8 backdrop-blur-xl border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/15 hover:border-[#ecbc85]/60 transition-all duration-500 overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-transparent via-[#ecbc85]/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                ></div>
                <span class="relative z-10 flex items-center space-x-3">
                  <Icon
                    name="fa-solid:play"
                    class="group-hover:scale-125 transition-transform duration-300"
                  />
                  <span class="tracking-wide">Watch Video</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </UCarousel>

    <!-- Ultra-Luxury Empty State -->
    <div
      v-else
      class="w-full h-screen bg-gradient-to-br from-[#1d1d39] via-[#2c2c54] to-[#1d1d39] flex items-center justify-center relative overflow-hidden"
    >
      <!-- Background Elements -->
      <div class="absolute inset-0 opacity-10">
        <div
          class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-[#ecbc85]/30 to-transparent rounded-full blur-3xl animate-pulse"
        ></div>
        <div
          class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-[#ecbc85]/20 to-transparent rounded-full blur-3xl animate-pulse"
          style="animation-delay: 1s"
        ></div>
      </div>
      <div class="text-center px-8 relative z-10">
        <div class="relative mb-12">
          <div
            class="w-32 h-32 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl"
          >
            <Icon name="fa-solid:images" class="text-5xl text-white/70" />
          </div>
          <div
            class="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#ecbc85] to-[#d4a574] rounded-full flex items-center justify-center"
          >
            <Icon name="fa-solid:plus" class="text-white text-sm" />
          </div>
        </div>
        <h3 class="text-white/90 text-3xl font-light tracking-wide mb-4">
          {{ $t("carousel.noSlides") }}
        </h3>
        <p class="text-white/60 text-lg font-light">
          Premium content will be displayed here
        </p>
      </div>
    </div>
  </div>

  <!-- Modern About Us Section -->
  <section
    class="py-24 bg-gradient-to-br from-white via-gray-50/30 to-white relative overflow-hidden"
  >
    <!-- Enhanced Background Elements -->
    <div class="absolute inset-0 opacity-15">
      <div
        class="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#ecbc85]/15 to-transparent rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tl from-[#1d1d39]/10 to-transparent rounded-full blur-3xl animate-pulse"
        style="animation-delay: 1s"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-[#2c2c54]/8 to-transparent rounded-full blur-3xl animate-pulse"
        style="animation-delay: 2s"
      ></div>
    </div>

    <div class="max-w-7xl mx-auto px-8 relative z-10">
      <!-- Enhanced Header -->
      <div class="text-center mb-16">
        <!-- Premium Badge -->
        <div class="inline-flex items-center space-x-4 mb-8">
          <div
            class="w-20 h-px bg-gradient-to-r from-transparent via-[#ecbc85] to-transparent"
          ></div>
          <div
            class="bg-gradient-to-r from-[#ecbc85]/10 to-[#d4a574]/10 backdrop-blur-sm border border-[#ecbc85]/20 rounded-full px-6 py-3"
          >
            <span
              class="text-[#ecbc85] font-bold text-sm uppercase tracking-[0.3em]"
              >About Us</span
            >
          </div>
          <div
            class="w-20 h-px bg-gradient-to-r from-transparent via-[#ecbc85] to-transparent"
          ></div>
        </div>

        <!-- Main Title -->
        <h2
          class="text-4xl lg:text-5xl font-bold text-[#2c2c54] mb-6 leading-tight"
        >
          Crafting Luxury Living Experiences
        </h2>

        <!-- Subtitle -->
        <p
          class="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Where architectural excellence meets uncompromising quality and
          timeless design
        </p>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <!-- Vision Card -->
        <div
          class="group bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-8 hover:bg-white hover:border-[#ecbc85]/30 hover:shadow-2xl hover:shadow-[#ecbc85]/10 transition-all duration-500"
        >
          <div class="text-center">
            <div
              class="w-16 h-16 bg-gradient-to-br from-[#ecbc85] to-[#d4a574] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <Icon name="fa-solid:eye" class="text-2xl text-white" />
            </div>
            <h3
              class="text-2xl font-bold text-[#2c2c54] mb-4 group-hover:text-[#ecbc85] transition-colors duration-300"
            >
              Our Vision
            </h3>
            <p class="text-gray-600 font-light leading-relaxed">
              To redefine luxury living by creating exceptional developments
              that blend innovative design with sustainable practices, setting
              new standards in premium real estate.
            </p>
          </div>
        </div>

        <!-- Mission Card -->
        <div
          class="group bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-8 hover:bg-white hover:border-[#ecbc85]/30 hover:shadow-2xl hover:shadow-[#ecbc85]/10 transition-all duration-500"
        >
          <div class="text-center">
            <div
              class="w-16 h-16 bg-gradient-to-br from-[#2c2c54] to-[#1d1d39] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <Icon name="fa-solid:bullseye" class="text-2xl text-[#ecbc85]" />
            </div>
            <h3
              class="text-2xl font-bold text-[#2c2c54] mb-4 group-hover:text-[#ecbc85] transition-colors duration-300"
            >
              Our Mission
            </h3>
            <p class="text-gray-600 font-light leading-relaxed">
              Delivering world-class residential and commercial projects that
              exceed expectations through meticulous attention to detail,
              premium materials, and exceptional craftsmanship.
            </p>
          </div>
        </div>

        <!-- Values Card -->
        <div
          class="group bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-8 hover:bg-white hover:border-[#ecbc85]/30 hover:shadow-2xl hover:shadow-[#ecbc85]/10 transition-all duration-500"
        >
          <div class="text-center">
            <div
              class="w-16 h-16 bg-gradient-to-br from-[#ecbc85]/80 to-[#2c2c54] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <Icon name="fa-solid:gem" class="text-2xl text-white" />
            </div>
            <h3
              class="text-2xl font-bold text-[#2c2c54] mb-4 group-hover:text-[#ecbc85] transition-colors duration-300"
            >
              Our Values
            </h3>
            <p class="text-gray-600 font-light leading-relaxed">
              Excellence, integrity, and innovation guide every decision we
              make. We believe in creating lasting relationships built on trust,
              transparency, and unparalleled service quality.
            </p>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div
        class="bg-gradient-to-r from-[#1d1d39] via-[#2c2c54] to-[#1d1d39] rounded-3xl p-8 lg:p-12"
      >
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div class="group">
            <div
              class="text-3xl lg:text-4xl font-bold text-[#ecbc85] mb-2 group-hover:scale-110 transition-transform duration-300"
            >
              15+
            </div>
            <p class="text-white/80 font-light text-sm lg:text-base">
              Years of Excellence
            </p>
          </div>
          <div class="group">
            <div
              class="text-3xl lg:text-4xl font-bold text-[#ecbc85] mb-2 group-hover:scale-110 transition-transform duration-300"
            >
              50+
            </div>
            <p class="text-white/80 font-light text-sm lg:text-base">
              Premium Projects
            </p>
          </div>
          <div class="group">
            <div
              class="text-3xl lg:text-4xl font-bold text-[#ecbc85] mb-2 group-hover:scale-110 transition-transform duration-300"
            >
              1000+
            </div>
            <p class="text-white/80 font-light text-sm lg:text-base">
              Happy Families
            </p>
          </div>
          <div class="group">
            <div
              class="text-3xl lg:text-4xl font-bold text-[#ecbc85] mb-2 group-hover:scale-110 transition-transform duration-300"
            >
              25+
            </div>
            <p class="text-white/80 font-light text-sm lg:text-base">
              Awards Won
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Compact Modern Projects Section -->
  <section
    class="py-24 bg-gradient-to-br from-[#1d1d39] via-[#2c2c54] to-[#1d1d39] relative overflow-hidden"
  >
    <!-- Subtle Background Elements -->
    <div class="absolute inset-0 opacity-10">
      <div
        class="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-[#ecbc85]/20 to-transparent rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-20 left-20 w-60 h-60 bg-gradient-to-tl from-[#2c2c54]/30 to-transparent rounded-full blur-3xl"
      ></div>
    </div>

    <div class="max-w-6xl mx-auto px-0 relative z-10">
      <!-- Compact Header -->
      <div class="text-center mb-16">
        <!-- Simple Badge -->
        <div class="inline-flex items-center space-x-4 mb-8">
          <div
            class="w-16 h-px bg-gradient-to-r from-transparent via-[#ecbc85] to-transparent"
          ></div>
          <span
            class="text-[#ecbc85] font-bold text-lg uppercase tracking-[0.3em]"
            >{{ $t("home.businessTitle") }}</span
          >
          <div
            class="w-16 h-px bg-gradient-to-r from-transparent via-[#ecbc85] to-transparent"
          ></div>
        </div>

        <!-- Compact Title -->
        <h2
          class="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
        >
          Our Premium Projects
        </h2>

        <!-- Simple Subtitle -->
        <p
          class="text-lg text-white/80 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Discover our exceptional collection of luxury developments
        </p>
      </div>

      <!-- Compact Projects Grid - 4 Items in 1 Row -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 place-content-center">
        <div
          v-for="project in projects.slice(0, 4)"
          :key="project.id"
          class="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-[#ecbc85]/30 hover:scale-105 transition-all duration-500"
        >
          <!-- Project Image -->
          <div class="aspect-[4/3] overflow-hidden relative">
            <NuxtImg
              v-if="project.image"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              :src="project.image"
              :alt="project.title"
              loading="lazy"
              format="webp"
              quality="90"
            />
            <div
              v-else
              class="w-full h-full bg-gradient-to-br from-[#2c2c54] to-[#1a1a3a] flex items-center justify-center"
            >
              <Icon name="fa-solid:building" class="text-4xl text-white/30" />
            </div>
            <!-- Overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>
            <!-- Premium Badge -->
            <div
              class="absolute top-4 right-4 bg-gradient-to-r from-[#ecbc85] to-[#d4a574] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
            >
              Premium
            </div>
          </div>

          <!-- Project Content -->
          <div class="p-6 space-y-4">
            <h3
              class="text-xl font-bold text-white group-hover:text-[#ecbc85] transition-colors duration-300"
            >
              {{ project.title }}
            </h3>
            <p
              class="text-white/70 font-light line-clamp-2 text-sm leading-relaxed"
            >
              {{ project.description }}
            </p>
            <NuxtLink
              :to="
                project.link && project.link !== '/'
                  ? `/projects/${project.id}`
                  : `/projects/${project.id}`
              "
              class="inline-flex items-center space-x-2 text-[#ecbc85] font-semibold text-sm hover:text-white group-hover:translate-x-1 transition-all duration-300"
            >
              <span>{{ $t("ramada.viewMore") }}</span>
              <Icon name="fa-solid:arrow-right" class="text-xs" />
            </NuxtLink>
          </div>
        </div>

        <!-- Compact Empty State -->
        <div
          v-if="projects.length === 0 && !loadingProjects"
          class="col-span-full text-center py-12"
        >
          <div
            class="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <Icon name="fa-solid:building" class="text-2xl text-white/60" />
          </div>
          <p class="text-white/70 text-lg font-light">No projects available</p>
        </div>
      </div>

      <!-- View All Button -->
      <div v-if="projects.length > 0" class="text-center">
        <NuxtLink
          to="/projects"
          class="group inline-flex items-center space-x-3 bg-gradient-to-r from-[#ecbc85] to-[#d4a574] text-white px-8 py-4 rounded-full font-semibold hover:from-[#d4a574] hover:to-[#ecbc85] hover:scale-105 hover:shadow-2xl hover:shadow-[#ecbc85]/25 transition-all duration-500"
        >
          <span>View All Projects</span>
          <Icon
            name="fa-solid:arrow-right"
            class="group-hover:translate-x-1 transition-transform duration-300"
          />
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- Modern Article Showcase -->
  <section
    class="py-16 bg-gradient-to-br from-gray-900 via-[#1a1a2e] to-gray-900 relative overflow-hidden px-20"
  >
    <!-- Elegant Background Elements -->
    <div class="absolute inset-0 opacity-20">
      <div
        class="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-[#ecbc85]/30 to-transparent rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute bottom-20 left-20 w-60 h-60 bg-gradient-to-tl from-[#2c2c54]/40 to-transparent rounded-full blur-3xl animate-pulse"
        style="animation-delay: 2s"
      ></div>
    </div>

    <div class="w-full px-8 relative z-10">
      <!-- Clean Modern Header -->
      <div class="text-center mb-12">
        <!-- Simple Badge -->
        <div class="inline-flex items-center space-x-4 mb-6">
          <div
            class="w-12 h-px bg-gradient-to-r from-transparent via-[#ecbc85] to-transparent"
          ></div>
          <span
            class="text-[#ecbc85] font-bold text-base uppercase tracking-[0.3em]"
            >{{ $t("news.title") }}</span
          >
          <div
            class="w-12 h-px bg-gradient-to-r from-transparent via-[#ecbc85] to-transparent"
          ></div>
        </div>

        <!-- Clean Title -->
        <h2
          class="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight"
        >
          Latest News & Insights
        </h2>

        <!-- Simple Subtitle -->
        <p
          class="text-base text-white/80 max-w-xl mx-auto font-light leading-relaxed"
        >
          Stay updated with our latest developments and industry insights
        </p>
      </div>

      <!-- Simple Loading State -->
      <div v-if="loadingArticles" class="text-center py-12">
        <div
          class="w-16 h-16 border-4 border-[#ecbc85]/20 border-t-[#ecbc85] rounded-full animate-spin mx-auto mb-4"
        ></div>
        <p class="text-white/70 text-lg font-light">
          {{ $t("articles.loading") }}
        </p>
      </div>

      <!-- Clean Articles Grid - 3 Items in 1 Row -->
      <div v-else-if="latestArticles.length > 0" class="mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-8">
          <article
            v-for="article in latestArticles.slice(0, 3)"
            :key="article.id"
            class="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-[#ecbc85]/30 hover:scale-105 transition-all duration-500"
          >
            <!-- Article Image -->
            <div class="aspect-[16/10] overflow-hidden relative">
              <NuxtImg
                v-if="article.featuredImage"
                :src="article.featuredImage"
                :alt="article.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                format="webp"
                quality="90"
              />
              <div
                v-else
                class="w-full h-full bg-gradient-to-br from-[#2c2c54] to-[#1a1a3a] flex items-center justify-center"
              >
                <Icon
                  name="fa-solid:newspaper"
                  class="text-4xl text-white/30"
                />
              </div>

              <!-- Overlay -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              ></div>

              <!-- Date Badge -->
              <div
                class="absolute top-4 right-4 bg-[#ecbc85]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold"
              >
                {{ formatDate(article.publishedAt || article.createdAt) }}
              </div>
            </div>

            <!-- Article Content -->
            <div class="p-4 space-y-3">
              <h3
                class="text-lg font-bold text-white group-hover:text-[#ecbc85] transition-colors duration-300 line-clamp-2"
              >
                {{ article.title }}
              </h3>

              <p
                class="text-white/70 font-light line-clamp-3 text-sm leading-relaxed"
              >
                {{ article.excerpt || stripHtml(article.content) }}
              </p>

              <NuxtLink
                :to="`/articles/${article.id}`"
                class="inline-flex items-center space-x-2 text-[#ecbc85] font-semibold text-sm hover:text-white group-hover:translate-x-1 transition-all duration-300"
              >
                <span>{{ $t("articles.readMore") }}</span>
                <Icon name="fa-solid:arrow-right" class="text-xs" />
              </NuxtLink>
            </div>
          </article>
        </div>

        <!-- Simple View All Button -->
        <div class="text-center">
          <NuxtLink
            to="/articles"
            class="group inline-flex items-center space-x-3 bg-gradient-to-r from-[#ecbc85] to-[#d4a574] text-white px-8 py-4 rounded-full font-semibold hover:from-[#d4a574] hover:to-[#ecbc85] hover:scale-105 hover:shadow-2xl hover:shadow-[#ecbc85]/25 transition-all duration-500"
          >
            <span>View All Articles</span>
            <Icon
              name="fa-solid:arrow-right"
              class="group-hover:translate-x-1 transition-transform duration-300"
            />
          </NuxtLink>
        </div>
      </div>

      <!-- Simple Empty State -->
      <div v-else-if="!loadingArticles" class="text-center py-16">
        <div
          class="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <Icon name="fa-solid:newspaper" class="text-2xl text-white/60" />
        </div>
        <h3 class="text-xl font-bold text-white/80 mb-2">
          {{ $t("articles.noArticles") }}
        </h3>
        <p class="text-white/60 font-light">
          Stay tuned for exciting updates and insights
        </p>
      </div>
    </div>
  </section>

  <Footer />

  <!-- Mobile Bottom Bar -->
  <MobileBottomBar />
</template>

<script setup lang="ts">
const carouselSlides = ref<any[]>([]);
const loading = ref(true);
const latestArticles = ref<any[]>([]);
const loadingArticles = ref(true);
const projects = ref<any[]>([]);
const loadingProjects = ref(true);

// Fetch carousel slides from backend
const loadCarousel = async () => {
  loading.value = true;
  try {
    const data: any = await $fetch("/api/public/carousel");
    // Filter only active slides and sort by order
    const activeSlides = data
      .filter((slide: any) => slide.active)
      .sort((a: any, b: any) => a.order - b.order);
    carouselSlides.value = activeSlides;
  } catch (error) {
    console.error("Failed to load carousel:", error);
    // Fallback to placeholder data if API fails
    carouselSlides.value = [
      {
        id: "1",
        image: "https://picsum.photos/1920/1080?random=1",
        title: "Emerald Bay",
        description: "Where Luxury Meets Excellence",
        videoLink: "",
      },
      {
        id: "2",
        image: "https://picsum.photos/1920/1080?random=2",
        title: "Premium Living",
        description: "Experience Unparalleled Comfort",
        videoLink: "",
      },
      {
        id: "3",
        image: "https://picsum.photos/1920/1080?random=3",
        title: "Luxury Redefined",
        description: "Your Dream Home Awaits",
        videoLink: "",
      },
    ];
  } finally {
    loading.value = false;
  }
};

// Fetch latest articles
const loadLatestArticles = async () => {
  loadingArticles.value = true;
  try {
    const data: any = await $fetch("/api/public/articles");
    // Get only the latest 3 articles
    latestArticles.value = data.slice(0, 3);
  } catch (error) {
    console.error("Failed to load articles:", error);
    latestArticles.value = [];
  } finally {
    loadingArticles.value = false;
  }
};

// Fetch projects
const loadProjects = async () => {
  loadingProjects.value = true;
  try {
    const data: any = await $fetch("/api/public/projects");
    projects.value = data;
  } catch (error) {
    console.error("Failed to load projects:", error);
    projects.value = [];
  } finally {
    loadingProjects.value = false;
  }
};

// Open video in new tab or modal
const openVideo = (videoLink: string) => {
  if (!videoLink) return;

  // Check if it's a YouTube link and convert to embed if needed
  if (
    videoLink.includes("youtube.com/watch") ||
    videoLink.includes("youtu.be/")
  ) {
    // For now, just open in new tab - you can implement a modal later
    window.open(videoLink, "_blank");
  } else {
    // For other video links, open directly
    window.open(videoLink, "_blank");
  }
};

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Strip HTML tags for excerpt
const stripHtml = (html: string) => {
  if (!html) return "";
  if (import.meta.client) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }
  return html.replace(/<[^>]*>/g, "");
};

onMounted(() => {
  loadCarousel();
  loadLatestArticles();
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

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Ultra-Modern Luxury Animations */
@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(-30px) rotate(8deg);
  }
}

@keyframes float-delayed-slow {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(-25px) rotate(-5deg);
  }
}

@keyframes float-reverse {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(20px) rotate(3deg);
  }
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-delayed-slow {
  animation: float-delayed-slow 10s ease-in-out infinite;
  animation-delay: 2s;
}

.animate-float-reverse {
  animation: float-reverse 12s ease-in-out infinite;
  animation-delay: 4s;
}

/* Ultra-Luxury Components */
.luxury-badge-premium {
  position: relative;
  overflow: hidden;
}

.luxury-badge-premium::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.15),
    transparent
  );
  transition: left 0.8s;
}

.luxury-badge-premium:hover::before {
  left: 100%;
}

.luxury-title-premium {
  text-shadow: 0 8px 32px rgba(44, 44, 84, 0.4);
  background: linear-gradient(135deg, #ffffff 0%, #ecbc85 50%, #ffffff 100%);
  background-size: 200% 200%;
  animation: gradient-shift 6s ease infinite;
  -webkit-background-clip: text;
  background-clip: text;
}

@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.luxury-subtitle {
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.luxury-button-premium {
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(236, 188, 133, 0.3);
}

.luxury-button-premium::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.25),
    transparent
  );
  transition: left 0.8s;
}

.luxury-button-premium:hover::before {
  left: 100%;
}

.luxury-title-about {
  text-shadow: 0 6px 24px rgba(29, 29, 57, 0.2);
}

.luxury-title-projects {
  text-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.luxury-text {
  text-shadow: 0 2px 8px rgba(236, 188, 133, 0.3);
}

/* Premium Hover Effects */
.group:hover .luxury-overlay {
  opacity: 1;
}

/* Smooth Transitions */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced Shadows */
.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}

/* New Article Section Animations */
@keyframes gradient-x {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-gradient-x {
  animation: gradient-x 6s ease infinite;
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

.bg-size-300 {
  background-size: 300% 300%;
}

/* Enhanced Line Clamp */
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
