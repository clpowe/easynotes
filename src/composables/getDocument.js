import { projectFirestore as db } from '@/firebase/config'
import { doc, onSnapshot } from 'firebase/firestore'
import { ref, watchEffect } from 'vue'

const getDocument = (_collection, id) => {
	const document = ref(null)
	const error = ref(null)

	const documentRef = doc(db, _collection, id)

	const unsub = onSnapshot(
		documentRef,
		(snap) => {
			if (snap.data) {
				document.value = { ...snap.data(), id: snap.id }

				error.value = null
			} else {
				error.value = 'that document does not exisr'
			}
		},
		(err) => {
			console.log(err.message)
			error.value = 'could not fetch the document'
		}
	)

	watchEffect((onInvalidate) => {
		onInvalidate(() => unsub())
	})

	return { document, error }
}

export default getDocument
