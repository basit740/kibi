import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from 'landingPage';

// Auth Pages and compoents
import Login from 'auth/pages/SignIn/index';
import Register from 'auth/pages/Register/index';

// DASHBOARD PAGEGS AND COMPONENTS
// import Layout from './Dashboard/layout/index.js';
import Layout from 'dashboard/layout/Index';
import DashboardHome from 'dashboard/pages/DashboardHome/Index';
import CompanySettings from 'dashboard/pages/CompanySettings/Index';
import PrepaidsReview from 'dashboard/pages/PrepaidsReview/Index';
import JournalEntries from 'dashboard/pages/JournalEntries/Index';
import AmortizationWaterfall from 'dashboard/pages/AmortizationWaterfall/Index';
import FAQ from 'dashboard/pages/FAQ/index';
import Settings from 'dashboard/pages/Settings/index';

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
		<div className='kibi-app'>
			<ToastContainer />
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
		</div>
	);
}

export default App;
