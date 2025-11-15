<template>
  <div>
    <!-- Mobile/Tablet Navigation Header -->
    <nav class="lg:hidden fixed top-0 left-0 right-0 bg-[#1d1d39] z-50 px-4 py-3">
      <div class="flex items-center justify-between">
        <!-- Hamburger Menu Button -->
        <button @click="mobileMenuOpen = true" class="text-white p-2">
          <Icon name="fa-solid:bars" class="text-2xl" />
        </button>

        <!-- Logo -->
        <NuxtLink to="/">
          <NuxtImg
            class="w-16 sm:w-20"
            src="https://emeraldbaypattaya.com/wp-content/uploads/2019/11/logo-new.png"
            alt="Emerald Bay Pattaya"
            loading="eager"
            format="webp"
          />
        </NuxtLink>

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
            <NuxtLink to="/" @click="mobileMenuOpen = false">
              <NuxtImg
                class="w-16 sm:w-20"
                src="https://emeraldbaypattaya.com/wp-content/uploads/2019/11/logo-new.png"
                alt="Emerald Bay Pattaya"
                loading="eager"
                format="webp"
              />
            </NuxtLink>

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
                <NuxtLink
                  to="/"
                  @click="mobileMenuOpen = false"
                  class="text-white/70 hover:text-white text-xl font-light tracking-wider transition-colors block"
                >
                  {{ $t('nav.home') }}
                </NuxtLink>
              </li>
              <li>
                <a
                  href="/#portfolio"
                  @click="mobileMenuOpen = false"
                  class="text-white/70 hover:text-white text-xl font-light tracking-wider transition-colors block"
                >
                  {{ $t('nav.portfolio') }}
                </a>
              </li>
              <li>
                <a
                  href="/#ramada"
                  @click="mobileMenuOpen = false"
                  class="text-white/70 hover:text-white text-xl font-light tracking-wider transition-colors block"
                >
                  {{ $t('nav.ramada') }}
                </a>
              </li>
              <li>
                <a
                  href="/#convilla"
                  @click="mobileMenuOpen = false"
                  class="text-white/70 hover:text-white text-xl font-light tracking-wider transition-colors block"
                >
                  {{ $t('nav.convilla') }}
                </a>
              </li>
              <li>
                <NuxtLink
                  to="/articles"
                  @click="mobileMenuOpen = false"
                  class="text-white/70 hover:text-white text-xl font-light tracking-wider transition-colors block"
                >
                  {{ $t('nav.news') }}
                </NuxtLink>
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
            <a class="text-white group-hover:text-[#ecbc85] text-sm" href="https://www.facebook.com/emeraldbaypattaya" target="_blank">emeraldbaypattaya</a>
          </div>

          <div class="flex space-x-2 items-center group cursor-pointer">
            <Icon name="fa-solid:phone" class="text-white text-xl rotate-100" />
            <a class="text-white group-hover:text-[#ecbc85] text-sm" href="tel:+66616109888">(+66) 61-610-9888</a>
          </div>
        </div>

        <!-- Center - Logo -->
        <div class="absolute left-1/2 transform -translate-x-1/2">
          <NuxtLink to="/">
            <NuxtImg
              class="w-28 cursor-pointer hover:opacity-90 transition-opacity"
              src="https://emeraldbaypattaya.com/wp-content/uploads/2019/11/logo-new.png"
              alt="Emerald Bay Pattaya"
              loading="eager"
              format="webp"
            />
          </NuxtLink>
        </div>

        <!-- Right Section - Language -->
        <div class="flex items-center space-x-3">
          <Icon name="fa-solid:globe" class="text-white text-xl" />
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false);

// Close menu on escape key
onMounted(() => {
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
