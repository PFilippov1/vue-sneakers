<template>
  <div class="flex flex-col gap-3 flex-1">
    <CartItem />
    <CartItem />
  </div>
</template>

<script setup>
import CartItem from './CartItem.vue'

const onClickAdd = () => {
  console.log('add')
}
</script>
