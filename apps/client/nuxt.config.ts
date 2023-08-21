import { EnvConfig } from "@app/config";
import dynamicRoutes from "./helpers/dynamicRoutes";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/scss/main.scss"],
  modules: [
    "@funken-studio/sitemap-nuxt-3",
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
  ],
  sitemap: {
    hostname: EnvConfig.APP_BASEURL,
    exclude: ['/dashboard/**', '/dashboard'],
    cacheTime: 10,
    routes: dynamicRoutes,
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date().toISOString(),
    },
  },
  runtimeConfig: {
    public: {
      apiBaseurl: EnvConfig.API_BASEURL,
    },
  },
  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1",
        },
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
