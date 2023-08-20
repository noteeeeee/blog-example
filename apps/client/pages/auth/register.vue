<template>
  <div class="w-full flex flex-col items-center">
    <client-only>
      <error-alert v-if="toast" content="An account already exists" />
      <div
        class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8"
      >
        <form @submit.prevent="registerExec()" class="space-y-6" action="#">
          <h5 class="text-xl font-medium text-gray-900">
            Sign up to our platform
          </h5>
          <text-field
            type="text"
            label="Username"
            v-model="$v.username.$model"
            :errors="$v.username.$errors"
            placeholder="Username"
          />
          <text-field
            type="password"
            label="Password"
            v-model="$v.password.$model"
            :errors="$v.password.$errors"
            placeholder="••••••••"
          />
          <text-field
            type="password"
            label="Confirm password"
            v-model="$v.passwordConfirm.$model"
            :errors="$v.passwordConfirm.$errors"
            placeholder="••••••••"
          />
          <button-with-loading
            label="Create account"
            type="submit"
            :loading="loading"
          />
          <div class="text-sm font-medium text-gray-500">
            Already have an account?
            <nuxt-link to="/auth/login" class="text-blue-700 hover:underline"
              >Login</nuxt-link
            >
          </div>
        </form>
      </div>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, maxLength, sameAs } from "@vuelidate/validators";

useHead({
  title: "Sign up",
});

const { register: registerStore } = useAccountStore();
const router = useRouter();

const toast = ref(false);
const loading = ref(false);
const state = reactive({
  username: null,
  password: null,
  passwordConfirm: null,
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
  passwordConfirm: {
    required,
    sameAs: sameAs(computed(() => state.password)),
  },
};
const $v = useVuelidate(rules, state);

async function register() {
  const correct = await $v.value.$validate();
  if (correct) {
    try {
      await registerStore(
        state.username!,
        state.password!,
        state.passwordConfirm!
      );
      router.push("/");
    } catch (e) {
      toast.value = true;
    }
  }

  loading.value = false;
}

const debounceRegister = useDebounceFn(register, 100);
const registerExec = () => {
  loading.value = true;
  debounceRegister();
};
</script>
