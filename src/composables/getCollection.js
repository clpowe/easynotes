import { projectFirestore as db } from '@/firebase/config'
import {
	collection,
	query,
	orderBy,
	onSnapshot,
	where
} from 'firebase/firestore'
import { ref, watchEffect } from 'vue'

const getCollection = (_collection, q) => {
	const documents = ref(null)
	const error = ref(null)

	let collectionRef = query(collection(db, _collection), orderBy('createdAt'))

	if (q) {
		collectionRef = query(collectionRef, where(...q))
	}

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
			error.value = 'could not fetch data'
		}
	)
	watchEffect((onInvalidate) => {
		onInvalidate(() => unsub())
	})

	return { documents, error }
}

export default getCollection
