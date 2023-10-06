import React, { useState } from 'react';
import styles from '../../../styling/Dashboard/Sidebar/Sidebar.module.css';
import Menu from './Menu/Index.jsx';
import MenuBottom from './Menu/MenuBottom/Index';

const Index = () => {
	const [decrease, setDecrease] = useState(false);
	return (
		<div className={`${styles.sidebar} ${decrease ? styles.decrease : ''}`}>
			<div className='sidebar__top'>
				<div className={styles.sidebar__head}>
					<img
						className={styles.sidebar__logo}
						src='/icons/sidebar-logo.png'
						alt=''
					/>
					<button
						onClick={() => setDecrease(!decrease)}
						className={styles.sidebar__button}
					></button>
				</div>
				<Menu decrease={decrease} />
			</div>

			<div className='sidebar__bottom'>
				<MenuBottom decrease={decrease} />
			</div>
		</div>
	);
};

export default Index;
