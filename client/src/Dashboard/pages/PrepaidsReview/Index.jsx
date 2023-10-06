import React from 'react';
import Container from 'dashboard/components/Container';
import Card from 'dashboard/components/UI/Card';
import PeriodsEndDate from 'dashboard/components/PeriodsEndDate';
import Total from 'dashboard/components/Total';
import Table from 'dashboard/components/Table';
import Button from 'dashboard/components/Button';

const dates = [
	{
		value: 'May 31, 2023',
		display: 'May 31, 2023',
	},
];

const tableData = {
	Columns: [
		{
			field: 'transactionType',
			headerName: 'Transaction Type',
			sortable: true,
		},
		{
			field: 'quickbooksBalance',
			headerName: 'Quickbooks Balance',
			sortable: true,
		},
		{ field: 'name', headerName: 'Name', sortable: true },
		{ field: 'memo', headerName: 'Memo/Description', sortable: true },
		{
			field: 'expenseAccount',
			headerName: 'Expense Account',
			sortable: true,
		},
	],
	Rows: [
		{
			transactionType: 'Bill',
			quickbooksBalance: 'INV9865',
			name: 'ABC Crop',
			memo: 'Insurance Jan-July',
			expenseAccount: 'Software',
			class: 'Finance',
		},
		{
			transactionType: 'Invoice',
			quickbooksBalance: 'INV1234',
			name: 'XYZ Corp',
			memo: 'Consulting Services',
			expenseAccount: 'Services',
			class: 'Operations',
		},
		{
			transactionType: 'Bill',
			quickbooksBalance: 'INV7890',
			name: 'DEF Enterprises',
			memo: 'Office Supplies',
			expenseAccount: 'Office Expenses',
			class: 'Legal',
		},
		{
			transactionType: 'Expense',
			quickbooksBalance: 'INV5678',
			name: 'GHI Inc.',
			memo: 'Marketing Campaign',
			expenseAccount: 'Marketing',
			class: 'Operations',
		},
	],
};

const tableData2 = {
	Columns: [
		{
			field: 'transactionType',
			headerName: 'Transaction Type',
			sortable: true,
		},
		{
			field: 'quickbooksBalance',
			headerName: 'Quickbooks Balance',
			sortable: true,
		},
		{ field: 'name', headerName: 'Name', sortable: true },
		{ field: 'memo', headerName: 'Memo/Description', sortable: true },
		{
			field: 'expenseAccount',
			headerName: 'Expense Account',
			sortable: true,
		},
	],
	Rows: [
		{
			transactionType: 'Bill',
			quickbooksBalance: 'INV9865',
			name: 'ABC Crop',
			memo: 'Insurance Jan-July',
			expenseAccount: 'Software',
			class: 'Legal',
		},
		{
			transactionType: 'Invoice',
			quickbooksBalance: 'INV1234',
			name: 'XYZ Corp',
			memo: 'Consulting Services',
			expenseAccount: 'Services',
			class: 'Legal',
		},
		{
			transactionType: 'Bill',
			quickbooksBalance: 'INV7890',
			name: 'DEF Enterprises',
			memo: 'Office Supplies',
			expenseAccount: 'Office Expenses',
			class: 'Legal',
		},
		{
			transactionType: 'Expense',
			quickbooksBalance: 'INV5678',
			name: 'GHI Inc.',
			memo: 'Marketing Campaign',
			expenseAccount: 'Marketing',
			class: 'Legal',
		},
		{
			transactionType: 'Invoice',
			quickbooksBalance: 'INV4321',
			name: 'LMN Corporation',
			memo: 'Product Sales',
			expenseAccount: 'Sales',
			class: 'Operations',
		},
		{
			transactionType: 'Bill',
			quickbooksBalance: 'INV9876',
			name: 'PQR Ltd.',
			memo: 'Equipment Purchase',
			expenseAccount: 'Equipment',
			class: 'Legal',
		},
		{
			transactionType: 'Expense',
			quickbooksBalance: 'INV6543',
			name: 'STU Corp',
			memo: 'Travel Expenses',
			expenseAccount: 'Travel',
			class: 'Legal',
		},
		{
			transactionType: 'Invoice',
			quickbooksBalance: 'INV7899',
			name: 'VWX Enterprises',
			memo: 'Website Development',
			expenseAccount: 'Web Services',
			class: 'Legal',
		},
	],
};

const Index = () => {
	const handlePrepare4Jentry = (e) => {};

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

			<Table title='Prepaids Review' scrollable={true} tableData={tableData} />
			<div className='flex just-end mt-32'>
				<Button
					title='Prepare of Journal Entry'
					onClick={handlePrepare4Jentry}
				/>
			</div>
			<Table title='Subledger' scrollable={true} tableData={tableData2} />
		</Container>
	);
};

export default Index;
