import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, serverTimestamp } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_KEY,
	authDomain: 'easynotes-43009.firebaseapp.com',
	projectId: 'easynotes-43009',
	storageBucket: 'easynotes-43009.appspot.com',
	messagingSenderId: '590958693524',
	appId: '1:590958693524:web:dd6b35197515e9af5f3881'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Init Services
const projectFirestore = getFirestore()
const projectAuth = getAuth()

// timestamp
const timestamp = serverTimestamp()

export { projectFirestore, projectAuth, timestamp }
