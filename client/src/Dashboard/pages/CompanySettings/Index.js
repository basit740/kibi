import React, { useState } from 'react';
import Container from 'dashboard/components/Container';

import Table from 'dashboard/components/Table/Table';
import CustomCbx from 'dashboard/components/CustomCbx';
import { Link } from 'react-router-dom';

const tableData = {
	columns: [
		{ field: 'accountNumber', headerName: 'Account Number', sortable: false },
		{ field: 'accountName', headerName: 'Account Name', sortable: false },
		{
			field: 'amortizationFrequency',
			headerName: 'Amortization Frequency',
			sortable: false,
		},
		{ field: 'actions', headerName: 'Actions', sortable: false },
	],
	rows: [
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
	],
};

const tableData1 = {
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
	],
};

const tableData2 = {
	columns: [
		{ field: 'accountName', headerName: 'Account Name', sortable: false },
		{
			field: 'availableForSelection',
			headerName: 'Available for Selection',
			sortable: false,
		},
	],
	rows: [
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
	columns: [
		{ field: 'accountName', headerName: 'Account Name', sortable: false },
		{
			field: 'availableForSelection',
			headerName: 'Available for Selection',
			sortable: false,
		},
	],
	rows: [
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
	return (
		<Container>
			<Table title='Subledger' tableData={tableData} />
			<div className='w-70 mt-32'>
				<Table title='Quickbooks Accounts' tableData={tableData1} />
			</div>
			<div className='grid grid-2 gap-30 mt-32'>
				<Table title='QuickBooks Class' tableData={tableData2} />
				<Table title='QuickBooks Location' tableData={tableData3} />
			</div>
		</Container>
	);
};

export default Index;
