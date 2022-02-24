<template>
	<div v-if="error">
		{{ error }}
	</div>
	<div v-if="document" class="flex">
		<div class="bg-gray-400">
			<h2>
				{{ document.notebookName }}
			</h2>
			<p>
				{{ document.description }}
			</p>
			<div class="flex flex-col space-y-2">
				<button @click="handleAddNote(props.id)">Add Note</button>
				<button @click="handleclick(document.filePath)">delete notebook</button>
			</div>
		</div>

		<div class="flex w-full space-x-2">
			<div v-for="note in notes" :key="note.id" class="bg-gray-200">
				{{ note.title }}
				<div v-html="note.content"></div>
				<button @click="deleteNote(note.id)">delete</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	import getDocument from '@/composables/getDocument'
	import useDocument from '@/composables/useDocument'
	import useStorage from '@/composables/useStorage'
	import getCollection from '@/composables/getCollection'
	import { useRouter } from 'vue-router'
	import getUser from '@/composables/getUser'

	const { user } = getUser()

	const props = defineProps({
		id: {
			type: String
		}
	})
	const router = useRouter()

	const { documents: notes } = getCollection('notes', [
		'notebookID',
		'==',
		props.id
	])

	const { _deleteDoc: _deleteNote } = useDocument('notes')
	const { _deleteDoc } = useDocument('notebooks', props.id)
	const { deleteImage } = useStorage()
	const { document, error } = getDocument('notebooks', props.id)

	const handleAddNote = async () => {
		router.push({ name: 'CreateNote' })
	}

	const deleteNote = async (id) => {
		await _deleteNote(id)
	}

	const handleclick = async (id, fp) => {
		try {
			await _deleteDoc(id)
			await deleteImage(fp)
		} catch (err) {
			console.log(err)
		}
		router.push({ name: 'Home' })
	}
</script>
