<template>
	<div v-if="error">Could not get Data</div>
	<div v-if="documents">
		<div v-for="doc in documents" :key="doc.id">
			{{ doc.notebookName }}
		</div>
	</div>
</template>

<script setup>
	import getCollection from '@/composables/getCollection'
	import { ref } from 'vue'

	const { documents, error } = getCollection('notebooks')
</script>
