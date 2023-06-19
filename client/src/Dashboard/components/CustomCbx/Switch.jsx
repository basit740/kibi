import React from 'react';
import '../../../styling/Dashboard/components/Switch.css';
const Index = ({ dark }) => {
	return (
		<span className='switch'>
			<span className={`switch__track ${dark ? 'dark' : ''}`}>
				<span className='switch__ball'></span>
			</span>
		</span>
	);
};

export default Index;
