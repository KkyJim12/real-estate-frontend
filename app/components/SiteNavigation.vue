<template>
  <div>
    <!-- Ultra-Modern Mobile Navigation Header -->
    <nav :class="[
      'lg:hidden fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500',
      isScrolled
        ? 'bg-gradient-to-r from-[#1d1d39]/95 via-[#2c2c54]/95 to-[#1d1d39]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl'
        : 'bg-transparent'
    ]">
      <div class="flex items-center justify-between">
        <!-- Premium Hamburger Menu Button -->
        <button @click="mobileMenuOpen = true" :class="[
          'group relative p-3 rounded-xl transition-all duration-300',
          isScrolled
            ? 'bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#ecbc85]/30'
            : 'bg-black/20 backdrop-blur-md border border-white/20 hover:bg-black/30 hover:border-[#ecbc85]/50'
        ]">
          <Icon name="fa-solid:bars"
            class="text-xl text-white group-hover:text-[#ecbc85] transition-colors duration-300" />
          <div
            class="absolute inset-0 bg-gradient-to-r from-[#ecbc85]/0 via-[#ecbc85]/10 to-[#ecbc85]/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          </div>
        </button>

        <!-- Luxury Logo -->
        <NuxtLink to="/" class="group relative">
          <div :class="[
            'relative p-2 rounded-2xl transition-all duration-500 group-hover:scale-105',
            isScrolled
              ? 'bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-[#ecbc85]/30'
              : 'bg-black/20 backdrop-blur-md border border-white/20 group-hover:border-[#ecbc85]/50'
          ]">
            <NuxtImg class="w-16 sm:w-20 transition-transform duration-500"
              src="https://emeraldbaypattaya.com/wp-content/uploads/2019/11/logo-new.png" alt="Emerald Bay Pattaya"
              loading="eager" format="webp" />
            <div
              class="absolute inset-0 bg-gradient-to-br from-[#ecbc85]/0 via-[#ecbc85]/5 to-[#ecbc85]/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            </div>
          </div>
        </NuxtLink>

        <!-- Premium Contact Actions -->
        <div class="flex items-center space-x-3">
          <a href="tel:+66616109888" :class="[
            'group relative p-3 rounded-xl transition-all duration-300',
            isScrolled
              ? 'bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#ecbc85]/30'
              : 'bg-black/20 backdrop-blur-md border border-white/20 hover:bg-black/30 hover:border-[#ecbc85]/50'
          ]">
            <Icon name="fa-solid:phone"
              class="text-lg text-white group-hover:text-[#ecbc85] transition-colors duration-300" />
            <div
              class="absolute inset-0 bg-gradient-to-r from-[#ecbc85]/0 via-[#ecbc85]/10 to-[#ecbc85]/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </div>
          </a>
          <div :class="[
            'relative p-2 rounded-xl transition-all duration-300',
            isScrolled
              ? 'bg-white/5 backdrop-blur-sm border border-white/10'
              : 'bg-black/20 backdrop-blur-md border border-white/20'
          ]">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile/Tablet Menu Overlay -->
    <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition-opacity duration-300" leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="mobileMenuOpen"
        class="lg:hidden fixed inset-0 bg-gradient-to-br from-[#1d1d39]/95 via-[#2c2c54]/95 to-[#1d1d39]/95 backdrop-blur-xl z-50"
        @click="mobileMenuOpen = false">
        <div class="flex flex-col h-full">
          <!-- Ultra-Modern Menu Header -->
          <div class="flex items-center justify-between px-6 py-6 border-b border-white/10">
            <!-- Premium Close Button -->
            <button @click="mobileMenuOpen = false"
              class="group relative p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#ecbc85]/30 transition-all duration-300">
              <Icon name="fa-solid:times"
                class="text-xl text-white group-hover:text-[#ecbc85] transition-colors duration-300" />
              <div
                class="absolute inset-0 bg-gradient-to-r from-[#ecbc85]/0 via-[#ecbc85]/10 to-[#ecbc85]/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              </div>
            </button>

            <!-- Luxury Logo -->
            <NuxtLink to="/" @click="mobileMenuOpen = false" class="group relative">
              <div
                class="relative p-2 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-[#ecbc85]/30 transition-all duration-500">
                <NuxtImg class="w-16 sm:w-20 group-hover:scale-105 transition-transform duration-500"
                  src="https://emeraldbaypattaya.com/wp-content/uploads/2019/11/logo-new.png" alt="Emerald Bay Pattaya"
                  loading="eager" format="webp" />
                <div
                  class="absolute inset-0 bg-gradient-to-br from-[#ecbc85]/0 via-[#ecbc85]/5 to-[#ecbc85]/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                </div>
              </div>
            </NuxtLink>

            <!-- Premium Contact Actions -->
            <div class="flex items-center space-x-3">
              <a href="tel:+66616109888"
                class="group relative p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#ecbc85]/30 transition-all duration-300">
                <Icon name="fa-solid:phone"
                  class="text-lg text-white group-hover:text-[#ecbc85] transition-colors duration-300" />
                <div
                  class="absolute inset-0 bg-gradient-to-r from-[#ecbc85]/0 via-[#ecbc85]/10 to-[#ecbc85]/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>
              </a>
              <div class="relative p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <LanguageSwitcher />
              </div>
            </div>
          </div>

          <!-- Ultra-Modern Menu Items -->
          <nav class="flex-1 px-8 py-12">
            <ul class="space-y-8">
              <li>
                <NuxtLink to="/" @click="mobileMenuOpen = false"
                  class="group flex items-center space-x-4 text-white/80 hover:text-white text-2xl font-light tracking-wider transition-all duration-300 p-4 rounded-2xl hover:bg-white/5">
                  <div
                    class="w-2 h-2 bg-[#ecbc85] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  </div>
                  <span>{{ $t('nav.home') }}</span>
                </NuxtLink>
              </li>
              <li>
                <a href="/#portfolio" @click="mobileMenuOpen = false"
                  class="group flex items-center space-x-4 text-white/80 hover:text-white text-2xl font-light tracking-wider transition-all duration-300 p-4 rounded-2xl hover:bg-white/5">
                  <div
                    class="w-2 h-2 bg-[#ecbc85] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  </div>
                  <span>{{ $t('nav.portfolio') }}</span>
                </a>
              </li>
              <li>
                <a href="/#ramada" @click="mobileMenuOpen = false"
                  class="group flex items-center space-x-4 text-white/80 hover:text-white text-2xl font-light tracking-wider transition-all duration-300 p-4 rounded-2xl hover:bg-white/5">
                  <div
                    class="w-2 h-2 bg-[#ecbc85] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  </div>
                  <span>{{ $t('nav.ramada') }}</span>
                </a>
              </li>
              <li>
                <a href="/#convilla" @click="mobileMenuOpen = false"
                  class="group flex items-center space-x-4 text-white/80 hover:text-white text-2xl font-light tracking-wider transition-all duration-300 p-4 rounded-2xl hover:bg-white/5">
                  <div
                    class="w-2 h-2 bg-[#ecbc85] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  </div>
                  <span>{{ $t('nav.convilla') }}</span>
                </a>
              </li>
              <li>
                <NuxtLink to="/articles" @click="mobileMenuOpen = false"
                  class="group flex items-center space-x-4 text-white/80 hover:text-white text-2xl font-light tracking-wider transition-all duration-300 p-4 rounded-2xl hover:bg-white/5">
                  <div
                    class="w-2 h-2 bg-[#ecbc85] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  </div>
                  <span>{{ $t('nav.news') }}</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Transition>

    <!-- Ultra-Modern Desktop Navigation -->
    <nav :class="[
      'hidden lg:flex h-28 px-60 items-center fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      isScrolled
        ? 'bg-gradient-to-r from-[#1d1d39]/95 via-[#2c2c54]/95 to-[#1d1d39]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl'
        : 'bg-transparent'
    ]">
      <div class="flex items-center justify-between relative w-full">
        <!-- Left Section - Contact Info -->
        <div class="flex items-center gap-6">
          <div :class="[
            'flex space-x-2 items-center group cursor-pointer px-4 py-2 rounded-xl transition-all duration-300'
          ]">
            <Icon name="fa-brands:facebook"
              class="text-white text-2xl group-hover:text-[#ecbc85] transition-colors duration-300" />
            <a class="text-white group-hover:text-[#ecbc85] text-sm transition-colors duration-300"
              href="https://www.facebook.com/emeraldbaypattaya" target="_blank">emeraldbaypattaya</a>
          </div>

          <div :class="[
            'flex space-x-2 items-center group cursor-pointer px-4 py-2 rounded-xl transition-all duration-300'
          ]">
            <Icon name="fa-solid:phone"
              class="text-white text-xl rotate-100 group-hover:text-[#ecbc85] transition-colors duration-300" />
            <a class="text-white group-hover:text-[#ecbc85] text-sm transition-colors duration-300"
              href="tel:+66616109888">(+66) 61-610-9888</a>
          </div>
        </div>

        <!-- Center - Luxury Logo -->
        <div class="absolute left-1/2 transform -translate-x-1/2">
          <NuxtLink to="/" class="group relative">
            <div :class="[
              'relative p-3 rounded-2xl transition-all duration-500 group-hover:scale-105',
            ]">
              <NuxtImg class="w-28 transition-all duration-500"
                src="https://emeraldbaypattaya.com/wp-content/uploads/2019/11/logo-new.png" alt="Emerald Bay Pattaya"
                loading="eager" format="webp" />
              <div
                class="absolute inset-0 bg-gradient-to-br from-[#ecbc85]/0 via-[#ecbc85]/5 to-[#ecbc85]/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Right Section - Language -->
        <div :class="[
          'flex items-center space-x-3 px-4 py-2 rounded-xl transition-all duration-300'
        ]">
          <Icon name="fa-solid:globe" class="text-white text-xl" />
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false);
const isScrolled = ref(1);

// Handle scroll detection
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// Close menu on escape key and setup scroll listener
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      mobileMenuOpen.value = false;
    }
  };

  // Add scroll listener
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('keydown', handleEscape);

  // Initial scroll check
  handleScroll();

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('keydown', handleEscape);
  });
});
</script>
