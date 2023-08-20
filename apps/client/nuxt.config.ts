import { EnvConfig } from "@app/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@vueuse/nuxt", "@nuxtjs/tailwindcss", "@pinia/nuxt"],
  runtimeConfig: {
    public: {
      apiBaseurl: EnvConfig.API_BASEURL,
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
