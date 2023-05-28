import { Routes, Route } from 'react-router-dom';

import LandingPage from './LandingPage/Index';

function App() {
	return (
		<Routes>
			<Route path='/' element={<LandingPage />}></Route>
		</Routes>
	);
}

export default App;
