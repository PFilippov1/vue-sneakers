<template>
  <div v-auto-animate class="flex flex-col gap-3 flex-1">
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :title="item.title"
      :image-url="item.imageUrl"
      :price="item.price"
      @on-click-remove="() => removeFromCart(item)"
    />
  </div>
</template>

<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'
const { cart, removeFromCart } = inject('cart')
</script>
