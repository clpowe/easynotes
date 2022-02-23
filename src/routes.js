import Home from './views/Home.vue'
import Login from './views/auth/Login.vue'
import Signup from './views/auth/Signup.vue'
import CreateNotebook from './views/notebooks/CreateNotebook.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
	{ path: '/', name: 'Home', component: Home, meta: { title: 'Home' } },
	{ path: '/login', name: 'Login', component: Login, meta: { title: 'Login' } },
	{
		path: '/signup',
		name: 'Signup',
		component: Signup,
		meta: { title: 'Signup' }
	},
	{
		path: '/notebooks/create',
		name: 'CreateNotebook',
		component: CreateNotebook,
		meta: { title: 'Create Notebook' }
	}
]
