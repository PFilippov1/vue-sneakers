<template>
  <div>
    <div
      class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 transition hover:shadow-2xl"
    >
      <img
        v-if="onClickFavorite"
        :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
        alt="like"
        class="absolute top-8 left-8"
        @click="onClickFavorite"
      >
      <img :src="imageUrl" alt="sneaker" >
      <p class="mt-2">{{ title }}</p>
      <div class="flex justify-between mt-5">
        <div class="flex flex-col">
          <span class="text-slate-400">Price:</span>
          <b>{{ price }} Euro</b>
        </div>
        <img
          v-if="onClickAdd"
          :src="!isAdded ? '/plus.svg' : '/checked.svg'"
          alt="plus"
          @click="onClickAdd"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickFavorite: Function,
  onClickAdd: Function
})
</script>
