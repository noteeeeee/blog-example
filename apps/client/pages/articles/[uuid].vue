<template>
  <section class="bg-white" v-if="article">
    <div class="px-4 mx-auto max-w-3xl">
      <h2 class="mb-4 text-xl font-bold text-gray-900 flex items-center gap-2">
        <nuxt-link
          to="/"
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
        {{ article.title }}
      </h2>
      <div
        class="p-6 bg-white border border-gray-200 rounded-lg shadow mb-6"
        v-html="article.content"
      ></div>
      <div v-if="comments">
        <h2 class="mb-4 mt-10 text-xl font-bold text-gray-900">
          Discussion ({{ comments?.length }})
        </h2>
        <div
          v-for="comment, i in comments"
          :key="comment.uuid"
          class="mb-6 text-base bg-white"
          :class="i !== 0 && 'border-t border-gray-200 pt-6'"
        >
          <div class="flex justify-between items-center mb-2">
            <div class="flex items-center">
              <p class="inline-flex items-center mr-3 text-sm text-gray-900">
                {{ comment.author.username }}
              </p>
              <p class="text-sm text-gray-600">
                {{ $dayjs(comment.created).format('lll') }}
              </p>
            </div>
          </div>
          <p class="text-gray-500">
            {{ comment.content }}
          </p>
        </div>
        <form
          @submit.prevent="createCommentExec()"
          class="rounded-lg mb-6 overflow-hidden"
        >
          <div
            v-if="!loggedIn"
            class="w-full py-6 backdrop-blur-sm flex justify-center items-center text-xl font-bold text-black bg-black/5 flex-col gap-2"
          >
            <error-alert
              class="max-w-xs"
              content="Please sign in to post comments"
            />
            <nuxt-link
              to="/auth/login"
              class="px-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2 text-center mr-3 md:mr-0"
            >
              Login
            </nuxt-link>
          </div>
          <div v-if="loggedIn">
            <text-area-field
              v-model="$v.content.$model"
              :errors="$v.content.$errors"
              label=""
              placeholder="Write your message..."
            />
            <button-with-loading
              :loading="loadingCommentCreate"
              class="mt-4 block"
              label="Post comment"
            />
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const loadingCommentCreate = ref(false);
const { loggedIn } = storeToRefs(useAccountStore());
const route = useRoute();
const { execute: loadArticle, data: article } = useAxios<any>(
  `/articles/${route.params.uuid}`,
  undefined,
  {
    immediate: false,
  }
);
const { data: comments, execute: loadComments } = useAxios<any[]>(
  `/comment/article/${route.params.uuid}`
);

const state = reactive({
  content: null,
  article_id: route.params.uuid,
});

const rules = {
  content: {
    required,
  },
};
const $v = useVuelidate(rules, state);

async function createComment() {
  const correct = await $v.value.$validate();
  if (correct) {
    try {
      await useAxiosPost("/comment", { data: state });
      state.content = null;
      $v.value.$reset();
      loadComments();
    } catch {}
  }

  loadingCommentCreate.value = false;
}

const debounceCreateComment = useDebounceFn(createComment, 100);
const createCommentExec = () => {
  loadingCommentCreate.value = true;
  debounceCreateComment();
};

onMounted(() => loadArticle().catch(() => showError({ statusCode: 404 })));
</script>
