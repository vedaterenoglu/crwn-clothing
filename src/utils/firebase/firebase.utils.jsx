/** @format */

import { initializeApp } from 'firebase/app'
import {
	getAuth,
	signInWithPopup,
	signInWithRedirect,
	GoogleAuthProvider
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyBe3k-kwRQTbUV6gribZ9xP9cE7aDqJ8hs',
	authDomain: 'crwn-clothing-db-8f90a.firebaseapp.com',
	projectId: 'crwn-clothing-db-8f90a',
	storageBucket: 'crwn-clothing-db-8f90a.firebasestorage.app',
	messagingSenderId: '934020810311',
	appId: '1:934020810311:web:2bf947bce42684eeabd362'
}

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
	prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
	if (!userAuth) return
	const userDocRef = doc(db, 'users', userAuth.uid)
	console.log(userDocRef)
	const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot.exists())
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth
		const createdAt = new Date()
		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt
			})
		} catch (error) {
			console.log('error creating the user', error.message)
		}
		return userDocRef
	}
}
