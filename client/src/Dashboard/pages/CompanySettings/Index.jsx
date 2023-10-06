import React, { useEffect, useState } from 'react';
import Container from 'dashboard/components/Container';

import Table from 'dashboard/components/Table';
import CustomCbx from 'dashboard/components/CustomCbx';
import { Link } from 'react-router-dom';

const tableData = {
	Columns: [
			{ field: 'accountNumber', headerName: 'Account Number', sortable: false },
			{ field: 'accountName', headerName: 'Account Name', sortable: false },
			{
				field: 'amortizationFrequency',
				headerName: 'Amortization Frequency',
				sortable: false,
			},
			{ field: 'actions', headerName: 'Actions', sortable: false },
		],
	Rows: [
		{
			accountNumber: '13000',
			accountName: 'Prepaid Expenses',
			amortizationFrequency: 'Monthly',
			actions: (
				<Link to='/dashboard/company-settings'>
					Configure Beginner Subledger
				</Link>
			),
		},
	]
};

const tableData1 = {
	Columns: {
		Column: [
			{ field: 'accountNumber', headerName: 'Account Number', sortable: false },
			{ field: 'accountName', headerName: 'Account Name', sortable: false },
			{
				field: 'availableForSelection',
				headerName: 'Available for Selection',
				sortable: false,
			},
		]
	},
	Rows: {
		Row: [
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
		{
			accountNumber: '61000',
			accountName: 'Software',
			availableForSelection: <CustomCbx id='3' />,
		},
		{
			accountNumber: '61000',
			accountName: 'Consulting',
			availableForSelection: <CustomCbx id='4' />,
		},
		{
			accountNumber: '61000',
			accountName: 'Software',
			availableForSelection: <CustomCbx id='5' />,
		},
		{
			accountNumber: '61000',
			accountName: 'Consulting',
			availableForSelection: <CustomCbx id='6' />,
		},
		{
			accountNumber: '61000',
			accountName: 'Software',
			availableForSelection: <CustomCbx id='7' />,
		},
		{
			accountNumber: '61000',
			accountName: 'Consulting',
			availableForSelection: <CustomCbx id='8' />,
		},
	]},
};

const tableData2 = {
	Columns: [
		{ field: 'accountName', headerName: 'Account Name', sortable: false },
		{
			field: 'availableForSelection',
			headerName: 'Available for Selection',
			sortable: false,
		},
	],
	Rows: [
		{
			accountName: 'Finance',
			availableForSelection: <CustomCbx id='11' />,
		},
		{
			accountName: 'Operations',
			availableForSelection: <CustomCbx id='22' />,
		},
		{
			accountName: 'Legal',
			availableForSelection: <CustomCbx id='33' />,
		},
	],
};

const tableData3 = {
	Columns: [
		{ field: 'accountName', headerName: 'Account Name', sortable: false },
		{
			field: 'availableForSelection',
			headerName: 'Available for Selection',
			sortable: false,
		},
	],
	Rows: [
		{
			accountName: 'Finance',
			availableForSelection: <CustomCbx id='111' />,
		},
		{
			accountName: 'Operations',
			availableForSelection: <CustomCbx id='222' />,
		},
		{
			accountName: 'Legal',
			availableForSelection: <CustomCbx id='333' />,
		},
	],
};

const Index = () => {
	const [quickbookaccounts, setQuickbookaccounts] = useState(null)

	useEffect(() => {
		const fetchQuickbookAccounts = async () => {
		  try {
			const companyId = localStorage.getItem('companyId')
			const response = await fetch(import.meta.env.VITE_API_URL + '/account-details?companyId=' + companyId);
			if (!response.ok) {
			  throw new Error('Network response was not ok');
			}
			const data = await response.json();
			// Use the functional form of setState to ensure you're using the latest state
			const newData = data.data.map((row)=>{
				if(row.AccountNumber){
					return row;
				}
				return {...row, AccountNumber: 'XXXX'}
			})
			setQuickbookaccounts((prevAccounts) =>  (
				{
					Rows: newData, 
					Columns: [
				{ 
					field: 'AccountNumber', 
					headerName: 'Account Number', 
					sortable: false 
				},
				{ 
					field: 'AccountName', 
					headerName: 'Account Name', 
					sortable: false 
				},
				{
					field: 'Kibi_AvailableForSelection',
					headerName: 'Available for Selection',
					sortable: false,
				},
			]}));
			console.log('quickbookaccount', data.data);
		  } catch (error) {
			console.error('Error fetching data:', error);
		  }
		};
	
		fetchQuickbookAccounts();
	  }, []); // The empty dependency array ensures this effect runs only once on component mount.
	return (
		<Container>

			<Table title='Subledger' tableData={tableData} />
			{
				quickbookaccounts &&
				<div className='w-70 mt-32'>
					<Table title='Quickbooks Accounts' tableData={quickbookaccounts} />
				</div>
			}
			<div className='grid grid-2 gap-30 mt-32'>
				<Table title='QuickBooks Class' tableData={tableData2} />
				<Table title='QuickBooks Location' tableData={tableData3} />
			</div>
		</Container>
	);
};

export default Index;
