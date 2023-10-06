import React from 'react';

import IconSettings from './icons/Settings';
import IconHelp from './icons/Help';

import styles from '../../../../../styling/Dashboard/Sidebar/MenuBottom.module.css';
import MenuItemBottom from './MenuItemBottom';

const menuItems = [
	{
		title: 'Help',
		to: '/dashboard/help',
		icon: <IconHelp />,
	},
	{
		title: 'Settings',
		to: '/dashboard/settings',
		icon: <IconSettings />,
	},
];

const Index = ({ decrease }) => {
	return (
		<div className={styles['menu-bottom']}>
			<ul className={styles.menu__items_bottoms}>
				{menuItems.map((item, index) => (
					<MenuItemBottom
						to={item.to}
						title={item.title}
						key={index}
						icon={item.icon}
						decrease={decrease}
					/>
				))}
			</ul>
		</div>
	);
};

export default Index;
