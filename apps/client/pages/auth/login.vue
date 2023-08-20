<template>
  <div class="w-full flex flex-col items-center">
    <client-only>
      <error-alert v-if="toast" content="Invalid login or password" />
      <div
        class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8"
      >
        <form @submit.prevent="loginExec()" class="space-y-6" action="#">
          <h5 class="text-xl font-medium text-gray-900">
            Sign in to our platform
          </h5>
          <text-field
            type="text"
            label="Your username"
            v-model="$v.username.$model"
            :errors="$v.username.$errors"
            placeholder="Username"
          />
          <text-field
            type="password"
            label="Your password"
            v-model="$v.password.$model"
            :errors="$v.password.$errors"
            placeholder="••••••••"
          />
          <button-with-loading
            label="Sign in to account"
            type="submit"
            :loading="loading"
          />
          <div class="text-sm font-medium text-gray-500">
            Not registered?
            <nuxt-link to="/auth/register" class="text-blue-700 hover:underline"
              >Create account</nuxt-link
            >
          </div>
        </form>
      </div>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";

useHead({
  title: "Sign in",
});

const { login: loginStore } = useAccountStore();
const router = useRouter();

const toast = ref(false);
const loading = ref(false);
const state = reactive({
  username: null,
  password: null,
});
const rules = {
  username: {
    required,
  },
  password: {
    required,
    minLength: minLength(4),
    maxLength: maxLength(20),
  },
};
const $v = useVuelidate(rules, state);

async function login() {
  const correct = await $v.value.$validate();
  if (correct) {
    try {
      await loginStore(state.username!, state.password!);
      router.push("/");
    } catch (e) {
      toast.value = true;
    }
  }

  loading.value = false;
}

const debounceLogin = useDebounceFn(login, 100);
const loginExec = () => {
  loading.value = true;
  debounceLogin();
};
</script>
