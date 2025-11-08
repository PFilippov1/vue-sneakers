<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      v-for="item in items"
      :key="item.id"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
      @click-favorite="item.isFavorite = !item.isFavorite"
      @click-add="onClickAdd"
    />
  </div>
</template>

<script setup>
import Card from './Card.vue'
defineProps({
  items: Array
})

const onClickAdd = () => {
  console.log('add')
}
</script>
