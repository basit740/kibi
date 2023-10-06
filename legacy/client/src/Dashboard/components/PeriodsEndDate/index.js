import React from 'react';

import styles from 'styling/Dashboard/components/PeriodsEndDate.module.css';
const PeriodsEndDate = ({ dates }) => {
	return (
		<div className={`flex align-center gap-4 ${styles.periods_end_date}`}>
			<h4 className={styles.periods_end_date__title}>Period End Date</h4>
			<select name='period-end-date' id='period-end-date'>
				{/* <option value='May 31, 2023'>May 31, 2023</option> */}
				{dates.map((date) => (
					<option value={date.value}>{date.display}</option>
				))}
			</select>
		</div>
	);
};

export default PeriodsEndDate;
