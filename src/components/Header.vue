<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img class="w-10" src="/logo.png" alt="logo" >
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-400">Sneakers Shop</p>
        </div>
      </div>
    </router-link>

    <div>
      <ul class="flex items-center gap-10">
        <li
          class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer"
          @click="() => emit('openDrawer')"
        >
          <img src="/cart.svg" alt="cart" >
          <b>{{ totalPrice }}</b>
        </li>
        <router-link to="/favorites">
          <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
            <img src="/heart.svg" alt="cart" >
            <span>favorites</span>
          </li>
        </router-link>
        <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
          <img src="/profile.svg" alt="cart" >
          <span>profile</span>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
defineProps({ totalPrice: Number })
const emit = defineEmits(['openDrawer'])
</script>

<style scoped></style>
