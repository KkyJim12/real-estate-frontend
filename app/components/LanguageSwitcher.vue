<template>
  <div class="flex items-center space-x-2">
    <template v-for="(locale, index) in availableLocales" :key="locale.code">
      <button
        type="button"
        @click="setLocale(locale.code)"
        :class="[
          'hover:text-[#ecbc85] transition-colors cursor-pointer',
          currentLocale === locale.code
            ? 'text-[#ecbc85] font-bold'
            : 'text-white',
        ]"
      >
        {{ locale.name }}
      </button>
      <span v-if="index < availableLocales.length - 1" class="text-white"
        >/</span
      >
    </template>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale: switchLocale } = useI18n();

const currentLocale = computed(() => locale.value);

const availableLocales = computed(() => {
  return locales.value.map((l: any) => ({
    code: l.code,
    name: l.name || l.code.toUpperCase(),
  }));
});

const setLocale = (code: string) => {
  switchLocale(code as "en" | "th" | "zh");
};
</script>
