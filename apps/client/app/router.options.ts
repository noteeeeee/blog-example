import type { RouterConfig } from "@nuxt/schema";

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition || to.fullPath == from.fullPath) {
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
};
