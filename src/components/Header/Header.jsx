import { Link } from 'react-router-dom'
import styles from './Header.module.sass'

export default function Header() {
	return (
		<header className={styles.header}>
			<Link className={styles.header__title} to='/'>
				<span>Valantis</span>
			</Link>
		</header>
	)
}
