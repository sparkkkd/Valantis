import styles from './GoodCard.module.sass'

import { useDispatch, useSelector } from 'react-redux'
import { fetchGoods } from '../../redux/slices/goodsSlice'
import { useEffect } from 'react'

import { Spin } from 'antd'
import PaginationComponent from '../Pagination/Pagination'

export default function GoodCard() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchGoods())
	}, [])
	const { currentGoods, isLoading } = useSelector((state) => state.goods)

	return (
		<div className={styles.goodsWrapper}>
			{isLoading ? (
				<Spin className='loadingSpin' size='large' />
			) : (
				currentGoods.map((good) => (
					<div key={good.id} className={styles.goodCard}>
						<div>
							<span className={styles.goodTitle}>ID</span>
							<span className={styles.goodSub}>{good.id}</span>
						</div>
						<div>
							<span className={styles.goodTitle}>Name</span>
							<span className={styles.goodSub}>{good.product}</span>
						</div>
						<div>
							<span className={styles.goodTitle}>Price</span>
							<span className={styles.goodSub}>{good.price} ₽</span>
						</div>
						<div>
							<span className={styles.goodTitle}>Brand</span>
							<span className={styles.goodSub}>{good.brand}</span>
						</div>
					</div>
				))
			)}
		</div>
	)
}
