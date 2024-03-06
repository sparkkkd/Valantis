import { useState } from 'react'
import Button from '../Button/Button'
import styles from './Filter.module.sass'

import { motion, AnimatePresence, easeInOut } from 'framer-motion'

import { FaXmark } from 'react-icons/fa6'
import { useSelector, useDispatch } from 'react-redux'
import { toggleVisible } from '../../redux/slices/filterSlice'
import { filter } from '../../redux/slices/goodsSlice'

export default function Filter() {
	const dispatch = useDispatch()
	const [buttonActive, setButtonActive] = useState({
		buttonLower: false,
		buttonHigher: false,
	})
	const isVisible = useSelector((state) => state.filter.isVisible)
	const brands = useSelector((state) => state.goods.brands)

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					className={styles.filter}
					initial={{ top: -207 }}
					animate={{ top: 0 }}
					exit={{ top: -207 }}
					layout
					layoutId='filterWrapper'
					transition={{
						duration: 0.5,
						ease: easeInOut,
					}}
				>
					<div className={styles.filterBrands}>
						<div className={styles.filterTitle}>Brands</div>
						{brands.map((brand) => (
							<span
								key={brand}
								className={styles.filterItem}
								onClick={() => dispatch(filter({ brand: brand }))}
							>
								{brand}
							</span>
						))}
						<span
							className={styles.filterItem}
							onClick={() => dispatch(filter({ brand: 'all' }))}
						>
							All
						</span>
					</div>
					<div className={styles.filterPrice}>
						<div className={styles.filterTitle}>Price</div>

						<Button
							handleClick={() => dispatch(filter({ price: 'lower' }))}
							isDecr={true}
						>
							По убыванию
						</Button>
						<Button
							handleClick={() => dispatch(filter({ price: 'higher' }))}
							isDecr={false}
						>
							По возрастанию
						</Button>
						<input
							className={styles.filterSearch}
							placeholder='Поиск...'
							type='text'
						/>
					</div>

					<FaXmark
						onClick={() => dispatch(toggleVisible())}
						className={styles.filterClose}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
