import React, { useState } from 'react';
import { changeAvailablilityStatus } from 'services/intuit';
import '../../../styling/Dashboard/components/CustomCbx.css';
import Switch from './Switch';

const CustomCbx = ({ id, _id, value }) => {
	const switchId = 'id-' + id;

	const [checked, setChecked] = useState(value);

	const handleChange = (event) => {
		console.log(event.target.checked);
		changeAvailablilityStatus({value: event.target.checked, id: _id}).then((response)=>{
			setChecked(event.target.checked);

		})
		// onCheck(id, event.target.checked);
	};

	return (
		<div className={`custom_cbx ${checked ? 'checked' : ''}`}>
			<input
				type='checkbox'
				value='dark'
				className={`custom_cbx__checkbox`}
				id={switchId}
				onChange={handleChange}
			/>
			<label htmlFor={switchId} className='custom_cbx__label'>
				{checked ? 'No' : 'Yes'}
				<Switch />
			</label>
		</div>
	);
};

export default CustomCbx;
