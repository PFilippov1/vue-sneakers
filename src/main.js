import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import './assets/main.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/favorites', name: 'favorites', component: Favorites }
  ]
})

app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')
