import React from 'react';
import Container from 'dashboard/components/Container';

import Table from 'dashboard/components/Table/Table';
import CustomCbx from 'dashboard/components/CustomCbx';
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
		['61000', 'Software', <CustomCbx id='1' />],
		['61000', 'Consulting', <CustomCbx id='2' />],
		['61000', 'Software', <CustomCbx id='3' />],
		['61000', 'Consulting', <CustomCbx id='4' />],
		['61000', 'Software', <CustomCbx id='5' />],
		['61000', 'Consulting', <CustomCbx id='6' />],
		['61000', 'Software', <CustomCbx id='7' />],
		['61000', 'Consulting', <CustomCbx id='8' />],
	],
};

const tableData2 = {
	headings: ['Account Number', 'Account Name', 'Ammorization Frequency'],
	data: [['13000', 'Prepaid Expenses', 'Monthly']],
};

const tableData3 = {
	columns: [
		{ field: 'accountNumber', headerName: 'Account Number', sortable: false },
		{ field: 'accountName', headerName: 'Account Name', sortable: false },
		{
			field: 'availableForSelection',
			headerName: 'Available for Selection',
			sortable: false,
		},
	],
	rows: [
		{
			accountNumber: '61000',
			accountName: 'Software',
			availableForSelection: <CustomCbx id='1' />,
		},
		{
			accountNumber: '61000',
			accountName: 'Consulting',
			availableForSelection: <CustomCbx id='2' />,
		},
	],
};

const Index = () => {
	return (
		<Container>
			<Table title='Subledger' tableData={tableData} />
			<div className='w-70 mt-32'>
				<Table title='Quickbooks Accounts' tableData={tableData1} />
				<Table title='Quickbooks Accounts 2' tableData={tableData3} />
			</div>
		</Container>
	);
};

export default Index;
