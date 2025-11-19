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

<script lang="ts" setup>
import Card from './Card.vue'
import type { Item } from '@/types/index'

interface Props {
  items: Item[]
  isFavorites?: boolean 
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'addToFavorite', item: Item): void
  (e: 'addToCart', item: Item): void
}>()
</script>
