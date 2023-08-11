import React, { useEffect } from 'react';
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

const tableData = {
	columns: [
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
	],
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

	useEffect(() => {
		// const fetchData = async () => {
		// 	try {
		// 		const response = await getUserInfo();
		// 		console.log('user info respoinse:', response);
		// 	} catch (e) {
		// 		console.log('user info error:', e.message);
		// 	}
		// };

		// try {
		// 	fetchData();
		// } catch (e) {
		// 	console.log('error:', e);
		// }

		(async () => {
			const response = await getUserInfo();
			console.log('user data response:', response);
		})();
	}, []);
	return (
		<Container>
			<WelcomeBanner title={bannerContent.title}>
				<span>
					You have <span>{items}</span> new prepaid items to Review
				</span>
			</WelcomeBanner>
			<div className='w-70'>
				<Table tableData={tableData} title='Reconciliation Overview' />
			</div>
		</Container>
	);
};

export default Index;
