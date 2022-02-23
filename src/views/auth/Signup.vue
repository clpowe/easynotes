<template>
	<h3>Signup</h3>
	<form @submit.prevent="handleSubmit" class="flex flex-col">
		<BaseInput v-model="displayName" label="Display Name" type="text" />
		<BaseInput v-model="email" label="Email" type="email" />
		<BaseInput v-model="password" label="Password" type="password" />
		<div v-if="error">{{ error }}</div>
		<AsyncButton text="Sign up" :is-pending="isPending" />
	</form>
</template>

<script setup>
	import useSignup from '@/composables/useSignup'
	import BaseInput from '@/components/BaseInput.vue'
	import AsyncButton from '@/components/AsyncButton.vue'
	import { ref } from 'vue'

	const displayName = ref('')
	const email = ref('')
	const password = ref('')
	const { error, signup, isPending } = useSignup()

	const handleSubmit = async () => {
		const res = await signup(email.value, password.value, displayName.value)
		if (!error.value) {
			console.log('user signed up')
		}
	}
</script>
