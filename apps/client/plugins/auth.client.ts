export default defineNuxtPlugin(async (nuxtApp) => {
  // @ts-ignore
  const accountStore = useAccountStore(nuxtApp.$pinia);
  await accountStore.fetch();

  addRouteMiddleware(
    "auth",
    async (to) => {
      const isAuth = [
        "/auth/login",
        "/auth/login/",
        "/auth/register",
        "/auth/register/",
      ].includes(to.path);

      if (!accountStore.isLoading && isAuth && accountStore.account) {
        return navigateTo("/");
      } else abortNavigation();
    },
    {
      global: true,
    }
  );
});
