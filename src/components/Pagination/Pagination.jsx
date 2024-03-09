import { Pagination, ConfigProvider } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPagination } from '../../redux/slices/goodsSlice'

export default function PaginationComponent() {
	const dispatch = useDispatch()
	const [currentPage, setCurrentPage] = useState(1)
	const { isLoading } = useSelector((state) => state.goods)

	useEffect(() => {
		const itemsPerPage = 50
		const offset = (currentPage - 1) * itemsPerPage
		dispatch(fetchPagination({ offset, limit: itemsPerPage }))
	}, [currentPage])

	function onChange(page, pageSize) {
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
				total={500}
				current={currentPage}
				defaultPageSize={50}
				style={{ textAlign: 'center' }}
				onChange={onChange}
				disabled={isLoading}
				showSizeChanger={false}
			/>
		</ConfigProvider>
	)
}
