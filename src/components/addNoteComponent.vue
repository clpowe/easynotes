<template>
	<button @click="handleClick">Create Note</button><br />

	<BaseInput v-model="title" label="title" type="text" />
	<vue-editor v-model="content" />
</template>

<script setup>
	import BaseInput from '@/components/BaseInput.vue'
	import { VueEditor } from 'vue3-editor'
	import useCollection from '@/composables/useCollection'
	import { timestamp } from '@/firebase/config'
	import { inject, ref } from 'vue'

	const { updateModalValue } = inject('modalValue')

	const { currentNotebook } = inject('currentNotebook')
	const { error, _addDoc, isPending } = useCollection('notes')

	const title = ref(null)
	const content = ref('<p>What are you thinking...</p>')

	const handleClick = async () => {
		try {
			await _addDoc({
				title: title.value,
				content: content.value,
				notebookID: currentNotebook.value,
				createdAt: timestamp
			})
		} catch (err) {
			console.log(err.message)
		}
		updateModalValue()
	}
</script>
