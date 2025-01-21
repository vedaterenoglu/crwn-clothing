/** @format */

import { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'

import ProductCard from '../../components/product-card/product-card.component'
import Spinner from '../../components/spinner/spinner.component'

import { useSelector } from 'react-redux'

import {
	selectCategoriesIsLoading,
	selectCategoriesMap
} from '../../store/categories/categories.selector'

import { CategoryContainer, Title } from './category.styles'

const Category = () => {
	const { category } = useParams()
	console.log('render/re-rendering category component')
	const categoriesMap = useSelector(selectCategoriesMap)
	const isLoading = useSelector(selectCategoriesIsLoading)
	const [products, setProducts] = useState(categoriesMap[category])

	useEffect(() => {
		console.log('effect fired calling setProducts')
		setProducts(categoriesMap[category])
	}, [category, categoriesMap])

	return (
		<Fragment>
			<Title>{category}</Title>
			{isLoading ? (
				<Spinner />
			) : (
				<CategoryContainer>
					{products &&
						products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
				</CategoryContainer>
			)}
		</Fragment>
	)
}

export default Category
