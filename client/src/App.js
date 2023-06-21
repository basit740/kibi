import React, { useState } from 'react';

import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage/Index';
// import Dashboard from './pages/Dashboard/Index';

// DASHBOARD PAGEGS AND COMPONENTS

import Layout from './Dashboard/layout/Index';
import DashboardHome from './Dashboard/pages/DashboardHome/index.js';
import CompanySettings from './Dashboard/pages/CompanySettings/index.js';
import PrepaidsReview from './Dashboard/pages/PrepaidsReview/index.js';
import JournalEntries from './Dashboard/pages/JournalEntries/index.js';
import AmortizationWaterfall from './Dashboard/pages/AmortizationWaterfall/index.js';

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
				<Route path='company-settings' element={<CompanySettings />} />
				<Route path='prepaids-review' element={<PrepaidsReview />} />
				<Route path='journal-entries' element={<JournalEntries />} />
				<Route
					path='amortization-waterfall'
					element={<AmortizationWaterfall />}
				/>
			</Route>
		</Routes>
	);
}

export default App;
