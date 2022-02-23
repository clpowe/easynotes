<template>
	<form class="flex flex-col" @submit.prevent="handleSubmit">
		<h4>Create New Notebook</h4>
		<BaseInput
			required
			v-model="notebookName"
			label="Notebook Name"
			type="text"
		/>
		<BaseTextArea
			rows="5"
			required
			label="Notebook description"
			v-model="description"
		/>
		<label>Upload Notebook cover image</label>
		<input type="file" @change="handleChange" />
		<div>{{ progress }}</div>
		<div>
			{{ fileError }}
		</div>
		<div></div>
		<AsyncButton
			text="Create Notebook"
			:disabled="progress < 100"
			:isPending="isPending"
		/>
	</form>
</template>

<script setup>
	import AsyncButton from '@/components/AsyncButton.vue'
	import BaseInput from '@/components/BaseInput.vue'
	import BaseTextArea from '@/components/BaseTextArea.vue'
	import { ref } from 'vue'
	import useStorage from '@/composables/useStorage'
	import useCollection from '@/composables/useCollection'
	import getUser from '@/composables/getUser'
	import { timestamp } from '@/firebase/config'

	const { filePath, url, uploadImage, progress, deleteImage } = useStorage()
	const { error, _addDoc } = useCollection('notebooks')
	const { user } = getUser()

	const notebookName = ref('')
	const description = ref('')
	const file = ref(null)
	const fileError = ref(null)
	const isPending = ref(false)

	const handleSubmit = async () => {
		if (file.value) {
			isPending.value = true
			await _addDoc({
				userId: user.value.uid,
				notebookName: notebookName.value,
				description: description.value,
				userName: user.value.displayName,
				coverUrl: url.value,
				filePath: filePath.value,
				notes: [],
				createdAt: timestamp
			})
			isPending.value = false
			if (!error.value) {
				console.log('Notebook Added')
			}
		}
	}

	// allowed file types
	const types = ['image/png', 'image/jpeg']

	const handleChange = async (e) => {
		const selected = e.target.files[0]
		if (selected && types.includes(selected.type)) {
			file.value = selected
			await uploadImage(file.value)
			fileError.value = null
		} else {
			deleteImage(file.value)
			file.value = null
			fileError.value = 'Please select an image file (png of jpg)'
		}
	}
</script>
