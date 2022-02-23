<template>
	<div>
		<nav class="container mx-auto flex">
			<h1>
				<router-link :to="{ name: 'Home' }">Easy Notes</router-link>
			</h1>
			<div class="ml-auto flex space-x-2">
				<div v-if="user">
					<button @click="handleSubmit">Logout</button>
				</div>
				<div v-else>
					<router-link :to="{ name: 'Signup' }" v-if="user === null"
						>Signup</router-link
					>
					<router-link :to="{ name: 'Login' }" v-if="user === null"
						>Login</router-link
					>
				</div>
			</div>
		</nav>
	</div>
</template>

<script setup>
	import { useRouter, useRoute } from 'vue-router'
	import useLogout from '@/composables/useLogout'
	import getUser from '@/composables/getUser'
	const { error, logout, isPending } = useLogout()

	const router = useRouter()

	const handleSubmit = async () => {
		await logout()
		console.log('user is logged out')
		router.push({ name: 'Login' })
	}

	const { user } = getUser()
</script>
