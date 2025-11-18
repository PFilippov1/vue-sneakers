<template>
  <em v-auto-animate class="grid grid-cols-4 gap-5">
    <Card
      v-for="item in items"
      :id="item.id"
      :key="item.id"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
      :onClickFavorite="isFavorites ? undefined : () => emit('addToFavorite', item)"
      :onClickAdd="isFavorites ? undefined : () => emit('addToCart', item)"
    />
  </em>
</template>

<script  lang="ts" setup>

import Card from './Card.vue'

interface Props {
  items: Array<any>;
  isFavorites: boolean;
}

defineProps<Props>();
const emit = defineEmits(['addToFavorite', 'addToCart']);
</script>
