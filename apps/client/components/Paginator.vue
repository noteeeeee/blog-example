<template>
  <ul class="flex items-center -space-x-px h-8 text-sm w-full">
    <li>
      <button
        @click="emit('page', meta.currentPage - 1)"
        :disabled="meta.currentPage == 1 || props.loading"
        class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
      >
        <svg
          class="w-2.5 h-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
      </button>
    </li>
    <li v-for="i in paginatorPages">
      <button
        @click="emit('page', i)"
        :disabled="props.loading"
        :key="i"
        :class="
          i == meta.currentPage
            ? 'bg-blue-700 text-white hover:bg-blue-800'
            : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700'
        "
        class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 "
      >
        {{ i }}
      </button>
    </li>
    <li>
      <button
        @click="emit('page', meta.currentPage + 1)"
        :disabled="meta.currentPage == meta.totalPages || props.loading"
        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
      >
        <svg
          class="w-2.5 h-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
  meta: {
    currentPage: number;
    totalPages: number;
  };
  totalPages: number,
  loading?: boolean
}>();

const emit = defineEmits(["page"]);
const paginatorPages = computed(() => {
  const buttons = [];

  var start = Math.max(1, props.meta.currentPage - 2);
  var end = Math.min(start + props.totalPages - 1, props.meta.totalPages);

  for (var i = start; i <= end; i++) {
    buttons.push(i);
  }

  return buttons;
});
</script>
