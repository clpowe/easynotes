<template>
	<div>
		<div v-for="doc in documents" :key="doc.id">
			<router-link
				:to="{ name: 'Notebook', params: { id: doc.id } }"
				@click="updateCurrentNotebook(doc.id)"
			>
				{{ doc.notebookName }}
			</router-link>
		</div>
	</div>
</template>

<script setup>
	import { inject } from 'vue'

	const props = defineProps({
		documents: {
			type: Object
		}
	})

	const { updateCurrentNotebook } = inject('currentNotebook')
</script>
