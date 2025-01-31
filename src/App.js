/** @format */

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import {
	createUserDocumentFromAuth,
	onAuthStateChangedListener
} from './utils/firebase/firebase.utils'

import { Routes, Route } from 'react-router-dom'
import Navigation from './routes/navigation/navigation.component'
import Home from './routes/home/home.component'
import Authentication from './routes/authentication/authentication.component'
import Shop from './routes/shop/shop.component'
import Checkout from './routes/checkout/checkout.component'
// import Reset from './components/_reset-data/reset-data.component'

import { setCurrentUser } from './store/user/user.action'

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			console.log('App.js 26 in useEffect', user)
			if (user) {
				createUserDocumentFromAuth(user)
			}
			dispatch(setCurrentUser(user))
		})

		return unsubscribe
	}, [dispatch])
	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path='shop/*' element={<Shop />} />
				<Route path='auth' element={<Authentication />} />
				<Route path='checkout' element={<Checkout />} />
				{/* <Route path='reset' element={<Reset />} /> */}
			</Route>
		</Routes>
	)
}

export default App
