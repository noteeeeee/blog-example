<template>
  <div>
    <NavBar />
    <div class="mt-24 container mx-auto px-2 pb-10">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import { initFlowbite } from 'flowbite'

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Blog` : 'Blog';
  }
})

onMounted(() => {
    initFlowbite();
})
</script>
