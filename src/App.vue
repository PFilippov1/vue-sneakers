<template>
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />
    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">All sneakers</h2>
        <Drawer v-if="drawerOpen" :total-price="totalPrice" :vat-price="vatPrice" />

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
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, reactive, provide, computed } from 'vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'
import Header from './components/Header.vue'
import axios from 'axios'

const items = ref([])
const cart = ref([])

const drawerOpen = ref(false)

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

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
      const favorite = favorites.find((favorite) => favorite.parentId === item.id)

      if (!favorite) {
        return item
      }

      return { ...item, isFavorite: true, favoriteId: favorite.id }
    })
  } catch (error) {
    console.log(error)
  }
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id
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

onMounted(async () => {
  await fetchItems()
  await fetchFavorites()
})

watch(filters, async () => {
  fetchItems()
})

provide('cart', {
  closeDrawer,
  openDrawer,
  cart,
  addToCart,
  removeFromCart
})
</script>

<style scoped></style>
