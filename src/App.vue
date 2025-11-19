<template>
  <Drawer v-if="drawerOpen" :total-price="totalPrice" :vat-price="vatPrice" />

  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />
    <div class="p-10">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, provide, computed } from 'vue'
import Drawer from './components/Drawer.vue'
import Header from './components/Header.vue'
import { Item, CartContext } from './types/index'

const cart = ref<Item[]>([])
const drawerOpen = ref(false)

const totalPrice = computed(() =>
  cart.value.reduce((acc, item) => acc + item.price, 0)
)
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const closeDrawer = () => {
  drawerOpen.value = false
}
const openDrawer = () => {
  drawerOpen.value = true
}

const addToCart = (item: Item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item: Item) => {
  const index = cart.value.findIndex((i) => i.id === item.id)
  if (index !== -1) {
    cart.value.splice(index, 1)
    item.isAdded = false
  }
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide<CartContext>('cart', {
  cart,
  addToCart,
  removeFromCart,
  openDrawer,
  closeDrawer
})
</script>
