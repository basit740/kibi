import React, { useState } from 'react';

// styles
import styles from 'styling/Dashboard/Navbar/Navbar.module.css';

// components
import CustomeerSelect from './CustomerSelect/Index';

// icons
import IconSyncNow from './svg/SyncNow';
import { Link } from 'react-router-dom';

const Index = () => {
	const [syncing, setSyncing] = useState(false);
	const [time, setTime] = useState('Today, 8:52 PM');

	const handleSyncNow = () => {
		setSyncing(true);
		const ms = 1000 * (Math.floor(Math.random() * 5) + 1);
		setTimeout(function () {
			console.log(`After ${ms / 1000} seconds`);
			setSyncing(false);

			const lastSyncLabel = document.querySelector('#last-sync-time');
			lastSyncLabel.classList.add('animated-change');

			setTimeout(function () {
				lastSyncLabel.classList.remove('animated-change');
				setTime('Today, 9:00 PM');
			}, 300);
		}, ms);

		// setSyncing(false);
	};
	return (
		<nav className={styles.navbar}>
			<Link to='/dashboard' className={styles.navbar__title_link}>
				<h5 className={styles['navbar__title']}>Dashboard</h5>
			</Link>

			{/* navbar select */}
			<CustomeerSelect />

			<div
				className={`${styles['quickbooks-sync']} ${
					syncing ? styles.syncing : ''
				}`}
			>
				<label
					htmlFor='last-sync-label'
					className={styles['quickbooks-sync__label']}
				>
					Last Sync
				</label>
				<label
					htmlFor='last-sync-time'
					id='last-sync-time'
					className={styles['quickbooks-sync__last-time']}
				>
					{/* Today, 8:52 PM */}
					{time}
				</label>
				<button
					className={`${styles['quicbooks-sync__button']} ripple`}
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
