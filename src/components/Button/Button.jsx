import styles from './Button.module.sass'

import { FaArrowDownLong } from 'react-icons/fa6'
import { FaArrowUpLong } from 'react-icons/fa6'

export default function Button({ children, isDecr, handleClick }) {
	return (
		<button onClick={handleClick} className={styles.button}>
			{children} {isDecr ? <FaArrowDownLong /> : <FaArrowUpLong />}
		</button>
	)
}
