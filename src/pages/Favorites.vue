<template>
  <h2 class="text-3xl font-bold mb-8">Favorites</h2>
  <CardList :items="favorites" :is-favorites="true" />
</template>

<script setup>
import axios from 'axios'
import CardList from '../components/CardList.vue'
import { onMounted, ref } from 'vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://10eb8e970dd245c5.mokky.dev/favorites?_relations=items'
    )
    favorites.value = data.map((obj) => obj.item)
  } catch (error) {
    console.log(error)
  }
})
</script>
