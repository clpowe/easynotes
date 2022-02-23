import { projectAuth } from '@/firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref } from 'vue'

const error = ref(null)
const isPending = ref(false)

const signup = async (email, password, displayName) => {
	error.value = null
	isPending.value = true

	try {
		const res = await createUserWithEmailAndPassword(
			projectAuth,
			email,
			password
		)
		if (!res) {
			throw new Error('Could not complete the signup')
		}
		updateProfile(projectAuth.currentUser, {
			displayName: displayName
		})
		error.value = null
		isPending.value = false
		return res
	} catch (err) {
		error.value = err.message
		isPending.value = false
	}
}

const useSignup = () => {
	return { error, signup, isPending }
}

export default useSignup
