import React, { useState } from 'react';

import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage/Index';

// Auth Pages and compoents
import Login from 'auth/pages/SignIn';
import Register from 'auth/pages/Register';

// DASHBOARD PAGEGS AND COMPONENTS
import Layout from 'dashboard/layout/index.js';
import DashboardHome from 'dashboard/pages/DashboardHome/index.js';
import CompanySettings from 'dashboard/pages/CompanySettings/index.js';
import PrepaidsReview from 'dashboard/pages/PrepaidsReview/index.js';
import JournalEntries from 'dashboard/pages/JournalEntries/index.js';
import AmortizationWaterfall from 'dashboard/pages/AmortizationWaterfall/index.js';
import FAQ from 'dashboard/pages/FAQ';
import Settings from 'dashboard/pages/Settings';

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
			<Route path='/login' element={<Login />}></Route>
			<Route path='/register' element={<Register />}></Route>
			<Route path='/dashboard' element={<Layout />}>
				<Route exact path='' element={<DashboardHome />} />
				<Route path='company-settings' element={<CompanySettings />} />
				<Route path='prepaids-review' element={<PrepaidsReview />} />
				<Route path='journal-entries' element={<JournalEntries />} />
				<Route path='help' element={<FAQ />} />
				<Route path='settings' element={<Settings />} />
				<Route
					path='amortization-waterfall'
					element={<AmortizationWaterfall />}
				/>
			</Route>
		</Routes>
	);
}

export default App;
