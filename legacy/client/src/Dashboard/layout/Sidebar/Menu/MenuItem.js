import React, { useState, useEffect } from 'react';

import { NavLink } from 'react-router-dom';

import styles from 'styling/Dashboard/Sidebar/MenuItem.module.css';

const NavItem = ({ title, icon, to, decrease }) => {
	const [isActive, setIsActive] = useState(false);
	useEffect(() => {
		if (isActive) {
			setIsActive(false);
		}
	}, [to]);

	return (
		<NavLink
			onClick={() => setIsActive(!isActive)}
			to={to}
			// className={`${styles['menu-item']} ${decrease ? styles.decrease : ''}`}
			className={({ isActive, isPending }) =>
				`${isPending ? styles.pending : ''} ${isActive ? styles.active : ''} ${
					styles['menu-item']
				} ${decrease ? styles.decrease : ''}`
			}
		>
			<span>{icon}</span>
			<span className={styles['menu-item__text']}>{title}</span>
			<img
				src='/icons/menu-item-dropdown.png'
				className={styles['menu-item__dropdown']}
				alt='dropdown-icon'
			/>
		</NavLink>
	);
};

export default NavItem;
