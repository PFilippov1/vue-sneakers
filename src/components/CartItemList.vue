<template>
  <div v-auto-animate class="flex flex-col gap-3 flex-1">
    <CartItem
v-for="item in cart" :id="item.id" :key="item.id" :title="item.title" :image-url="item.imageUrl"
      :price="item.price" @on-click-remove="() => removeFromCart(item)" />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import CartItem from './CartItem.vue'
import { CartContext } from '../types/index'

const cartContext = inject<CartContext>('cart')

if (!cartContext) {
  throw new Error('Cart context is not provided')
}

const { cart, removeFromCart } = cartContext
</script>
