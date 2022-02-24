import { projectFirestore as db } from '@/firebase/config'
import { collection, addDoc } from 'firebase/firestore'
import { ref } from 'vue'

const useCollection = (_collection) => {
	const error = ref(null)
	const isPending = ref(false)

	const _addDoc = async (_doc) => {
		error.value = null
		isPending.value = true

		try {
			const res = await addDoc(collection(db, _collection), _doc)
			isPending.value = false
			return res
		} catch (err) {
			console.log(err.message)
			error.value = 'Could not send the message'
			isPending.value = false
		}
	}

	return { error, _addDoc, isPending }
}

export default useCollection
