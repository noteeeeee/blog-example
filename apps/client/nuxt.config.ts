import { EnvConfig } from "@app/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/scss/main.scss"],
  modules: ["@vueuse/nuxt", "@nuxtjs/tailwindcss", "@pinia/nuxt"],
  runtimeConfig: {
    public: {
      apiBaseurl: EnvConfig.API_BASEURL,
    },
  },
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1" },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate", "storeToRefs"],
  },
  imports: {
    dirs: ["stores"],
  },
  // devtools: { enabled: true }
});
