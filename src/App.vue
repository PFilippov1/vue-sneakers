<template>
  <Drawer
    v-if="drawerOpen"
    :total-price="totalPrice"
    :vat-price="vatPrice"
    :button-disabled="cartButtonDisabled"
    @create-order="createOrder"
  />

  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />
    <div class="p-10">
      <router-view/>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, provide, computed } from 'vue'
import Drawer from './components/Drawer.vue'
import Header from './components/Header.vue'
import axios from 'axios'

const cart = ref([])

const isCreatedOrder = ref(false)
const drawerOpen = ref(false)

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const cartButtonDisabled = computed(() =>
  isCreatedOrder.value || cart.value.length === 0 ? true : false
)

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

const createOrder = async () => {
  try {
    isCreatedOrder.value = true
    const { data } = await axios.post(`https://10eb8e970dd245c5.mokky.dev/orders`, {
      items: cart.value,
      totalPrice: totalPrice.value
    })
    cart.value = []
    return data
  } catch (error) {
    console.log(error)
  } finally {
    isCreatedOrder.value = false
  }
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('cart', {
  closeDrawer,
  openDrawer,
  cart,
  addToCart,
  removeFromCart
})
</script>

<style scoped></style>
