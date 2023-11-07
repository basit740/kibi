import React, { useEffect, useState} from 'react';
import Container from 'dashboard/components/Container';
import Card from 'dashboard/components/UI/Card';
import PeriodsEndDate from 'dashboard/components/PeriodsEndDate';
import Total from 'dashboard/components/Total';
import Table from 'dashboard/components/Table';
import Button from 'dashboard/components/Button';
import Dropdown from 'dashboard/components/Dropdown';

import { useDispatch } from 'react-redux';
// importing services
import { getTransections } from 'services/intuit';

const dates = [
	{
		value: 'May 31, 2023',
		display: 'May 31, 2023',
	},
];


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

	const [quickbookaccounts, setQuickbookaccounts] = useState()
	const [accounts, setAccounts] = useState([]);
	const [selectedAccount, setSelectedAccount] = useState()

	const dispatch = useDispatch();

	const fetchQuickbookAccounts = async () => {
		try {
			const companyId = localStorage.getItem('companyId')
			const response = await fetch(import.meta.env.VITE_API_URL + '/available-account-details?companyId=' + companyId);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			// Use the functional form of setState to ensure you're using the latest state
			const newAccounts = data.data
			setAccounts(newAccounts)
			setSelectedAccount(newAccounts[0])
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(async ()=> {
		fetchQuickbookAccounts();
		const response = await getTransections();
		console.log(response)

	},[])

	const updateSelectedAccount = (e) =>{
		console.log(e.target.value)
		const newSelectedAccount = accounts.find(a => a.AccountName === e.target.value)
		setSelectedAccount(newSelectedAccount);
	}

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
				quickbooksBalance: selectedAccount? selectedAccount.Balance : '' ,
				name: (<Dropdown
				data={accounts}
				handleChange={updateSelectedAccount}
				value='AccountName'
				displayName='AccountName'
			/>),
				memo: selectedAccount? selectedAccount.Description: '',
				expenseAccount: 'Software',
				class: 'Finance',
			},
			// {
			// 	transactionType: 'Invoice',
			// 	quickbooksBalance: 'INV1234',
			// 	name: (<Dropdown
			// 		data={accounts}
			// 		value='AccountName'
			// 		displayName='AccountName'
			// 	/>),			memo: 'Consulting Services',
			// 	expenseAccount: 'Services',
			// 	class: 'Operations',
			// },
			// {
			// 	transactionType: 'Bill',
			// 	quickbooksBalance: 'INV7890',
			// 	name: (<Dropdown
			// 		data={accounts}
			// 		value='AccountName'
			// 		displayName='AccountName'
			// 	/>),
			// 	memo: 'Office Supplies',
			// 	expenseAccount: 'Office Expenses',
			// 	class: 'Legal',
			// },
			// {
			// 	transactionType: 'Expense',
			// 	quickbooksBalance: 'INV5678',
			// 	name: (<Dropdown
			// 		data={accounts}
			// 		value='AccountName'
			// 		displayName='AccountName'
			// 	/>),
			// 	memo: 'Marketing Campaign',
			// 	expenseAccount: 'Marketing',
			// 	class: 'Operations',
			// },
		],
	};
	

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
