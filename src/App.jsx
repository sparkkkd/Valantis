import './App.sass'

import Header from './components/Header/Header'
import GoodCard from './components/GoodCard/GoodCard'
import Filter from './components/Filter/Filter'

import { useDispatch, useSelector } from 'react-redux'
import { toggleVisible } from './redux/slices/filterSlice'

import { FaArrowDownLong } from 'react-icons/fa6'
import { useEffect } from 'react'
import { fetchBrands } from './redux/slices/goodsSlice'
import PaginationComponent from './components/Pagination/Pagination'

function App() {
	const dispatch = useDispatch()

	const isLoading = useSelector((state) => state.goods.isLoading)

	useEffect(() => {
		dispatch(fetchBrands())
	}, [])

	return (
		<>
			<FaArrowDownLong
				className='open__filter'
				onClick={() => dispatch(toggleVisible())}
			/>
			<div className='container'>
				<Header />
				<main>
					<Filter />
					<GoodCard />
					<PaginationComponent />
				</main>
			</div>
		</>
	)
}

export default App
