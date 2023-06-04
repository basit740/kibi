import React, { useState } from 'react';

import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage/Index';
// import Dashboard from './pages/Dashboard/Index';

// DASHBOARD PAGEGS AND COMPONENTS

import Layout from './Dashboard/layout/Index';
import DashboardHome from './Dashboard/pages/DashboardHome/Index.js';

function App() {
	// const [user, setUser] = useState(false);

	// if (!user) {
	// 	return (
	// 		<Routes>
	// 			<Route path='/' element={<LandingPage />}></Route>
	// 		</Routes>
	// 	);
	// }

	return (
		<Routes>
			<Route path='/' element={<LandingPage />}></Route>
			<Route path='/dashboard' element={<Layout />}>
				<Route exact path='' element={<DashboardHome />} />
			</Route>
		</Routes>
	);
}

export default App;
