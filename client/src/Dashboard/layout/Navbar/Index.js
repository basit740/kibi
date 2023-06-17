import React from 'react';

// styles
import styles from '../../../styling/Dashboard/Navbar/Navbar.module.css';

// components
import CustomeerSelect from './CustomerSelect/Index';

// icons
import IconSyncNow from './svg/SyncNow';

const Index = () => {
	return (
		<nav className={styles.navbar}>
			<h5 className={styles['navbar__title']}>Dashboard</h5>

			{/* navbar select */}
			<CustomeerSelect />

			<div className={styles['quickbooks-sync']}>
				<label
					htmlFor='last-sync-label'
					className={styles['quickbooks-sync__label']}
				>
					Last Sync
				</label>
				<label
					htmlFor='last-sync-time'
					className={styles['quickbooks-sync__last-time']}
				>
					Today, 8:52 PM
				</label>
				<button className={styles['quicbooks-sync__button']}>
					<IconSyncNow /> Sync Now
				</button>
			</div>

			<img
				src='images/user.jpeg'
				alt='user'
				className={styles['navbar__user-img']}
			/>
		</nav>
	);
};

export default Index;
