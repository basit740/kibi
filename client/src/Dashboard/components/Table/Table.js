import React from 'react';

import TableRow from './TableRow';
import TableCell from './TableCell';

// css
import '../../../styling/Dashboard/components/Table.css';
const Table = ({ tableData, title }) => {
	const { headings, data } = tableData;
	return (
		<div className='table'>
			<h3 className='table__title'>{title}</h3>
			<div className='table__content'>
				<div className='table__head'>
					<TableRow headingsLength={headings.length}>
						{headings.map((heading, headingIndex) => {
							return (
								<div className='table__heading' key={headingIndex}>
									{heading}
								</div>
							);
						})}
					</TableRow>
				</div>
				<div className='table__body'>
					{data.map((row, rowIndex) => (
						<TableRow key={rowIndex} headingsLength={headings.length}>
							{row.map((cell, cellIndex) => (
								<TableCell key={cellIndex}>{cell}</TableCell>
							))}
						</TableRow>
					))}
				</div>
			</div>
		</div>
	);
};

export default Table;
