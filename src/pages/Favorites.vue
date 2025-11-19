<template>
  <h2 class="text-3xl font-bold mb-8">Favorites</h2>
  <CardList :items="favorites" :is-favorites="true" />
</template>

<script setup lang="ts">
import axios from 'axios'
import CardList from '../components/CardList.vue'
import { onMounted, ref } from 'vue'
import { Item, FavoriteResponseItem } from '../types/index'

const favorites = ref<Item[]>([])

onMounted(async () => {
  try {
    const { data } = await axios.get<FavoriteResponseItem[]>(
      'https://10eb8e970dd245c5.mokky.dev/favorites?_relations=items'
    )

    favorites.value = data.map((obj) => obj.item)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error Axios:', error.message)
    } else {
      console.error('Unknown error:', error)
    }
  }
})
</script>
