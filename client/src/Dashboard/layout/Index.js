import React from 'react';
import Sidebar from './Sidebar/Index.js';
import Navbar from './Navbar/Index.js';
import { Outlet } from 'react-router-dom';
import styles from '../../styling/Dashboard/Layout/Layout.module.css';
const Index = () => {
	return (
		<div className={styles.layout}>
			<Sidebar />
			{/* All pages here */}
			<main className={styles['dashboard-main']}>
				<Navbar />
				<Outlet />
			</main>
		</div>
	);
};

export default Index;
