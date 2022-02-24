import { projectStorage } from '@/firebase/config'
import {
	ref as fireRef,
	getDownloadURL,
	uploadBytesResumable,
	deleteObject
} from 'firebase/storage'
import getUser from './getUser'
import { ref } from 'vue'

const { user } = getUser()

const useStorage = () => {
	const error = ref(null)
	const url = ref(null)
	const filePath = ref(null)
	const progress = ref(0)

	const uploadImage = async (file) => {
		if (!file) return
		filePath.value = `images/${user.value.uid}/${file.name}`
		const storageRef = fireRef(projectStorage, filePath.value)
		const uploadTask = uploadBytesResumable(storageRef, file)

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				progress.value = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				)
			},
			(err) => (error.value = err.message),
			async () => {
				const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
				url.value = downloadURL
			}
		)
	}

	const deleteImage = async (_filePath) => {
		// filePath.value = `images/${user.value.uid}/${file.name}`
		const desertRef = fireRef(projectStorage, _filePath)
		deleteObject(desertRef)
			.then(() => {
				progress.value = 0
				console.log('file deleted')
			})
			.catch((err) => {})
	}

	return { error, url, filePath, uploadImage, progress, deleteImage }
}

export default useStorage
