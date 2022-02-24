<template>
	<div v-if="error">{{ error }}</div>

	<div v-if="documents">
		<ListView :documents="documents" />
	</div>
</template>

<script setup>
	import getCollection from '@/composables/getCollection'
	import ListView from '@/components/ListView.vue'
	import { ref } from 'vue'
	import getUser from '@/composables/getUser'

	const { user } = getUser()

	const { documents, error } = getCollection('notebooks', [
		'userId',
		'==',
		user.value.uid
	])
</script>
