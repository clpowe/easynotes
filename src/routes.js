import Home from './views/Home.vue'
import Login from './views/auth/Login.vue'
import Signup from './views/auth/Signup.vue'
import CreateNotebook from './views/notebooks/CreateNotebook.vue'
import Notebook from './views/notebooks/Notebook.vue'
import CreateNote from './views/CreateNote.vue'

import { projectAuth } from './firebase/config'

const requireAuth = (to, from, next) => {
	let user = projectAuth.currentUser
	if (!user) {
		next({ name: 'Login' })
	} else {
		next()
	}
}

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: { title: 'Home' },
		beforeEnter: requireAuth
	},
	{ path: '/login', name: 'Login', component: Login, meta: { title: 'Login' } },
	{
		path: '/signup',
		name: 'Signup',
		component: Signup,
		meta: { title: 'Signup' }
	},
	{
		path: '/create',
		name: 'CreateNote',
		component: CreateNote,
		meta: { title: 'Create Note' },
		props: true
	},
	{
		path: '/notebooks/create',
		name: 'CreateNotebook',
		component: CreateNotebook,
		meta: { title: 'Create Notebook' },
		beforeEnter: requireAuth
	},
	{
		path: '/notebooks/:id',
		name: 'Notebook',
		component: Notebook,
		meta: { title: 'Notebook' },
		beforeEnter: requireAuth,
		props: true
	}
]
