<template>
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14">
    <Header />
    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">All sneakers</h2>
        <!-- <Drawer/> -->

        <div class="flex gap-5">
          <select class="px-3 py-2 border rounded-md outline-none">
            <option value="name">Name</option>
            <option value="asc">Price &uarr;</option>
            <option value="dsc">Price &darr;</option>
          </select>

          <div class="relative">
            <img class="absolute left-4 top-3" src="/search.svg" >
            <input
              class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
              type="text"
              placeholder="Search..."
            >
          </div>
        </div>
      </div>
      <div class="mt-10">
        <CardList :items="items" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'
import Header from './components/Header.vue'

const items = ref([])

onMounted(async () => {
  async function fetchData(url) {
    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Data received:', data)
      return data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }

  items.value = await fetchData('https://10eb8e970dd245c5.mokky.dev/items')
})
</script>

<style scoped></style>
