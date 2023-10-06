import React from 'react';
import './Button.css';
const index = ({ onClick, title, variant }) => {
	const handleClick = (e) => {
		onClick(e);
	};
	return (
		<button
			className={`kibi_button ${
				variant === 'fill' ? 'kibi_button--fill' : 'kibi_button--outlined'
			}`}
			onClick={handleClick}
		>
			{title}
		</button>
	);
};

export default index;
