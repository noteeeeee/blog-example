<template>
  <div>
    <NavBar />
    <div class="mt-24 container mx-auto pb-10">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Blog` : 'Blog';
  }
})
</script>
