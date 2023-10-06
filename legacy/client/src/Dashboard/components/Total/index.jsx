import React from 'react';
import styles from 'styling/Dashboard/components/Total.module.css';
import { formatMoney } from 'accounting-js';
const Total = ({ amount, title }) => {
	return (
		<div className={styles.total}>
			<h3 className={styles.total__title}>{title}</h3>
			<h3 className={styles.total__amount}>
				{amount ? formatMoney(amount) : '--'}
			</h3>
		</div>
	);
};

export default Total;
