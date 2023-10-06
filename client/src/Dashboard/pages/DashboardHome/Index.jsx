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

	useEffect(() => {
		const userInfo = JSON.parse(localStorage.getItem('user'));
		
		console.log({ userInfo });
	}, []);
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
