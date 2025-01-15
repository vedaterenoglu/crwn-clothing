/** @format */

import { Fragment, useContext } from 'react'
import { UserContext } from '../../contexts/user.context'

import PRODUCTS from '../../data/shop-data'
import { addCollectionAndDocuments } from '../../utils/firebase/firebase.utils'

const ResetData = () => {
	const resetDataHandler = () => {
		addCollectionAndDocuments('categories', PRODUCTS)
	}
	const { currentUser } = useContext(UserContext)
	console.log(currentUser?.email)

	if (currentUser?.email !== 'evedat@gmail.com') {
		return (
			<Fragment>
				<h2>You don't have clarence to reset the data.</h2>
			</Fragment>
		)
	} else if (currentUser?.email === 'evedat@gmail.com') {
		return (
			<Fragment>
				<h2>Reset the data on database</h2>
				<div>
					<button onClick={resetDataHandler}>Reset Data</button>
				</div>
			</Fragment>
		)
	}
}

export default ResetData
