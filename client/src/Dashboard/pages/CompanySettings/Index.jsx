import React, { useEffect, useState } from 'react';
import Container from 'dashboard/components/Container';

import Table from 'dashboard/components/Table';
import CustomCbx from 'dashboard/components/CustomCbx';
import { Link } from 'react-router-dom';
import Dropdown from 'dashboard/components/Dropdown';
import { changeAvailablilityStatus, changeAllAccountsAvailabilityStatus } from 'services/intuit';


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
		]
	},
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
	const [quickbookaccounts, setQuickbookaccounts] = useState()
	const [subledgerAccounts, setSubledgerAccounts] = useState([]);
	const [selectAllButton, setSelectAllButton] = useState(false)

	const AddCustomBoxComp = (accounts) => {
		const result = accounts.Rows.map((row) => {
			const newRow = {
				...row,
				Kibi_AvailableForSelection: (
					<CustomCbx
						_id={row._id}
						id={row.AccountName}
						value={row.Kibi_AvailableForSelection}
						handleChange={handleStatusChange}
					/>
				)
			}
			return newRow;
		})
		return {
			...accounts,
			Rows: result,
		};
	}

	const fetchQuickbookAccounts = async () => {
		try {
			const companyId = localStorage.getItem('companyId')
			const response = await fetch(import.meta.env.VITE_API_URL + '/account-details?companyId=' + companyId);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			// Use the functional form of setState to ensure you're using the latest state
			const newData = data.data.map((row) => row.AccountNumber? row : {...row, AccountNumber: 'XXXX'});
			const newSubledgerAccounts = data.data.filter(row =>  row.DetailType === 'Prepaid Expenses'? true : false)
				
			setSubledgerAccounts([...newSubledgerAccounts])
			setQuickbookaccounts((prevAccounts) => (
				{
					...prevAccounts,
					Rows: [...newData],
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
							headerName: (
								<span className='flex just-between'>
									Available for Selection
									<CustomCbx
										_id={'abc'}
										id='account_settings'
										value={false}
										handleChange={handleSelectAllChange}
									/>
								</span>
							),
							sortable: false,
						},
					]
				}));
			console.log('quickbookaccount', quickbookaccounts);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};


	const handleStatusChange = (event, state, setState, _id) => {
		console.log('i am in the handle change function')
		console.log(event.target.value);
		setState(!state);
		changeAvailablilityStatus({ value: !state, id: _id }).then((response) => {

		}).catch((error) => {
			setState(state);

		})
		// onCheck(id, event.target.checked);
	};
	const handleSelectAllChange = async (event, state, setState) => {
		console.log('i am in the handle change function')
		console.log(!state);
		setState(!state);
		console.log(quickbookaccounts)
		await changeAllAccountsAvailabilityStatus({ value: !state }).then(async (response) => {
			setSelectAllButton(!state)

		}).catch((error) => {
			setState(state);
		})
		console.log(quickbookaccounts)


	}

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
				accountName: (
					<Dropdown
						data={subledgerAccounts}
						value='AccountName'
						displayName='AccountName'
					/>
				),
				amortizationFrequency: 'Monthly',
				actions: (
					<Link to='/dashboard/company-settings'>
						Configure Beginner Subledger
					</Link>
				),
			},
		]
	};


	useEffect(() => {
		fetchQuickbookAccounts();
	}, [selectAllButton]); // The empty dependency array ensures this effect runs only once on component mount.
	return (
		<Container>

			<Table title='Subledger' tableData={tableData} />
			{
				quickbookaccounts &&
				<div className='w-70 mt-32'>
					<Table title='Quickbooks Accounts' tableData={AddCustomBoxComp(quickbookaccounts)} />
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
