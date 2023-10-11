import React, { useState } from 'react';
import '../../../styling/Dashboard/components/CustomCbx.css';
import Switch from './Switch';

const CustomCbx = ({ id, _id, value, handleChange }) => {
	const switchId = 'id-' + id;
	console.log('value', value)
	const [checked, setChecked] = useState(value);

	

	return (
		<div className={`custom_cbx ${checked ? 'checked' : ''}`}>
			<input
				type='checkbox'
				value={checked}
				className={`custom_cbx__checkbox`}
				id={switchId}
				onClick={(e)=>handleChange(e, checked, setChecked, _id)}
			/>
			<label htmlFor={switchId} className='custom_cbx__label'>
				{checked ? 'No' : 'Yes'}
				<Switch />
			</label>
		</div>
	);
};

export default CustomCbx;
