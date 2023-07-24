import React from 'react';
import 'styling/Auth/Control.css';
const Index = ({ children, className }) => {
	let classes = 'control ' + className;
	return <button className={classes}>{children}</button>;
};

export default Index;
