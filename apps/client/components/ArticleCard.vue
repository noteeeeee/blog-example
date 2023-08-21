<template>
  <div class="p-6 bg-white border border-gray-200 rounded-lg shadow mb-6">
    <slot>
      <div class="flex items-center gap-2 mb-2 flex-wrap">
        <a href="#">
          <h5 class="text-2xl font-bold tracking-tight text-gray-900">
            {{ item.title }}
          </h5>
        </a>
        <p class="text-sm text-gray-600">
          {{ $dayjs(item.created).format("ll") }}
        </p>
      </div>
      <p class="mb-3 font-normal text-gray-700">
        {{ item.shortContent }}
      </p>
    </slot>
    <slot name="buttons">
      <nuxt-link
        :to="`/articles/${item.uuid}`"
        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        Read more
        <svg
          class="w-3.5 h-3.5 ml-2"
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
    </slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  item: {
    uuid: string;
    title: string;
    shortContent: string;
    author: any;
    created: Date;
  };
}>();
</script>
