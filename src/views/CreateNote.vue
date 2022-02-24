<template>
	<button @click="handleClick">Create Note</button><br />

	<BaseInput v-model="title" label="title" type="text" />

	<vue-editor v-model="content" />
</template>

<script setup>
	import BaseInput from '@/components/BaseInput.vue'
	import { VueEditor, Quill } from 'vue3-editor'
	import { useRouter, useRoute } from 'vue-router'
	// import useDocument from '@/composables/useDocument'
	import useCollection from '@/composables/useCollection'
	import { timestamp } from '@/firebase/config'
	import { inject, ref } from 'vue'

	const route = useRoute()
	const router = useRouter()

	const { currentNotebook } = inject('currentNotebook')

	const { error, _addDoc, isPending } = useCollection('notes')
	// const { isPending, _updateDoc } = useDocument('notebooks', route.params.id)
	// console.log(route.params.id)

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
		router.push({ name: 'Notebook', params: { id: currentNotebook.value } })
	}
</script>
