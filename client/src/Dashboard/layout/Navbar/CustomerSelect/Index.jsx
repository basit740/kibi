import React from 'react';

// styles
import styles from '../../../../styling/Dashboard/Navbar/CustomerSelect/CustomerSelect.module.css';

const Index = () => {
	return (
		<div className={styles['customer-select']}>
			<label
				htmlFor='custsomer-select-dropdown'
				className={styles['customer-select__label']}
			>
				Customer
			</label>

			<select
				name='customer-select-dropdown'
				id='custsomer-select-dropdown'
				className={styles['customer-select__dropdown']}
			>
				<option value='first'>Suku LLC</option>
				<option value='second'>Second</option>
				<option value='third'>Third</option>
			</select>
		</div>
	);
};

export default Index;
