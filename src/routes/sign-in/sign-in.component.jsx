/** @format */

import {
	signInWithGooglePopup,
	createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'

const logGoogleUser = async () => {
	const { user } = await signInWithGooglePopup()
	createUserDocumentFromAuth(user)
}

const SignIn = () => {
	return (
		<>
			<div>I am the sign in page</div>
			<button onClick={logGoogleUser}>Sign In With Google Popup</button>
		</>
	)
}
export default SignIn
