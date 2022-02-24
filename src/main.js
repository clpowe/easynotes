import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'
import { projectAuth } from './firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
	history: createWebHistory(),
	routes
})

let app

onAuthStateChanged(projectAuth, () => {
	if (!app) {
		app = createApp(App).use(router).mount('#app')
	}
})
