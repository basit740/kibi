import React from 'react';
import Container from 'dashboard/components/Container';

import Table from 'dashboard/components/Table/Table';
import { Link } from 'react-router-dom';

const tableData = {
	headings: [
		'Account Number',
		'Account Name',
		'Ammorization Frequency',
		'Actions',
	],
	data: [
		[
			'13000',
			'Prepaid Expenses',
			'Monthly',
			<Link to='/dashboard/company-settings'>
				Configure Begginer Subledger
			</Link>,
		],
	],
};

// Quicksbooks Accounts

const tableData1 = {
	headings: ['Account Number', 'Account Name', 'Available for Selection'],
	data: [
		['61000', 'Software', ''],
		['61000', 'Consulting', ''],
		['61000', 'Software', ''],
		['61000', 'Consulting', ''],
		['61000', 'Software', ''],
		['61000', 'Consulting', ''],
		['61000', 'Software', ''],
		['61000', 'Consulting', ''],
	],
};

const Index = () => {
	return (
		<Container>
			<Table title='Subledger' tableData={tableData} />
			<div className='w-70 mt-32'>
				<Table title='Quickbooks Accounts' tableData={tableData1} />
			</div>
		</Container>
	);
};

export default Index;
