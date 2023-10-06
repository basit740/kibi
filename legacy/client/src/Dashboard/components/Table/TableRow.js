import React from 'react';

// css
import '../../../styling/Dashboard/components/Table.css';
const TableRow = ({ children, headingsLength }) => {
	return (
		<div className={`table__row grid grid-${headingsLength} gap-1`}>
			{children}
		</div>
	);
};

export default TableRow;
