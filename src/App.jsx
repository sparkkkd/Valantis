import './App.sass'

import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { toggleVisible } from './redux/slices/filterSlice'
import { fetchBrands } from './redux/slices/goodsSlice'

import Header from './components/Header/Header'
import GoodCard from './components/GoodCard/GoodCard'
import Filter from './components/Filter/Filter'
import PaginationComponent from './components/Pagination/Pagination'
import { FaArrowDownLong } from 'react-icons/fa6'

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
