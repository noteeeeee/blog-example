<template>
  <section class="bg-white">
    <div v-if="!isLoading" class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 class="mb-4 text-xl font-bold text-gray-900flex items-center gap-2">
        <nuxt-link
          to="/dashboard"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          <svg
            class="w-3.5 h-3.5 rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </nuxt-link>
        Edit article
      </h2>
      <form @submit.prevent="editExec()" action="#">
        <div class="flex flex-col gap-6">
          <error-alert
            class="col-span-2"
            v-if="toast"
            content="Unknown error! Check browser logs"
          />
          <TextField
            :required="true"
            class="col-span-2"
            label="Title"
            type="text"
            :errors="$v.title.$errors"
            v-model="$v.title.$model"
            placeholder="Article title"
          />
          <TextAreaField
            :required="true"
            class="col-span-2"
            label="Short content"
            placeholder="Article short content..."
            :errors="$v.shortContent.$errors"
            v-model="$v.shortContent.$model"
          />
          <EditorField
            :required="true"
            class="col-span-2"
            label="Content"
            :errors="$v.content.$errors"
            v-model="$v.content.$model"
          />
          <button-with-loading
            label="Edit article"
            type="submit"
            :loading="loading"
          />
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

useHead({
  title: "Create article",
});

const route = useRoute();
const { execute, isLoading } = useAxios(
  `/articles/${route.params.uuid}`,
  undefined,
  { immediate: false }
);
const router = useRouter();
const loading = ref(false);
const toast = ref(false);
const state = reactive({
  title: null,
  shortContent: null,
  content: null,
});

const rules = {
  title: {
    required,
  },
  shortContent: {
    required,
  },
  content: {
    required,
  },
};
const $v = useVuelidate(rules, state);

async function edit() {
  const correct = await $v.value.$validate();
  if (correct) {
    try {
      await useAxiosPatch(`/articles/${route.params.uuid}`, { data: state });
      router.push("/dashboard");
    } catch (e) {
      toast.value = true;
    }
  }

  loading.value = false;
}

const debounceEdit = useDebounceFn(edit, 100);
const editExec = () => {
  loading.value = true;
  debounceEdit();
};

onMounted(() =>
  execute().then(({ data, error }: any) => {
    if (data.value) {
      state.content = data.value.content;
      state.shortContent = data.value.shortContent;
      state.title = data.value.title;
    }
  }).catch(() => showError({ statusCode: 404 }))
);
</script>
