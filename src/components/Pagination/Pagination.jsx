import { Pagination, ConfigProvider } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPagination } from '../../redux/slices/goodsSlice'

export default function PaginationComponent() {
	const dispatch = useDispatch()
	const products = useSelector((state) => state.goods.goods)
	const [totalPages, setTotalPages] = useState(products.length)
	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		const itemsPerPage = 9
		const offset = (currentPage - 1) * itemsPerPage
		dispatch(fetchPagination({ offset, limit: itemsPerPage }))
	}, [])

	function onChange(page) {
		setCurrentPage(page)
	}

	return (
		<ConfigProvider
			theme={{
				components: {
					Pagination: {
						itemActiveBg: '#4A1CA1',
						itemSize: 42,
					},
				},
				token: {
					colorText: '#732dff',
					fontSize: 21,
				},
			}}
		>
			<Pagination
				defaultCurrent={1}
				total={totalPages}
				defaultPageSize={9}
				style={{ textAlign: 'center' }}
				onChange={onChange}
			/>
		</ConfigProvider>
	)
}
