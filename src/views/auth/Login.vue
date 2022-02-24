<template>
	<h3>Login</h3>
	<form @submit.prevent="handleSubmit" class="flex flex-col">
		<BaseInput v-model="email" label="Email" type="email" />
		<BaseInput v-model="password" label="Password" type="password" />
		<div v-if="error">{{ error }}</div>
		<AsyncButton text="Log in" :is-pending="isPending" />
	</form>
</template>

<script setup>
	import useLogin from '@/composables/useLogin'
	import BaseInput from '@/components/BaseInput.vue'
	import AsyncButton from '@/components/AsyncButton.vue'
	import { ref } from 'vue'
	import { useRouter, useRoute } from 'vue-router'

	const router = useRouter()
	const route = useRoute()

	const email = ref('')
	const password = ref('')
	const { error, login, isPending } = useLogin()

	const handleSubmit = async () => {
		const res = await login(email.value, password.value)
		if (!error.value) {
			router.push({ name: 'Home' })
		}
	}
</script>
