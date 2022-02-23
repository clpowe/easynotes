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
		<input type="file" />
		<div></div>
		<AsyncButton text="Create Notebook" />
	</form>
</template>

<script setup>
	import AsyncButton from '@/components/AsyncButton.vue'
	import BaseInput from '@/components/BaseInput.vue'
	import BaseTextArea from '@/components/BaseTextArea.vue'
	import { ref } from 'vue'

	const notebookName = ref('')
	const description = ref('')

	const handleSubmit = () => {
		console.log(notebookName.value, description.value)
	}
</script>
