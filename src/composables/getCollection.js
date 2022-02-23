import { projectFirestore as db } from '@/firebase/config'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { ref, watchEffect } from 'vue'

const getCollection = (_collection) => {
	const documents = ref(null)
	const error = ref(null)

	const collectionRef = query(collection(db, _collection), orderBy('createdAt'))

	const unsub = onSnapshot(
		collectionRef,
		(snap) => {
			let results = []
			snap.docs.forEach((doc) => {
				doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
			})
			documents.value = results
			error.value = null
		},
		(err) => {
			console.log(err.message)
			documents.value = nullerror.value = 'could not fetch data'
		}
	)
	watchEffect((onInvalidate) => {
		onInvalidate(() => unsub())
	})

	return { documents, error }
}

export default getCollection
