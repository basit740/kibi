import React, { useState } from 'react';

// styles
import styles from 'styling/Dashboard/Navbar/Navbar.module.css';

// components
import CustomeerSelect from './CustomerSelect/Index';

// icons
import IconSyncNow from './svg/SyncNow';

const Index = () => {
	const [syncing, setSyncing] = useState(false);

	const handleSyncNow = () => {
		setSyncing(true);
		const ms = 1000 * (Math.floor(Math.random() * 5) + 1);
		setTimeout(function () {
			console.log(`After ${ms / 1000} seconds`);
			setSyncing(false);
		}, ms);

		// setSyncing(false);
	};
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
				<button
					className={`${styles['quicbooks-sync__button']} ${
						syncing ? styles.syncing : ''
					} ripple`}
					onClick={handleSyncNow}
				>
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
