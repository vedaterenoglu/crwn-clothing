/** @format */

import {
	signInWithGooglePopup,
	createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'

import SignUpForm from '../sign-up-form/sign-up-form.component'

const SignIn = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup()
		const userDocRef = createUserDocumentFromAuth(user)
	}

	return (
		<>
			<div>I am the sign in page</div>
			<br />
			<br />
			<button onClick={logGoogleUser}>Sign In With Google Popup</button>
			<br />
			<br />
			<SignUpForm />
		</>
	)
}
export default SignIn
