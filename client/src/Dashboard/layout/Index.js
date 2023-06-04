import React from 'react';
import Sidebar from './Sidebar/Index.js';
import Navbar from './Navbar/Index.js';
import { Outlet } from 'react-router-dom';
const Index = () => {
	return (
		<div className='layout'>
			<Sidebar />

			{/* All pages here */}

			<main className='dashboard-main'>
				<Navbar />
				<Outlet />
			</main>
		</div>
	);
};

export default Index;
