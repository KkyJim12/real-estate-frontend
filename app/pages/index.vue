<template>
  <!-- Navigation -->
  <nav
    class="h-auto lg:h-28 px-4 sm:px-8 lg:px-60 bg-[#1d1d39] py-4 items-center py-10"
  >
    <div
      class="flex flex-col lg:flex-row items-center justify-between lg:relative gap-4 lg:gap-0"
    >
      <!-- Left Section - Contact Info -->
      <div
        class="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 w-full lg:w-auto justify-center lg:justify-start"
      >
        <div class="flex space-x-2 items-center group cursor-pointer">
          <Icon
            name="fa-brands:facebook"
            class="text-white text-xl sm:text-2xl"
          />
          <a
            class="text-white group-hover:text-[#ecbc85] text-xs sm:text-sm"
            href="#"
            >emeraldbaypattaya</a
          >
        </div>

        <div class="flex space-x-2 items-center group cursor-pointer">
          <Icon
            name="fa-solid:phone"
            class="text-white text-lg sm:text-xl rotate-100"
          />
          <a
            class="text-white group-hover:text-[#ecbc85] text-xs sm:text-sm"
            href="#"
            >(+66) 61-610-9888</a
          >
        </div>
      </div>

      <!-- Center - Logo -->
      <div
        class="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 order-first lg:order-none"
      >
        <NuxtImg
          class="w-20 sm:w-24 lg:w-28"
          src="https://emeraldbaypattaya.com/wp-content/uploads/2019/11/logo-new.png"
          alt="Emerald Bay Pattaya"
        />
      </div>

      <!-- Right Section - Language -->
      <div class="flex items-center space-x-2 sm:space-x-3">
        <Icon name="fa-solid:globe" class="text-white text-lg sm:text-xl" />
        <a class="text-white hover:text-[#ecbc85] text-xs sm:text-sm" href="#"
          >EN</a
        >
        <span class="text-white">/</span>
        <a class="text-white hover:text-[#ecbc85] text-xs sm:text-sm" href="#"
          >TH</a
        >
        <span class="text-white">/</span>
        <a class="text-white hover:text-[#ecbc85] text-xs sm:text-sm" href="#"
          >中文</a
        >
      </div>
    </div>
  </nav>

  <!-- Carousel -->
  <UCarousel
    v-slot="{ item }"
    :items="items"
    loop
    :autoplay="{ delay: 4000 }"
    arrows
    dots
    class="w-full h-[50vh] sm:h-[60vh] lg:h-[calc(100vh-7rem)] overflow-hidden"
    :ui="{
      container: 'h-full overflow-hidden',
      item: 'h-full flex-shrink-0 overflow-hidden',
      dots: 'absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center space-x-2 sm:space-x-3 z-20',
      dot: 'h-1 w-8 sm:w-10 rounded-sm bg-[#ecbc85]/50 data-[active=true]:bg-[#ecbc85] transition-colors duration-300',
    }"
  >
    <div class="relative w-full h-full">
      <img :src="item" alt="" class="object-cover w-full h-full rounded-none" />
    </div>
  </UCarousel>

  <!-- About Us Section -->
  <div
    class="py-10 sm:py-16 lg:py-20 flex flex-col items-center justify-center space-y-4 sm:space-y-6 px-4 sm:px-8 lg:px-96"
  >
    <h2
      class="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#36384f] text-center"
    >
      ABOUT US
    </h2>
    <p
      class="text-sm sm:text-base lg:text-xl text-[#2c3c51] text-center max-w-4xl"
    >
      <span class="block mb-2"
        >Recharge your happiness upon perfection at...EMERALD BAY PATTAYA</span
      >
      <span class="block mb-2"
        >the luxurious resort condominium on the best location that offers
        walking-distance</span
      >
      <span class="block"
        >convenience amidst serene comfort among unique greenery shade over 25
        rai area.</span
      >
    </p>
  </div>

  <!-- Our Business Section Header -->
  <div
    class="py-10 sm:py-16 lg:py-20 flex flex-col justify-center space-y-4 sm:space-y-6 px-4 sm:px-8 lg:px-96"
  >
    <div class="flex items-center w-full">
      <hr class="flex-grow border-t-2 sm:border-t-3 border-[#ecbc85]" />
      <h2
        class="px-3 sm:px-6 text-xl sm:text-3xl lg:text-4xl font-bold text-[#36384f] whitespace-nowrap"
      >
        OUR BUSINESS
      </h2>
      <hr class="flex-grow border-t-2 sm:border-t-3 border-[#ecbc85]" />
    </div>
  </div>

  <!-- Business Items -->
  <div
    class="flex flex-col space-y-12 sm:space-y-16 lg:space-y-20 px-4 sm:px-8 lg:px-96 pb-16 sm:pb-24 lg:pb-32"
  >
    <!-- Ramada Emerald Bay -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-x-20">
      <div class="lg:col-span-7 order-2 lg:order-1">
        <div
          class="flex flex-col justify-center h-full space-y-4 sm:space-y-6 lg:space-y-8 w-full"
        >
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#36384f]">
            RAMADA EMERALD BAY
          </h2>
          <hr
            class="border-t-2 sm:border-t-3 border-[#ecbc85] w-full sm:w-4/5"
          />
          <p class="text-sm sm:text-base lg:text-xl text-[#2c3c51]">
            <span class="block mb-2"
              >The allure of silence on the prime spot.</span
            >
            <span class="block mb-2"
              >The new treasure of investment on the kingdom of perfect
              ease</span
            >
            <span class="block">and privacy.</span>
          </p>
          <NuxtLink
            class="bg-[#36364e] w-full sm:w-48 lg:w-40 py-2 sm:py-3 flex justify-center text-white text-base sm:text-lg lg:text-xl duration-200 hover:bg-[#ecbc85]"
            to="/"
          >
            VIEW MORE
          </NuxtLink>
        </div>
      </div>
      <div class="lg:col-span-5 order-1 lg:order-2">
        <NuxtImg
          class="w-full h-64 sm:h-80 lg:h-full object-cover rounded-lg lg:rounded-none"
          src="https://emeraldbaypattaya.com/wp-content/uploads/2019/11/img-ramada.png"
          alt="Ramada Emerald Bay"
        />
      </div>
    </div>

    <!-- Convilla -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-x-20">
      <div class="lg:col-span-5 order-1">
        <NuxtImg
          class="w-full h-64 sm:h-80 lg:h-full object-cover rounded-lg lg:rounded-none"
          src="https://emeraldbaypattaya.com/wp-content/uploads/2019/11/img-villa.png"
          alt="CONVILLA"
        />
      </div>
      <div class="lg:col-span-7 order-2">
        <div
          class="flex flex-col justify-center h-full space-y-4 sm:space-y-6 lg:space-y-8 w-full"
        >
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#36384f]">
            CONVILLA
          </h2>
          <hr
            class="border-t-2 sm:border-t-3 border-[#ecbc85] w-full sm:w-4/5"
          />
          <p class="text-sm sm:text-base lg:text-xl text-[#2c3c51]">
            <span class="block mb-2">Uniqueness in synchronicity.</span>
            <span class="block mb-2">A new dimension of condominium</span>
            <span class="block mb-2">that brings more to you than ever.</span>
            <span class="block mt-4 sm:mt-6 lg:mt-8 mb-2"
              >The best convergence of condo and villa,</span
            >
            <span class="block"
              >to create the new definition of living: "CONVILLA".</span
            >
          </p>
          <NuxtLink
            class="bg-[#36364e] w-full sm:w-48 lg:w-40 py-2 sm:py-3 flex justify-center text-white text-base sm:text-lg lg:text-xl duration-200 hover:bg-[#ecbc85]"
            to="/"
          >
            VIEW MORE
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="bg-[#1d1d39] px-4 sm:px-8 lg:px-96 py-12 sm:py-16 lg:py-20">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-24"
    >
      <!-- Contact Us -->
      <div class="sm:col-span-2 lg:col-span-4">
        <div class="flex flex-col space-y-4 sm:space-y-5">
          <p class="text-white font-bold text-xl sm:text-2xl">CONTACT US</p>
          <div class="flex flex-col space-y-3 text-sm sm:text-base">
            <div class="flex items-center space-x-3">
              <Icon
                name="fa-solid:phone"
                class="text-white rotate-100 text-base sm:text-lg"
              />
              <a
                class="text-white hover:text-[#ecbc85] transition-colors"
                href="tel:+66616109888"
              >
                (+66) 61-610-9888
              </a>
            </div>
            <div class="flex items-center space-x-3">
              <Icon
                name="fa-solid:envelope"
                class="text-white text-base sm:text-lg"
              />
              <a
                class="text-white hover:text-[#ecbc85] transition-colors"
                href="mailto:info@emeraldbaypattaya.com"
              >
                info@emeraldbaypattaya.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Location -->
      <div class="sm:col-span-2 lg:col-span-4">
        <div class="flex flex-col space-y-4 sm:space-y-5">
          <p class="text-white font-bold text-xl sm:text-2xl">LOCATION</p>
          <div class="flex flex-col space-y-1 text-xs sm:text-sm">
            <p class="text-white">XJ Development Co., Ltd. (HQ)</p>
            <p class="text-white">
              11/1 AIA Sathorn Tower, 10th Floor, Unit S10016
            </p>
            <p class="text-white">South Sathorn Road, Yannawa Sub-District,</p>
            <p class="text-white">Sathorn District, Bangkok 10120</p>
          </div>
        </div>
      </div>

      <!-- Social Media -->
      <div class="sm:col-span-2 lg:col-span-4">
        <div class="flex flex-col space-y-4 sm:space-y-5">
          <p class="text-white font-bold text-xl sm:text-2xl">FOLLOW US</p>
          <div class="flex space-x-4 sm:space-x-6 items-center">
            <a
              href="#"
              class="text-white hover:text-[#ecbc85] transition-colors"
            >
              <Icon name="fa-brands:facebook" class="text-2xl sm:text-3xl" />
            </a>
            <a
              href="#"
              class="text-white hover:text-[#ecbc85] transition-colors"
            >
              <Icon name="fa-brands:line" class="text-2xl sm:text-3xl" />
            </a>
            <a
              href="#"
              class="text-white hover:text-[#ecbc85] transition-colors"
            >
              <Icon name="fa-brands:instagram" class="text-2xl sm:text-3xl" />
            </a>
            <a
              href="#"
              class="text-white hover:text-[#ecbc85] transition-colors"
            >
              <Icon name="fa-brands:youtube" class="text-2xl sm:text-3xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!-- Mobile/Tablet Bottom Bar -->
  <div
    class="lg:hidden fixed bottom-0 left-0 right-0 bg-[#1d1d39] shadow-2xl z-50 border-t border-white/10"
  >
    <div class="grid grid-cols-3 h-20">
      <!-- Tel Button -->
      <a
        href="tel:+66616109888"
        class="flex flex-col items-center justify-center space-y-1 hover:bg-white/10 transition-colors"
      >
        <Icon name="fa-solid:phone" class="text-white text-2xl" />
        <span class="text-white text-xs font-semibold tracking-wider">TEL</span>
      </a>

      <!-- Line Button -->
      <a
        href="https://line.me/ti/p/~emeraldbaypattaya"
        target="_blank"
        class="flex flex-col items-center justify-center space-y-1 hover:bg-white/10 transition-colors border-x border-white/10"
      >
        <Icon name="fa-brands:line" class="text-white text-2xl" />
        <span class="text-white text-xs font-semibold tracking-wider"
          >LINE</span
        >
      </a>

      <!-- Register Button -->
      <a
        href="#register"
        class="flex flex-col items-center justify-center space-y-1 hover:bg-white/10 transition-colors"
      >
        <Icon name="fa-solid:edit" class="text-white text-2xl" />
        <span class="text-[#ecbc85] text-xs font-semibold tracking-wider"
          >REGISTER</span
        >
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = [
  "https://picsum.photos/1920/1080?random=1",
  "https://picsum.photos/1920/1080?random=2",
  "https://picsum.photos/1920/1080?random=3",
];
</script>
