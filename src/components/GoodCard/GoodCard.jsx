import styles from './GoodCard.module.sass'

import { useDispatch, useSelector } from 'react-redux'
import { fetchGoods } from '../../redux/slices/goodsSlice'
import { useEffect } from 'react'

export default function GoodCard() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchGoods())
	}, [])
	const goods = useSelector((state) => state.goods.goods)

	return (
		<div className={styles.goodsWrapper}>
			{goods.map((good) => (
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
				</div>
			))}
		</div>
	)
}
