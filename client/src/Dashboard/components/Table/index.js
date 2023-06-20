import React from 'react';

import TableRow from './TableRow';
import TableCell from './TableCell';

// css
import '../../../styling/Dashboard/components/Table.css';
const Table = ({ tableData, title, scrollable }) => {
	const { columns, rows } = tableData;
	return (
		<div className='table'>
			<h3 className='table__title'>{title}</h3>
			<div
				className={`table__content ${
					scrollable ? 'table__content--scrollable' : ''
				}`}
			>
				<div className='table__head'>
					<TableRow headingsLength={columns.length}>
						{columns.map((column, columnIndex) => {
							return (
								<div className='table__column' key={columnIndex}>
									{column.headerName}
								</div>
							);
						})}
					</TableRow>
				</div>
				<div className='table__body'>
					{rows.map((row, rowIndex) => (
						<TableRow key={rowIndex} headingsLength={columns.length}>
							{columns.map((column, cellIndex) => (
								<TableCell key={cellIndex}>{row[column.field]}</TableCell>
							))}
						</TableRow>
					))}
				</div>
			</div>
		</div>
	);
};

export default Table;
