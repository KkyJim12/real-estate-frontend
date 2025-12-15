<template>
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
                            <a class="text-white hover:text-[#ecbc85] transition-colors"
                                href="mailto:info@emeraldbaypattaya.com">
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
</template>