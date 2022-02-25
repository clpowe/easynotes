import { projectFirestore as db } from '@/firebase/config'
import { doc, deleteDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { ref } from 'vue'

const useDocument = (_collection) => {
	const error = ref(null)
	const isPending = ref(false)

	const _updateDoc = async (id, update) => {
		isPending.value = true
		try {
			await updateDoc(doc(db, _collection, id), {
				title: update.title,
				content: update.content
			})
			isPending.value = false
		} catch (err) {
			console.log(err.message)
			error.value = err.message
			isPending.value = false
		}
	}

	const _deleteDoc = async (id) => {
		isPending.value = true
		try {
			await deleteDoc(doc(db, _collection, id))
			isPending.value = false
		} catch (err) {
			console.log(err.message)
			error.value = err.message
			isPending.value = false
		}
	}

	return { error, isPending, _deleteDoc, _updateDoc }
}

export default useDocument
