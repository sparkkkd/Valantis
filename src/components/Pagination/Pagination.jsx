import { Pagination, ConfigProvider } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export default function PaginationComponent() {
	const products = useSelector((state) => state.goods.goods)
	const [totalPages, setTotalPages] = useState(products.length)

	function onChange(page, pageSize) {}

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
