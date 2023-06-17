import React from 'react';
import Container from 'dashboard/components/Container';

import WelcomeBanner from 'dashboard/components/WelcomeBanner';
import Table from 'dashboard/components/Table/Table';
const items = 92;
const bannerContent = {
	title: 'Welcome to Robert Fox!',
	items: items,
};

const tableData = {
	headings: ['Subleder Balance', 'Quickbooks Balance', 'Variance'],
	data: [['$54,365.58', '$120,000.00', '($65,634.42)']],
};
const Index = () => {
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
