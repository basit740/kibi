import React from 'react';
import 'styling/Auth/TextControl.css';
const Index = ({
	label,
	className,
	type,
	value,
	onChange,
	placeholder,
	required,
}) => {
	let classes = 'text-control ' + className;
	return (
		<div className={classes}>
			<input
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				autoComplete='off'
				required={required}
			/>
		</div>
	);
};

export default Index;
