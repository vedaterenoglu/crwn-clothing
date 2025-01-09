/** @format */

import { useState } from 'react'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import './sign-in-form.styles.scss'
import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils'

const defaultFormFields = {
	email: '',
	password: ''
}

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields)
	const { email, password } = formFields

	console.log(formFields)

	const resetFormFields = () => {
		setFormFields(defaultFormFields)
	}

	const signInWithGoogle = async () => {
		const { user } = await signInWithGooglePopup()
		await createUserDocumentFromAuth(user)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		try {
			const response = await signInAuthUserWithEmailAndPassword(email, password)
			resetFormFields()
		} catch (error) {
			switch (error.code) {
				case 'auth/invalid-credential':
					alert('incorrect password or email')
					break
				case 'auth/cancelled-popup-request':
					alert('popup closed before completion')
					break
				case 'auth / popup - closed - by - user':
					alert('popup closed before completion')
					break
				default:
					console.log(error)
			}
		}
	}
	const handleChange = (event) => {
		const { name, value } = event.target
		setFormFields({ ...formFields, [name]: value })
	}

	return (
		<div className='sign-in-container'>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					type='email'
					required
					onChange={handleChange}
					name='email'
					value={email}
				/>
				<FormInput
					label='Password'
					type='password'
					required
					onChange={handleChange}
					name='password'
					value={password}
				/>
				<div className='buttons-container'>
					<Button type='submit'>Sign In</Button>
					<Button type='button' onClick={signInWithGoogle} buttonType='google'>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	)
}

export default SignInForm