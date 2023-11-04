import React, { useEffect, useState } from 'react';
import Container from 'dashboard/components/Container';

import WelcomeBanner from 'dashboard/components/WelcomeBanner';
import Table from 'dashboard/components/Table';

// services
import { getUserInfoIntuit, getUserInfo } from 'services/intuit';
const items = 92;
const bannerContent = {
	title: 'Welcome to Robert Fox!',
	items: items,
};
import { getIntuitAuthUri } from 'services/intuit';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const tableData = {
	Columns: {
		Column: [
		{
			field: 'subledgerBalance',
			headerName: 'Subledger Balance',
			sortable: false,
		},
		{
			field: 'quickbooksBalance',
			headerName: 'Quickbooks Balance',
			sortable: false,
		},
		{ field: 'variance', headerName: 'Variance', sortable: false },
	]},
	rows: [
		{
			subledgerBalance: '$54,365.58',
			quickbooksBalance: '$120,000.00',
			variance: '($65,634.42)',
		},
	],
};

const Index = () => {
	//getUserInfoIntuit
	const navigate = useNavigate();
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	console.log(params)
	const realmId = params.get('realmId');
	const code = params.get('code');
	const state = params.get('state');

	const [loading, setLoading] = useState(false);
	const [intuitLoading, setIntuitLoading] = useState(false);
	// const [returnedUUID, setReturnedUUID] = useState('');
	useEffect(() => {
		const url = window.location.href;
		const hasCode = code;

		if (hasCode) {
			const newUrl = url.split('?code=');
			window.history.pushState({}, null, newUrl[0]);

			setLoading(true);
			// setData({ ...data, isLoading: true });
			// will check load state here

			const client_id = import.meta.env.VITE_INTUIT_CLIENT_ID;
			const client_secret = import.meta.env.VITE_INTUIT_CLIENT_SECRET;
			const redirect_uri = import.meta.env.VITE_INTUIT_REDIRECT_URI;
			const requestData = {
				client_id,
				redirect_uri,
				client_secret,
				code: code,
				url: url,
			};
			const proxy_url = import.meta.env.VITE_API_URL + '/auth/authenticate';

			console.log({ requestData });
			fetch(proxy_url, {
				method: 'POST',
				body: JSON.stringify(requestData),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			})
				.then((response) => response.json())
				.then((data) => {
					// dispatch({
					//   type: 'LOGIN',
					//   payload: { user: data, isLoggedIn: true },
					// });

					setLoading(false);
					console.log({ data });
					if (data.success) {
						toast.success('logged in successfully');
						console.log({
							data: data.data.userInfo,
						});
						console.log({
							auth: data.data.authResponse,
						});
						console.log({
							companyId: data.data.companyId,
						});

						localStorage.setItem('loggedIn', true);
						localStorage.setItem('intuitLoggedIn', true);
						localStorage.setItem('user', JSON.stringify(data.data.userInfo));
						localStorage.setItem('companyId', data.data.companyId);
						localStorage.setItem('kibiUserName', data.data.userInfo.giverName);

						console.log(data.data.companyId);
						localStorage.setItem('authResponse', JSON.stringify(data.data.authResponse));
						navigate('/dashboard');
					} else {
						toast.error(data.message);
					}
				})
				.catch((error) => {
					// setData({
					//   isLoading: false,
					//   errorMessage: 'Sorry! Login failed',
					// });

					setLoading(false);
					toast.error(error.message);
				});
		}
	}, [code]);
	return (
		<Container>
			<WelcomeBanner title={bannerContent.title}>
				<span>
					You have <span>{items}</span> new prepaid items to Review
				</span>
			</WelcomeBanner>
			{/* <div className='w-70'>
				<Table tableData={tableData} title='Reconciliation Overview' />
			</div> */}
		</Container>
	);
};

export default Index;
