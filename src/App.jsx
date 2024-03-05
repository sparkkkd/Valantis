import './App.sass'

import Header from './components/Header/Header'
import GoodCard from './components/GoodCard/GoodCard'
import { useSelector } from 'react-redux'

import { Spin } from 'antd'

function App() {
	// const isLoading = useSelector((state) => state.goods.isLoading)
	// console.log(isLoading)
	const isLoading = false
	return (
		<div className='container'>
			<Header />
			<main>{isLoading ? <Spin /> : <GoodCard />}</main>
		</div>
	)
}

export default App
