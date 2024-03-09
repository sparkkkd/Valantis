import styles from './Header.module.sass'

export default function Header() {
	return (
		<header className={styles.header}>
			<span className={styles.headerTitle}>Valantis</span>
		</header>
	)
}
