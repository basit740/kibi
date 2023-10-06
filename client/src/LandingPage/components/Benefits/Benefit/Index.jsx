import React from 'react';

import '../../../../styling/LandingPage/Benefits/Benefit.css';

const Index = ({ item }) => {
	const { id, title, description, icon } = item;
	return (
		<li className='benefit'>
			<img src={icon} alt={title} className='benefit__icon' />
			<h3 className='benefit__title'>{title}</h3>
			<p className='benefit__description'>{description}</p>
		</li>
	);
};

export default Index;
