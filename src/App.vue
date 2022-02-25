<template>
	<Navbar />
	<main class="container mx-auto py-5">
		<router-view />
	</main>
</template>

<script setup>
	import { provide, ref } from 'vue'
	import Navbar from './components/Navbar.vue'
	import { useStorage, StorageSerializers } from '@vueuse/core'

	const localCurrentNotebook = useStorage('local-notebook', null)

	// Current Notebook

	// localCurrentNotebook.value = null

	const currentNotebook = ref(null)

	currentNotebook.value = localCurrentNotebook.value

	function updateCurrentNotebook(id) {
		currentNotebook.value = id
		localCurrentNotebook.value = id
	}

	provide('currentNotebook', { currentNotebook, updateCurrentNotebook })

	// Current Note
	const currentNote = ref({
		title: null,
		notebookID: null,
		createdAt: null,
		content: null
	})
	function updateCurrentNote(note) {
		currentNote.value = {
			id: note.id,
			title: note.title,
			notebookID: note.notebookID,
			createdAt: note.createdAt,
			content: note.content
		}
	}
	provide('currentNote', { currentNote, updateCurrentNote })

	// Modal
	const modalValue = ref(false)
	function updateModalValue() {
		modalValue.value = !modalValue.value
	}
	provide('modalValue', { modalValue, updateModalValue })
</script>
