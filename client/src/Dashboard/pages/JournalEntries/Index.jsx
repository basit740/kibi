import React from 'react';
import Container from 'dashboard/components/Container';

import Button from 'dashboard/components/Button';
import Card from 'dashboard/components/UI/Card';
import PeriodsEndDate from 'dashboard/components/PeriodsEndDate';
import Total from 'dashboard/components/Total';
import Table from 'dashboard/components/Table';

import JournalEntry from 'dashboard/components/JournalEntry';
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
		{
			line: '',
			name: '',
			description: '',
			expenseAccount: '',
			class: '',
			amount: 'Total',
			currentPeriodExpense: 3000000,
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
	const handlePost2QB = (e) => {};
	const handleDownload = (e) => {};
	return (
		<Container>
			<div className='grid grid-4 gap-24 mt-32 mb-32'>
				<Card>
					<PeriodsEndDate dates={dates} />
				</Card>
				<Card>
					<Total title='Subledger Balance' amount='118200' />
				</Card>
				<Card>
					<Total title='QuickBooks Balance' amount='118200' />
				</Card>
				<Card>
					<Total title='Variance' amount='' />
				</Card>
			</div>

			{/* BUTTON ACTIONS */}
			<div className='flex just-end'>
				<div className='flex gap-8'>
					<Button
						title='Post to quickbooks'
						variant='outlined'
						onClick={handlePost2QB}
					/>
					<Button title='Download' variant='fill' onClick={handleDownload} />
				</div>
			</div>

			<Table
				title='Journal Entry Review'
				scrollable={true}
				tableData={tableData}
			/>
			<h2 className='section_heading mt-32 mb-32'>
				Historical Journal Entries
			</h2>

			<div className='flex gap-24 scrollable'>
				<JournalEntry items={items} />
				<JournalEntry items={items} />
				<JournalEntry items={items} />
				<JournalEntry items={items} />
				<JournalEntry items={items} />
				<JournalEntry items={items} />
				<JournalEntry items={items} />
				<JournalEntry items={items} />
				<JournalEntry items={items} />
			</div>
		</Container>
	);
};

export default Index;
