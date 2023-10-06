import React from 'react';
import Sidebar from './Sidebar/Index.jsx';
import Navbar from './Navbar/Index.jsx';
import { Outlet } from 'react-router-dom';
import styles from 'styling/Dashboard/Layout/Layout.module.css';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

const Index = () => {
	const { pathname } = useLocation();
	return (
		<div className={styles.layout}>
			<Helmet>
				<title>{pathname}</title>
			</Helmet>
			<Sidebar />
			<main className={styles['dashboard-main']}>
				<Navbar />
				<Outlet />
			</main>
		</div>
	);
};

export default Index;
