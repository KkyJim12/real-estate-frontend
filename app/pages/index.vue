<template>
  <!-- Mobile/Tablet Navigation Header -->
  <nav class="lg:hidden fixed top-0 left-0 right-0 bg-[#1d1d39] z-50 px-4 py-3">
    <div class="flex items-center justify-between">
      <!-- Hamburger Menu Button -->
      <button @click="mobileMenuOpen = true" class="text-white p-2">
        <Icon name="fa-solid:bars" class="text-2xl" />
      </button>

      <!-- Logo -->
      <NuxtImg
        class="w-16 sm:w-20"
        src="https://emeraldbaypattaya.com/wp-content/uploads/2019/11/logo-new.png"
        alt="Emerald Bay Pattaya"
      />

      <!-- Language & Phone -->
      <div class="flex items-center space-x-3">
        <a href="tel:+66616109888" class="text-white">
          <Icon name="fa-solid:phone" class="text-xl" />
        </a>
        <LanguageSwitcher />
      </div>
    </div>
  </nav>

  <!-- Mobile/Tablet Menu Overlay -->
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="mobileMenuOpen"
      class="lg:hidden fixed inset-0 bg-[#2d2d49]/95 backdrop-blur-sm z-50"
      @click="mobileMenuOpen = false"
    >
      <div class="flex flex-col h-full">
        <!-- Menu Header -->
        <div class="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <!-- Close Button -->
          <button @click="mobileMenuOpen = false" class="text-white p-2">
            <Icon name="fa-solid:times" class="text-2xl" />
          </button>

          <!-- Logo -->
          <NuxtImg
            class="w-16 sm:w-20"
            src="https://emeraldbaypattaya.com/wp-content/uploads/2019/11/logo-new.png"
            alt="Emerald Bay Pattaya"
          />

          <!-- Language & Phone -->
          <div class="flex items-center space-x-3">
            <a href="tel:+66616109888" class="text-white">
              <Icon name="fa-solid:phone" class="text-xl" />
            </a>
            <LanguageSwitcher />
          </div>
        </div>

        <!-- Menu Items -->
        <nav class="flex-1 px-6 py-8">
          <ul class="space-y-6">
            <li>
              <a
                href="#home"
                @click="mobileMenuOpen = false"
                class="text-white/70 hover:text-white text-xl font-light tracking-wider transition-colors block"
              >
                {{ $t('nav.home') }}
              </a>
            </li>
            <li>
              <a
                href="#portfolio"
                @click="mobileMenuOpen = false"
                class="text-white/70 hover:text-white text-xl font-light tracking-wider transition-colors block"
              >
                {{ $t('nav.portfolio') }}
              </a>
            </li>
            <li>
              <a
                href="#ramada"
                @click="mobileMenuOpen = false"
                class="text-white/70 hover:text-white text-xl font-light tracking-wider transition-colors block"
              >
                {{ $t('nav.ramada') }}
              </a>
            </li>
            <li>
              <a
                href="#convilla"
                @click="mobileMenuOpen = false"
                class="text-white/70 hover:text-white text-xl font-light tracking-wider transition-colors block"
              >
                {{ $t('nav.convilla') }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </Transition>

  <!-- Desktop Navigation -->
  <nav class="hidden lg:flex h-28 px-60 bg-[#1d1d39] items-center">
    <div class="flex items-center justify-between relative w-full">
      <!-- Left Section - Contact Info -->
      <div class="flex items-center gap-6">
        <div class="flex space-x-2 items-center group cursor-pointer">
          <Icon name="fa-brands:facebook" class="text-white text-2xl" />
          <a class="text-white group-hover:text-[#ecbc85] text-sm" href="#">emeraldbaypattaya</a>
        </div>

        <div class="flex space-x-2 items-center group cursor-pointer">
          <Icon name="fa-solid:phone" class="text-white text-xl rotate-100" />
          <a class="text-white group-hover:text-[#ecbc85] text-sm" href="#">(+66) 61-610-9888</a>
        </div>
      </div>

      <!-- Center - Logo -->
      <div class="absolute left-1/2 transform -translate-x-1/2">
        <NuxtImg
          class="w-28"
          src="https://emeraldbaypattaya.com/wp-content/uploads/2019/11/logo-new.png"
          alt="Emerald Bay Pattaya"
        />
      </div>

      <!-- Right Section - Language -->
      <div class="flex items-center space-x-3">
        <Icon name="fa-solid:globe" class="text-white text-xl" />
        <LanguageSwitcher />
      </div>
    </div>
  </nav>

  <!-- Carousel -->
  <div class="w-full">
    <!-- Loading State -->
    <div
      v-if="loading"
      class="w-full h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-7rem)] bg-gray-200 flex items-center justify-center"
    >
      <div class="text-center">
        <Icon name="fa-solid:spinner" class="text-4xl text-gray-400 animate-spin mb-4" />
        <p class="text-gray-500">{{ $t('carousel.loading') }}</p>
      </div>
    </div>

    <!-- Carousel -->
    <UCarousel
      v-else-if="items.length > 0"
      v-slot="{ item }"
      :items="items"
      loop
      :autoplay="{ delay: 4000 }"
      arrows
      dots
      class="w-full h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-7rem)] overflow-hidden"
      :ui="{
        root: 'relative w-full h-full',
        viewport: 'w-full h-full overflow-hidden',
        container: 'flex h-full w-full',
        item: 'min-w-full h-full flex-shrink-0',
        dots: 'absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center space-x-2 sm:space-x-3 z-20',
        dot: 'h-1 w-8 sm:w-10 rounded-sm bg-[#ecbc85]/50 data-[active=true]:bg-[#ecbc85] transition-colors duration-300',
      }"
    >
      <div class="w-full h-full relative">
        <img :src="item" alt="Carousel slide" class="absolute inset-0 w-full h-full object-cover" />
      </div>
    </UCarousel>

    <!-- Empty State -->
    <div
      v-else
      class="w-full h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-7rem)] bg-gray-100 flex items-center justify-center"
    >
      <div class="text-center px-4">
        <Icon name="fa-solid:images" class="text-6xl text-gray-300 mb-4" />
        <p class="text-gray-500 text-lg">{{ $t('carousel.noSlides') }}</p>
      </div>
    </div>
  </div>

  <!-- About Us Section -->
  <div
    class="py-10 sm:py-16 lg:py-20 flex flex-col items-center justify-center space-y-4 sm:space-y-6 px-4 sm:px-8 lg:px-96">
    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#36384f] text-center">
      {{ $t('home.aboutTitle') }}
    </h2>
    <p class="text-sm sm:text-base lg:text-xl text-[#2c3c51] text-center max-w-4xl">
      <span class="block mb-2">{{ $t('home.aboutText1') }}</span>
      <span class="block mb-2">{{ $t('home.aboutText2') }}</span>
      <span class="block">{{ $t('home.aboutText3') }}</span>
    </p>
  </div>

  <!-- Our Business Section Header -->
  <div class="py-10 sm:py-16 lg:py-20 flex flex-col justify-center space-y-4 sm:space-y-6 px-4 sm:px-8 lg:px-96">
    <div class="flex items-center w-full">
      <hr class="flex-grow border-t-2 sm:border-t-3 border-[#ecbc85]" />
      <h2 class="px-3 sm:px-6 text-xl sm:text-3xl lg:text-4xl font-bold text-[#36384f] whitespace-nowrap">
        {{ $t('home.businessTitle') }}
      </h2>
      <hr class="flex-grow border-t-2 sm:border-t-3 border-[#ecbc85]" />
    </div>
  </div>

  <!-- Business Items -->
  <div class="flex flex-col space-y-12 sm:space-y-16 lg:space-y-20 px-4 sm:px-8 lg:px-96 pb-16 sm:pb-24 lg:pb-32">
    <!-- Ramada Emerald Bay -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-x-20">
      <div class="lg:col-span-7 order-2 lg:order-1">
        <div
          class="flex flex-col justify-center lg:items-start items-center h-full space-y-4 sm:space-y-6 lg:space-y-8 w-full text-center lg:text-left">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#36384f]">
            {{ $t('ramada.title') }}
          </h2>
          <hr class="border-t-2 sm:border-t-3 border-[#ecbc85] w-4/5 sm:w-4/5" />
          <p class="text-sm sm:text-base lg:text-xl text-[#2c3c51]">
            <span class="block mb-2">{{ $t('ramada.text1') }}</span>
            <span class="block mb-2">{{ $t('ramada.text2') }}</span>
            <span class="block">{{ $t('ramada.text3') }}</span>
          </p>
          <NuxtLink
            class="bg-[#36364e] w-60 sm:w-48 lg:w-40 py-2 sm:py-3 flex justify-center text-white text-base sm:text-lg lg:text-xl duration-200 hover:bg-[#ecbc85]"
            to="/">
            {{ $t('ramada.viewMore') }}
          </NuxtLink>
        </div>
      </div>
      <div class="lg:col-span-5 order-1 lg:order-2 flex justify-center">
        <NuxtImg class="w-3/5 lg:w-full h-64 sm:h-80 lg:h-full object-cover rounded-lg lg:rounded-none"
          src="https://emeraldbaypattaya.com/wp-content/uploads/2019/11/img-ramada.png" alt="Ramada Emerald Bay" />
      </div>
    </div>

    <!-- Convilla -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-x-20">
      <div class="lg:col-span-5 order-1 flex justify-center lg:justify-start">
        <NuxtImg class="w-3/5 lg:w-full h-64 sm:h-80 lg:h-full object-cover rounded-lg lg:rounded-none"
          src="https://emeraldbaypattaya.com/wp-content/uploads/2019/11/img-villa.png" alt="CONVILLA" />
      </div>
      <div class="lg:col-span-7 order-2">
        <div
          class="flex flex-col justify-center lg:items-start items-center h-full space-y-4 sm:space-y-6 lg:space-y-8 w-full">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#36384f]">
            {{ $t('convilla.title') }}
          </h2>
          <hr class="border-t-2 sm:border-t-3 border-[#ecbc85] w-3/5 sm:w-4/5" />
          <p class="text-sm sm:text-base lg:text-xl text-[#2c3c51] text-center lg:text-left">
            <span class="block mb-2">{{ $t('convilla.text1') }}</span>
            <span class="block mb-2">{{ $t('convilla.text2') }}</span>
            <span class="block mb-2">{{ $t('convilla.text3') }}</span>
            <span class="block mt-4 sm:mt-6 lg:mt-8 mb-2">{{ $t('convilla.text4') }}</span>
            <span class="block">{{ $t('convilla.text5') }}</span>
          </p>
          <NuxtLink
            class="bg-[#36364e] w-60 sm:w-48 lg:w-40 py-2 sm:py-3 flex justify-center text-white text-base sm:text-lg lg:text-xl duration-200 hover:bg-[#ecbc85]"
            to="/">
            {{ $t('convilla.viewMore') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="bg-[#1d1d39] px-4 sm:px-8 lg:px-96 py-12 sm:py-16 lg:py-20">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-24">
      <!-- Contact Us -->
      <div class="sm:col-span-2 lg:col-span-4">
        <div class="flex flex-col space-y-4 sm:space-y-5">
          <p class="text-white font-bold text-xl sm:text-2xl">{{ $t('footer.contactTitle') }}</p>
          <div class="flex flex-col space-y-3 text-sm sm:text-base">
            <div class="flex items-center space-x-3">
              <Icon name="fa-solid:phone" class="text-white rotate-100 text-base sm:text-lg" />
              <a class="text-white hover:text-[#ecbc85] transition-colors" href="tel:+66616109888">
                (+66) 61-610-9888
              </a>
            </div>
            <div class="flex items-center space-x-3">
              <Icon name="fa-solid:envelope" class="text-white text-base sm:text-lg" />
              <a class="text-white hover:text-[#ecbc85] transition-colors" href="mailto:info@emeraldbaypattaya.com">
                info@emeraldbaypattaya.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Location -->
      <div class="sm:col-span-2 lg:col-span-4">
        <div class="flex flex-col space-y-4 sm:space-y-5">
          <p class="text-white font-bold text-xl sm:text-2xl">{{ $t('footer.locationTitle') }}</p>
          <div class="flex flex-col space-y-1 text-xs sm:text-sm">
            <p class="text-white">{{ $t('footer.company') }}</p>
            <p class="text-white">{{ $t('footer.address1') }}</p>
            <p class="text-white">{{ $t('footer.address2') }}</p>
            <p class="text-white">{{ $t('footer.address3') }}</p>
          </div>
        </div>
      </div>

      <!-- Social Media -->
      <div class="sm:col-span-2 lg:col-span-4">
        <div class="flex flex-col space-y-4 sm:space-y-5">
          <p class="text-white font-bold text-xl sm:text-2xl">{{ $t('footer.followTitle') }}</p>
          <div class="flex space-x-4 sm:space-x-6 items-center">
            <a href="#" class="text-white hover:text-[#ecbc85] transition-colors">
              <Icon name="fa-brands:facebook" class="text-2xl sm:text-3xl" />
            </a>
            <a href="#" class="text-white hover:text-[#ecbc85] transition-colors">
              <Icon name="fa-brands:line" class="text-2xl sm:text-3xl" />
            </a>
            <a href="#" class="text-white hover:text-[#ecbc85] transition-colors">
              <Icon name="fa-brands:instagram" class="text-2xl sm:text-3xl" />
            </a>
            <a href="#" class="text-white hover:text-[#ecbc85] transition-colors">
              <Icon name="fa-brands:youtube" class="text-2xl sm:text-3xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!-- Mobile/Tablet Bottom Bar -->
  <div class="lg:hidden fixed bottom-0 left-0 right-0 bg-[#1d1d39] shadow-2xl z-50 border-t border-white/10">
    <div class="grid grid-cols-3 h-20">
      <!-- Tel Button -->
      <a href="tel:+66616109888"
        class="flex flex-col items-center justify-center space-y-1 hover:bg-white/10 transition-colors">
        <Icon name="fa-solid:phone" class="text-white text-2xl" />
        <span class="text-white text-xs font-semibold tracking-wider">{{ $t('bottomBar.tel') }}</span>
      </a>

      <!-- Line Button -->
      <a href="https://line.me/ti/p/~emeraldbaypattaya" target="_blank"
        class="flex flex-col items-center justify-center space-y-1 hover:bg-white/10 transition-colors border-x border-white/10">
        <Icon name="fa-brands:line" class="text-white text-2xl" />
        <span class="text-white text-xs font-semibold tracking-wider">{{ $t('bottomBar.line') }}</span>
      </a>

      <!-- Register Button -->
      <a href="#register"
        class="flex flex-col items-center justify-center space-y-1 hover:bg-white/10 transition-colors">
        <Icon name="fa-solid:edit" class="text-white text-2xl" />
        <span class="text-white text-xs font-semibold tracking-wider">{{ $t('bottomBar.register') }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false);
const carouselSlides = ref<any[]>([]);
const loading = ref(true);

// Fetch carousel slides from backend
const loadCarousel = async () => {
  loading.value = true;
  try {
    const data: any = await $fetch('/api/public/carousel');
    // Filter only active slides and sort by order
    const activeSlides = data
      .filter((slide: any) => slide.active)
      .sort((a: any, b: any) => a.order - b.order);
    carouselSlides.value = activeSlides;
  } catch (error) {
    console.error('Failed to load carousel:', error);
    // Fallback to placeholder images if API fails
    carouselSlides.value = [
      { id: '1', image: 'https://picsum.photos/1920/1080?random=1', title: '', description: '' },
      { id: '2', image: 'https://picsum.photos/1920/1080?random=2', title: '', description: '' },
      { id: '3', image: 'https://picsum.photos/1920/1080?random=3', title: '', description: '' },
    ];
  } finally {
    loading.value = false;
  }
};

// Computed property to get carousel items (just the image URLs)
const items = computed(() => {
  return carouselSlides.value.map((slide) => slide.image);
});

// Close menu on escape key
onMounted(() => {
  loadCarousel();
  
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      mobileMenuOpen.value = false;
    }
  };
  window.addEventListener('keydown', handleEscape);
  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape);
  });
});
</script>
