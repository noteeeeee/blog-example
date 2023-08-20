export const useAccountStore = defineStore("account", {
  state: () => ({
    isLoading: true as boolean,
    account: null as any | null,
    loggedIn: false as boolean,
  }),

  actions: {
    async fetch() {
      try {
        this.account = await useAxiosInstance()
          .get("/auth/me")
          .then((res) => res.data);
        this.loggedIn = true;
      } catch {}
      this.isLoading = false;
    },
    async logout() {
      this.account = null;
      this.loggedIn = false;
      localStorage.removeItem("accessToken");
    },
    async login(username: string, password: string) {
      this.isLoading = true;
      const data = await useAxiosInstance()
        .post("/auth/login", { username, password })
        .then((res) => res.data as any);
      this.loggedIn = true;
      this.account = data.user;
      this.isLoading = false;
      localStorage.setItem("accessToken", data.accessToken);
    },
    async register(username: string, password: string, passwordConfirm: string) {
      this.isLoading = true;
      const data = await useAxiosInstance()
        .post("/auth/register", { username, password, passwordConfirm })
        .then((res) => res.data as any);
      this.loggedIn = true;
      this.account = data.user;
      this.isLoading = false;
      localStorage.setItem("accessToken", data.accessToken);
    },
  },
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot));
}