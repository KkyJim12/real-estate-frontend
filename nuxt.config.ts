import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/ui",
  ],
  css: ["./app/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  font: {
    families: [
      // You can load Kanit directly from Google Fonts
      {
        name: "Kanit",
        provider: "google", // default provider is google
        weights: [400],
        styles: ["normal"],
        display: "swap",
      },
    ],
  },
});
