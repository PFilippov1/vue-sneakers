<template>
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-8">All sneakers</h2>

    <div class="flex gap-5">
      <select class="px-3 py-2 border rounded-md outline-none" @change="onChangeSelect">
        <option value="name">Name</option>
        <option value="price">Price &uarr;</option>
        <option value="-price">Price &darr;</option>
      </select>

      <div class="relative">
        <img class="absolute left-4 top-3" src="/search.svg" >
        <input
          class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
          type="text"
          placeholder="Search..."
          @input="onChangeSearchInput"
        >
      </div>
    </div>
  </div>

  <div class="mt-10">
    <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickPlus" />
  </div>
</template>

<script setup>
import CardList from '@/components/CardList.vue'
import axios from 'axios'
import { inject, ref, reactive, watch, onMounted } from 'vue'
const items = ref([])
const { cart, addToCart, removeFromCart } = inject('cart')

const onClickPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id
      }
      item.isFavorite = true
      const { data } = await axios.post(`https://10eb8e970dd245c5.mokky.dev/favorites`, obj)

      item.favoriteId = data.id
    } else {
      await axios.delete(`https://10eb8e970dd245c5.mokky.dev/favorites/${item.favoriteId}`)
      item.isFavorite = false
      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }
}

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})

watch(filters, async () => {
  fetchItems()
})

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

const fetchItems = async () => {
  const params = {
    sortBy: filters.sortBy
  }
  if (filters.searchQuery) {
    params.title = `*${filters.searchQuery}*`
  }

  try {
    const { data } = await axios.get(`https://10eb8e970dd245c5.mokky.dev/items`, { params })
    items.value = data
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (error) {
    console.log(error)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://10eb8e970dd245c5.mokky.dev/favorites`)
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id)

      if (!favorite) {
        return item
      }

      return { ...item, isFavorite: true, favoriteId: favorite.id }
    })
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorites()
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((card) => card.id === item.id)
  }))
})
</script>
