<template>
  <div class="flex flex-col items-center text-center w-72 mx-auto">
    <img height="80" width="80" :src="imgUrl" alt="info image ">
    <h2 class="mt-4 font-medium text-2xl">{{ title }}</h2>
    <p class="text-grey-400 mt-2">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ imgUrl: string; title: string; description: string }>()
</script>
