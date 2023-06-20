import React from 'react';
import Container from 'dashboard/components/Container';

import Button from 'dashboard/components/Button';

const tableData2 = {
	columns: [
		{ field: 'line', headerName: 'Line', sortable: false },
		{ field: 'name', headerName: 'Name', sortable: false },
		{ field: 'description', headerName: 'description', sortable: false },
		{ field: 'expenseAccount', headerName: 'Expense Account', sortable: false },
		{ field: 'class', headerName: 'Class', sortable: false },
		{ field: 'amount', headerName: 'Amount', sortable: false },
		{
			field: 'currentPeriodExpense',
			headerName: 'Current Period Expense',
			sortable: false,
		},
	],
	rows: [
		{
			accountName: 'Finance',
			// availableForSelection: <CustomCbx id='11' />,
		},
	],
};
const Index = () => {
	const handlePost2QB = (e) => {};
	const handleDownload = (e) => {};
	return (
		<Container>
			<h2>Journal Entries</h2>

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
		</Container>
	);
};

export default Index;
