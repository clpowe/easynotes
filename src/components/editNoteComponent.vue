<template>
	<div>{{ error }}</div>
	<div v-if="document">
		<BaseInput
			v-model="document.title"
			label="title"
			type="text"
			@change="handleChange"
		/>
		<vue-editor v-model="document.content" @textChange="handleChange" />
	</div>
</template>

<script setup>
	import BaseInput from '@/components/BaseInput.vue'
	import { VueEditor } from 'vue3-editor'

	import { timestamp } from '@/firebase/config'
	import { inject, ref, computed, watch } from 'vue'
	import useDocument from '@/composables/useDocument'
	import editDocument from '@/composables/editDocument'

	const { updateModalValue } = inject('modalValue')
	const { currentNote } = inject('currentNote')

	const { currentNotebook } = inject('currentNotebook')
	const { error: error2, _updateDoc, isPending } = useDocument('notes')

	// console.log(currentNote.value.id)
	// console.log(currentNotebook.value)

	// title.value = currentNote.value.title
	// content.value = currentNote.value.content
	const { document, error } = editDocument('notes', currentNote.value.id)
	const title = computed(() => {
		return document.value.title
	})
	const content = computed(() => {
		return document.value.content
	})

	const handleChange = async () => {
		try {
			await _updateDoc(currentNote.value.id, {
				title: title.value,
				content: content.value,
				createdAt: timestamp
			})
		} catch (err) {
			console.log(err.message)
		}
	}
</script>
