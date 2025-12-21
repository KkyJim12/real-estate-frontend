<template>
  <div class="relative h-screen overflow-hidden">
    <!-- Loading State -->
    <div
      v-if="loading"
      class="flex items-center justify-center h-full bg-gray-100"
    >
      <div class="text-center">
        <Icon
          name="fa-solid:spinner"
          class="text-4xl text-gray-400 animate-spin mb-4"
        />
        <p class="text-gray-500">Loading carousel...</p>
      </div>
    </div>

    <!-- Carousel Container -->
    <div v-else-if="carouselItems.length > 0" class="relative h-full">
      <!-- Slides -->
      <div class="relative h-full">
        <div
          v-for="(item, index) in carouselItems"
          :key="index"
          :class="[
            'absolute inset-0 transition-opacity duration-1000 ease-in-out',
            index === currentSlide ? 'opacity-100' : 'opacity-0',
          ]"
        >
          <!-- Background Image -->
          <div class="absolute inset-0">
            <NuxtImg
              :src="item.image"
              :alt="item.title || 'Hero image'"
              class="w-full h-full object-cover"
              loading="eager"
              format="webp"
              quality="90"
            />
            <div class="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>

          <!-- Content -->
          <div class="relative z-10 flex items-center justify-center h-full">
            <div class="text-center text-white px-4 max-w-4xl mx-auto">
              <h1
                v-if="item.title"
                class="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-wide animate-fade-in-up"
              >
                {{ item.title }}
              </h1>

              <p
                v-if="item.description"
                class="text-lg md:text-xl lg:text-2xl font-light opacity-90 mb-8 animate-fade-in-up animation-delay-300"
              >
                {{ item.description }}
              </p>

              <div
                v-if="item.buttonText && item.buttonLink"
                class="animate-fade-in-up animation-delay-600"
              >
                <NuxtLink
                  :to="item.buttonLink"
                  class="inline-flex items-center space-x-3 bg-[#ecbc85] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#d4a574] transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <span>{{ item.buttonText }}</span>
                  <Icon name="fa-solid:arrow-right" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Dots -->
      <div
        v-if="carouselItems.length > 1"
        class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div class="flex space-x-3">
          <button
            v-for="(item, index) in carouselItems"
            :key="index"
            @click="goToSlide(index)"
            :class="[
              'w-3 h-3 rounded-full transition-all duration-300',
              index === currentSlide
                ? 'bg-[#ecbc85] scale-125'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75',
            ]"
            :aria-label="`Go to slide ${index + 1}`"
          ></button>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <div
        v-if="carouselItems.length > 1"
        class="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 z-20"
      >
        <button
          @click="previousSlide"
          class="w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          aria-label="Previous slide"
        >
          <Icon name="fa-solid:chevron-left" class="text-xl" />
        </button>

        <button
          @click="nextSlide"
          class="w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          aria-label="Next slide"
        >
          <Icon name="fa-solid:chevron-right" class="text-xl" />
        </button>
      </div>

      <!-- Slide Counter -->
      <div v-if="carouselItems.length > 1" class="absolute top-8 right-8 z-20">
        <div
          class="bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm font-medium"
        >
          {{ currentSlide + 1 }} / {{ carouselItems.length }}
        </div>
      </div>
    </div>

    <!-- Fallback when no carousel items -->
    <div
      v-else
      class="flex items-center justify-center h-full bg-gradient-to-br from-[#2c2c54] to-[#ecbc85]"
    >
      <div class="text-center text-white px-4">
        <h1 class="text-4xl md:text-6xl font-bold mb-4">Welcome</h1>
        <p class="text-xl md:text-2xl font-light opacity-90">
          Discover Amazing Real Estate Projects
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CarouselItem {
  image: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  active: boolean;
  order: number;
  projectId: string;
  projectTitle: string;
}

const carouselItems = ref<CarouselItem[]>([]);
const loading = ref(true);
const currentSlide = ref(0);
const autoplayInterval = ref<NodeJS.Timeout | null>(null);

// Fetch carousel items
const loadCarousel = async () => {
  loading.value = true;
  try {
    const data = await $fetch("/api/carousel");
    carouselItems.value = data.carousel || [];
  } catch (error) {
    console.error("Failed to load carousel:", error);
    carouselItems.value = [];
  } finally {
    loading.value = false;
  }
};

// Navigation functions
const goToSlide = (index: number) => {
  currentSlide.value = index;
  resetAutoplay();
};

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % carouselItems.value.length;
  resetAutoplay();
};

const previousSlide = () => {
  currentSlide.value =
    currentSlide.value === 0
      ? carouselItems.value.length - 1
      : currentSlide.value - 1;
  resetAutoplay();
};

// Autoplay functionality
const startAutoplay = () => {
  if (carouselItems.value.length > 1) {
    autoplayInterval.value = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds
  }
};

const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value);
    autoplayInterval.value = null;
  }
};

const resetAutoplay = () => {
  stopAutoplay();
  startAutoplay();
};

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "ArrowLeft") {
    previousSlide();
  } else if (event.key === "ArrowRight") {
    nextSlide();
  }
};

// Lifecycle
onMounted(() => {
  loadCarousel().then(() => {
    if (carouselItems.value.length > 0) {
      startAutoplay();
      window.addEventListener("keydown", handleKeydown);
    }
  });
});

onUnmounted(() => {
  stopAutoplay();
  window.removeEventListener("keydown", handleKeydown);
});

// Pause autoplay on hover
const pauseOnHover = () => {
  stopAutoplay();
};

const resumeOnLeave = () => {
  startAutoplay();
};
</script>

<style scoped>
/* Animation classes */
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

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animation-delay-300 {
  animation-delay: 0.3s;
  opacity: 0;
}

.animation-delay-600 {
  animation-delay: 0.6s;
  opacity: 0;
}

/* Smooth transitions */
.carousel-slide {
  transition: all 0.5s ease-in-out;
}

/* Button hover effects */
button {
  transition: all 0.3s ease;
}

button:hover {
  transform: scale(1.05);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .animate-fade-in-up {
    animation-duration: 0.6s;
  }
}
</style>
