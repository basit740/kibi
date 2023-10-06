import React from 'react';
import 'styling/Auth/Control.css';
const Index = ({ children, className, disabled, onClick }) => {
	let classes = 'control ' + className;
	return (
		<button disabled={disabled} className={classes} onClick={onClick}>
			{children}
		</button>
	);
};

export default Index;
