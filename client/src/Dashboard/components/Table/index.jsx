import React from 'react';

import TableRow from './TableRow';
import TableCell from './TableCell';
import { formatMoney } from 'accounting-js';
import CustomCbx from 'dashboard/components/CustomCbx';
import Loader from 'dashboard/components/Loader'
// css
import '../../../styling/Dashboard/components/Table.css';

const Table = ({ tableData, title, scrollable }) => {
	const { Columns, Rows } = tableData;

	if (!tableData) {
		return (
			<Loader size='lg' />
		);
	}

	return (
		<div className='table'>
			<h3 className='table__title'>{title}</h3>
			<div
				className={`table__content ${scrollable ? 'table__content--scrollable' : ''
					}`}
			>
				<div className='table__head'>
					<TableRow headingsLength={Columns.length}>
						{Columns.map((column, columnIndex) => {
							return (
								<div className='table__column' key={columnIndex}>
									{column.headerName}
								</div>
							);
						})}
					</TableRow>
				</div>
				<div className='table__body'>
					{Rows.map((row, rowIndex) => (
						<TableRow key={rowIndex} headingsLength={Columns.length}>
							{Columns.map((column, cellIndex) => {
								return (
									<TableCell key={cellIndex}>
										{row[column.field]}
									</TableCell>
								)
							})}
						</TableRow>
					))}
				</div>
			</div>
		</div>
	);
};

export default Table;
