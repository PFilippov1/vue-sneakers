<template>
  <div class="top-0 left-0 fixed h-full w-full z-10 bg-black opacity-70" />
  <div class="bg-white z-20 fixed h-full w-96 top-0 right-0 p-8 overflow-y-auto">
    <DrawerHead />

    <div v-if="!totalPrice || orderId" class="flex h-full items-center">
      <InfoBlock
        v-if="!totalPrice && !orderId"
        img-url="/package-icon.png"
        title="Empty Cart"
        description="Add sneakers to your cart"
      />
      <InfoBlock
        v-if="orderId"
        img-url="/order-success-icon.png"
        title="Thanks for your order"
        :description="`Your order #${orderId} will soon be transferred to courier delivery`"
      />
    </div>

    <div v-else>
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
          @click="createOrder"
        >
          Create order
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed } from 'vue'
import CartItemList from './CartItemList.vue'
import DrawerHead from './DrawerHead.vue'
import InfoBlock from './InfoBlock.vue'
import axios from 'axios'
import { CartContext } from '@/types'

const props = defineProps<{
  totalPrice: number,
  vatPrice: number
}>()

const isCreating = ref(false)
const orderId = ref<number | null>(null)

const createOrder = async () => {
  try {
    isCreating.value = true
    const { data } = await axios.post(`https://10eb8e970dd245c5.mokky.dev/orders`, {
      items: cart.value,
      totalPrice: props.totalPrice
    })
    cart.value = []
    orderId.value = data.id
  } catch (error) {
    console.log(error)
  } finally {
    isCreating.value = false
  }
}

const { cart } = inject('cart') as CartContext

const cartIsEmpty = computed(() => cart.value.length === 0)

const buttonDisabled = computed(() => isCreating.value || cartIsEmpty.value)
</script>
