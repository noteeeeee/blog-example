<template>
  <div class="w-full flex flex-col items-center">
    <client-only>
      <div
        v-if="toast"
        class="flex items-center w-full max-w-sm p-4 mb-4 text-gray-500 bg-white rounded-lg shadow"
        role="alert"
      >
        <div
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
            />
          </svg>
        </div>
        <div class="ml-3 text-sm font-normal">An account already exists</div>
      </div>
      <div
        class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8"
      >
        <form @submit.prevent="registerExec()" class="space-y-6" action="#">
          <h5 class="text-xl font-medium text-gray-900">
            Sign up to our platform
          </h5>
          <div>
            <label
              for="username"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Username</label
            >
            <input
              type="text"
              id="username"
              v-model="$v.username.$model"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Username"
            />
            <small
              class="text-red-500"
              v-for="error in $v.username.$errors"
              :key="error.$uid"
              >{{ error.$message }}</small
            >
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Password</label
            >
            <input
              type="password"
              id="password"
              v-model="$v.password.$model"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <small
              class="text-red-500"
              v-for="error in $v.password.$errors"
              :key="error.$uid"
              >{{ error.$message }}</small
            >
          </div>
          <div>
            <label
              for="passwordConfirm"
              class="block mb-2 text-sm font-medium text-gray-900"
              >Confirm password</label
            >
            <input
              type="password"
              id="passwordConfirm"
              v-model="$v.passwordConfirm.$model"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <small
              class="text-red-500"
              v-for="error in $v.passwordConfirm.$errors"
              :key="error.$uid"
              >{{ error.$message }}</small
            >
          </div>
          <button
            :disabled="loading"
            type="submit"
            class="w-full text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            :class="
              !loading &&
              'hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
            "
          >
            <svg
              v-if="loading"
              aria-hidden="true"
              role="status"
              class="inline w-4 h-4 mr-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            <span v-if="loading">Loading...</span>
            <span v-else>Create account</span>
          </button>
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
  title: "Sign up"
})

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
