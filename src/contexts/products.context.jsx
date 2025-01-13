/** @format */

import { createContext, useEffect, useState } from 'react'

import PRODUCTS from '../data/shop-data.json'

export const ProductsContext = createContext({
	products: []
})

export const ProductProvider = ({ children }) => {
	const [products, setProducts] = useState(PRODUCTS)
  const value = { products }
	useEffect(() => {
		setProducts(PRODUCTS)
	}, [])
	return (
		<ProductsContext.Provider value={value}>
			{children}
		</ProductsContext.Provider>
	)
}
