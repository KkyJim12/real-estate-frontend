<template>
  <!-- Mobile/Tablet Bottom Bar -->
  <div class="lg:hidden fixed bottom-0 left-0 right-0 bg-[#1d1d39] shadow-2xl z-50 border-t border-white/10">
    <div class="grid grid-cols-3 h-20">
      <!-- Tel Button -->
      <a
        href="tel:+66616109888"
        class="flex flex-col items-center justify-center space-y-1 hover:bg-white/10 transition-colors"
      >
        <Icon name="fa-solid:phone" class="text-white text-2xl" />
        <span class="text-white text-xs font-semibold tracking-wider">{{ $t('bottomBar.tel') }}</span>
      </a>

      <!-- Line Button -->
      <a
        href="https://line.me/ti/p/~emeraldbaypattaya"
        target="_blank"
        class="flex flex-col items-center justify-center space-y-1 hover:bg-white/10 transition-colors border-x border-white/10"
      >
        <Icon name="fa-brands:line" class="text-white text-2xl" />
        <span class="text-white text-xs font-semibold tracking-wider">{{ $t('bottomBar.line') }}</span>
      </a>

      <!-- Register Button -->
      <a
        href="#register"
        class="flex flex-col items-center justify-center space-y-1 hover:bg-white/10 transition-colors"
      >
        <Icon name="fa-solid:edit" class="text-white text-2xl" />
        <span class="text-white text-xs font-semibold tracking-wider">{{ $t('bottomBar.register') }}</span>
      </a>
    </div>
  </div>
</template>
