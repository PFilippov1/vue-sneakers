<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      v-for="item in items"
      :id="item.id"
      :key="item.id"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
      :onClickFavorite="() => addToFavorite(item)"
    />
  </div>
</template>

<script setup>
import Card from './Card.vue'
import { inject } from 'vue'

defineProps({
  items: Array
})

//TODO
const onClickAdd = () => {
  console.log('add')
}

const addToFavorite = inject('addToFavorite')
</script>
