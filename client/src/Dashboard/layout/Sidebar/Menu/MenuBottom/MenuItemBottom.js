import React from 'react';

import { NavLink } from 'react-router-dom';

import styles from '../../../../../styling/Dashboard/Sidebar/MenuItemBottom.module.css';

const MenuItemBottom = ({ title, icon, to, decrease }) => {
	console.log(decrease);
	return (
		<NavLink
			to={to}
			className={`${styles['menu-item-bottom']} ${
				decrease ? styles.decrease : ''
			}`}
		>
			<span>{icon}</span>
			<span className={styles['menu-item-bottom__text']}>{title}</span>
		</NavLink>
	);
};

export default MenuItemBottom;
