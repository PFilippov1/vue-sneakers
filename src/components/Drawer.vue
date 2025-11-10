<template>
  <div class="top-0 left-0 fixed h-full w-full z-10 bg-black opacity-70" />
  <div class="bg-white z-20 fixed h-full w-96 top-0 right-0 p-8 overflow-y-auto">
    <DrawerHead />
    <CartItemList />

    <div class="flex flex-col gap-4 mb-6 mt-7">
      <div class="flex gap-2">
        <span>Total:</span>
        <div class="flex-1 border-b border-dashed" />
        <b>{{ totalPrice }} Euro</b>
      </div>

      <div class="flex gap-2">
        <span>Tax 5%:</span>
        <div class="flex-1 border-b border-dashed" />
        <b>{{ vatPrice }} Euro</b>
      </div>

      <button
        :disabled="buttonDisabled"
        class="mt-4 transition bg-lime-500 w-full rounded-xl py-3 text-white disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700 cursor-pointer"
        @click="() => emit('createOrder')"
      >
        Create order
      </button>
    </div>
  </div>
</template>

<script setup>
import CartItemList from './CartItemList.vue'
import DrawerHead from './DrawerHead.vue'
import { computed } from 'vue'
const emit = defineEmits(['createOrder'])

defineProps({
  totalPrice: Number,
  vatPrice: Number,
  buttonDisabled: Boolean
})
</script>
