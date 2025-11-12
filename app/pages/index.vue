<template>
    <nav class="h-28 px-60 bg-[#1d1d39] flex items-center justify-between relative">
        <div class="flex items-center space-x-6">
            <div class="flex space-x-2 items-center group cursor-pointer">
                <Icon name="fa-brands:facebook" class="text-white text-2xl" />
                <a class="text-white group-hover:text-[#ecbc85] text-sm" href="#">emeraldbaypattaya</a>
            </div>

            <div class="flex space-x-2 items-center group cursor-pointer">
                <Icon name="fa-solid:phone" class="text-white text-xl rotate-100" />
                <a class="text-white group-hover:text-[#ecbc85]  ext-sm" href="#">(+66) 61-610-9888</a>
            </div>
        </div>

        <div class="absolute left-1/2 transform -translate-x-1/2">
            <NuxtImg class="w-28" src="https://emeraldbaypattaya.com/wp-content/uploads/2019/11/logo-new.png"
                alt="Emerald Bay Pattaya" />
        </div>

        <div class="flex items-center space-x-3">
            <Icon name="fa-solid:globe" class="text-white text-xl" />
            <a class="text-white hover:text-[#ecbc85] text-sm" href="#">EN</a>
            <span class="text-white">/</span>
            <a class="text-white hover:text-[#ecbc85] text-sm" href="#">TH</a>
            <span class="text-white">/</span>
            <a class="text-white hover:text-[#ecbc85] text-sm" href="#">中文</a>
        </div>
    </nav>
    <UCarousel v-slot="{ item }" :items="items" loop :autoplay="{ delay: 4000 }" arrows dots
        class="w-full h-[calc(100vh-7rem)] overflow-hidden" :ui="{
            container: 'h-full overflow-hidden',
            item: 'h-full flex-shrink-0 overflow-hidden',
            dots: 'absolute bottom-6 left-0 right-0 flex justify-center space-x-3 z-20',
            dot: 'h-1 w-10 rounded-sm bg-[#ecbc85]/50 data-[active=true]:bg-[#ecbc85] transition-colors duration-300'
        }">
        <div class="relative w-full h-full">
            <img :src="item" alt="" class="object-cover w-full h-full rounded-none" />
        </div>
    </UCarousel>
    <div class="py-20 flex flex-col items-center justify-center space-y-6 px-96">
        <h2 class="text-4xl font-bold text-[#36384f]">ABOUT US</h2>
        <p class="text-xl flex flex-col spsace-y-4 text-[#2c3c51] text-center">
            <span>Recharge your happiness upon perfection at...EMERALD BAY PATTAYA</span>
            <span> the luxurious resort condominium on the best location that offers walking-distance</span>
            <span>convenience amidst serene comfort among unique greenery shade over 25 rai area.</span>
        </p>
    </div>
    <div class="py-20 flex flex-col justify-center space-y-6 px-96">
        <div class="flex items-center w-full">
            <hr class="flex-grow border-t-3 border-[#ecbc85]" />
            <h2 class="px-6 text-4xl font-bold text-[#36384f] whitespace-nowrap">OUR BUSINESS</h2>
            <hr class="flex-grow border-t-3 border-[#ecbc85]" />
        </div>
    </div>
    <div class="flex flex-col space-y-20 px-96 pb-32">
        <div class="grid grid-cols-12 gap-x-20">
            <div class="col-span-7">
                <div class="flex flex-col justify-center h-full space-y-8 w-full">
                    <h2 class="text-4xl font-bold text-[#36384f] whitespace-nowrap">RAMADA EMERALD BAY</h2>
                    <hr class="border-t-3 border-[#ecbc85] w-4/5" />
                    <p class="text-xl flex flex-col spsace-y-4 text-[#2c3c51] text-left">
                        <span>The allure of silence on the prime spot.</span>
                        <span>The new treasure of investment on the kingdom of perfect ease</span>
                        <span>and privacy.</span>
                    </p>
                    <NuxtLink
                        class="bg-[#36364e] w-40 py-2 flex justify-center text-white text-xl duration-200 hover:bg-[#ecbc85]"
                        to="/">
                        VIEW MORE
                    </NuxtLink>
                </div>
            </div>
            <div class="col-span-5">
                <NuxtImg class="w-full h-full"
                    src="https://emeraldbaypattaya.com/wp-content/uploads/2019/11/img-ramada.png"
                    alt="Ramada Emerald Bay" />
            </div>
        </div>
        <div class="grid grid-cols-12 gap-x-20">
            <div class="col-span-5">
                <NuxtImg class="w-full h-full"
                    src="https://emeraldbaypattaya.com/wp-content/uploads/2019/11/img-villa.png" alt="CONVILLA" />
            </div>
            <div class="col-span-7">
                <div class="flex flex-col justify-center h-full space-y-8 w-full">
                    <h2 class="text-4xl font-bold text-[#36384f] whitespace-nowrap">CONVILLA</h2>
                    <hr class="border-t-3 border-[#ecbc85] w-4/5" />
                    <p class="text-xl flex flex-col spsace-y-4 text-[#2c3c51] text-left">
                        <span>Uniqueness in synchronicity.</span>
                        <span>A new dimension of condominium</span>
                        <span>that brings more to you than ever.</span>
                        <span class="mt-8">The best convergence of condo and villa,</span>
                        <span>to create the new definition of living: “CONVILLA”.</span>
                    </p>
                    <NuxtLink
                        class="bg-[#36364e] w-40 py-2 flex justify-center text-white text-xl duration-200 hover:bg-[#ecbc85]"
                        to="/">
                        VIEW MORE
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
    <footer class="bg-[#1d1d39] h-96 pb-40"></footer>
</template>

<script setup lang="ts">
const items = [
    "https://picsum.photos/1920/1080?random=1",
    "https://picsum.photos/1920/1080?random=2",
    "https://picsum.photos/1920/1080?random=3"
];
</script>
