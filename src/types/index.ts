import type { Ref } from 'vue'

export interface Item {
  id: number
  title: string
  price: number
  imageUrl: string
  isFavorite: boolean
  favoriteId: number | null
  isAdded: boolean
}

export interface Favorite {
  id: number
  item_id: number
}

export interface CartContext {
  cart: Ref<Item[]>
  addToCart: (item: Item) => void
  removeFromCart: (item: Item) => void
  openDrawer: () => void
  closeDrawer: () => void
}


export interface FavoriteResponseItem extends Favorite {
  item: Item
} 

