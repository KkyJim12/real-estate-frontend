import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2024-12-15",
  devtools: { enabled: false },
  ssr: true,
  nitro: {
    preset: 'vercel'
  },
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxtjs/i18n",
  ],
  css: ["./app/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    domains: ["emeraldbaypattaya.com", "picsum.photos"],
  },
  fonts: {
    families: [
      {
        name: "Kanit",
        provider: "google",
        weights: [400],
        styles: ["normal"],
        display: "swap",
      },
    ],
  },
  i18n: {
    locales: [
      {
        code: "en",
        name: "English",
        iso: "en-US",
        file: "en.json",
      },
      {
        code: "th",
        name: "ไทย",
        iso: "th-TH",
        file: "th.json",
      },
      {
        code: "zh",
        name: "中文",
        iso: "zh-CN",
        file: "zh.json",
      },
    ],
    langDir: "locales",
    defaultLocale: "en",
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },
});
