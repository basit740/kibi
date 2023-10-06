import React from 'react';

import Container from 'dashboard/components/Container';
import Table from 'dashboard/components/Table';

import { Link } from 'react-router-dom';

const dates = [
	{
		value: 'May 31, 2023',
		display: 'May 31, 2023',
	},
];

const tableData = {
	Columns: [
		{
			field: 'line',
			headerName: 'Line',
			sortable: true,
		},

		{ field: 'name', headerName: 'Name', sortable: true },
		{ field: 'description', headerName: 'Description', sortable: true },
		{
			field: 'expenseAccount',
			headerName: 'Expense Account',
			sortable: true,
		},
		{
			field: 'class',
			headerName: 'Class',
			sortable: true,
		},
		{
			field: 'amount',
			headerName: 'Amount',
			sortable: true,
		},
		{
			field: 'currentPeriodExpense',
			headerName: 'Current Period Expense',
			sortable: true,
		},
	],
	Rows: [
		{
			line: '1',
			name: 'Google',
			description: 'Google Cloud',
			expenseAccount: 'Software',
			class: 'Finance',
			amount: 10000,
			currentPeriodExpense: 20000,
		},
		{
			line: '2',
			name: 'Microsoft',
			description: 'Azure Cloud',
			expenseAccount: 'Software',
			class: 'Finance',
			amount: 15000,
			currentPeriodExpense: 25000,
		},
		{
			line: '3',
			name: 'Amazon',
			description: 'Amazon Web Services',
			expenseAccount: 'Software',
			class: 'Finance',
			amount: 12000,
			currentPeriodExpense: 18000,
		},
		{
			line: '4',
			name: 'IBM',
			description: 'IBM Cloud',
			expenseAccount: 'Software',
			class: 'Finance',
			amount: 9000,
			currentPeriodExpense: 22000,
		},
		{
			line: '5',
			name: 'Salesforce',
			description: 'Salesforce CRM',
			expenseAccount: 'Software',
			class: 'Sales',
			amount: 8000,
			currentPeriodExpense: 15000,
		},
		{
			line: '6',
			name: 'Oracle',
			description: 'Oracle Cloud',
			expenseAccount: 'Software',
			class: 'Finance',
			amount: 11000,
			currentPeriodExpense: 19000,
		},
		{
			line: '7',
			name: 'Adobe',
			description: 'Adobe Creative Cloud',
			expenseAccount: 'Software',
			class: 'Marketing',
			amount: 7000,
			currentPeriodExpense: 12000,
		},
		{
			line: '8',
			name: 'SAP',
			description: 'SAP ERP',
			expenseAccount: 'Software',
			class: 'Operations',
			amount: 10000,
			currentPeriodExpense: 17000,
		},
		{
			line: '9',
			name: 'Cisco',
			description: 'Cisco Networking',
			expenseAccount: 'Hardware',
			class: 'IT',
			amount: 5000,
			currentPeriodExpense: 9000,
		},
		{
			line: '10',
			name: 'HP',
			description: 'HP Servers',
			expenseAccount: 'Hardware',
			class: 'IT',
			amount: 6000,
			currentPeriodExpense: 10000,
		},
		{
			line: '11',
			name: 'Dell',
			description: 'Dell Laptops',
			expenseAccount: 'Hardware',
			class: 'IT',
			amount: 4000,
			currentPeriodExpense: 8000,
		},
		{
			line: '12',
			name: 'Lenovo',
			description: 'Lenovo Desktops',
			expenseAccount: 'Hardware',
			class: 'IT',
			amount: 5500,
			currentPeriodExpense: 9500,
		},
	],
};

const tableData1 = {
	Columns: [
		{
			field: 'period',
			headerName: 'Period',
			sortable: true,
		},

		{ field: 'download', headerName: 'Download', sortable: true },
	],
	Rows: [
		{
			period: 'March 2023',
			download: <Link to='/download-excel'>Download to Excel</Link>,
		},
		{
			period: 'Januray 2023',
			download: <Link to='/download-excel'>Download to Excel</Link>,
		},
		{
			period: 'Feb 2023',
			download: <Link to='/download-excel'>Download to Excel</Link>,
		},
	],
};

const items = [
	{
		title: 'Period',
		data: 'March 2023',
	},
	{
		title: 'Total Amortization Expense',
		data: 11000,
	},
];
const Index = () => {
	return (
		<Container>
			<Table
				title='Amortization Waterfall'
				scrollable={true}
				tableData={tableData}
			/>

			<div className='w-40 mt-40'>
				<Table title='Amortization Waterfall' tableData={tableData1} />
			</div>
		</Container>
	);
};

export default Index;
