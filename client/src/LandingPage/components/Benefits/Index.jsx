import React from 'react';

import Benefit from './Benefit/Index.jsx';
import PaymentPlan from './PaymentPlan/Index.jsx';

import '../../../styling/LandingPage/Benefits/Benefits.css';
const benefitsData = [
	{
		id: 1,
		icon: 'icons/dataAccuracy.png',
		title: 'Enhanced Data Accuracy',
		description:
			'Financial report data showing software uses advanced algorithms and automation to compile and present financial information. This reduces the chances of human error.',
	},
	{
		id: 2,
		icon: 'icons/realTimeDataAccess.png',
		title: 'Real-time Data Access',
		description:
			'Financial report data showing software can connect with various data sources, databases, enabling real-time data updates.',
	},
	{
		id: 3,
		icon: 'icons/timeEfficiency.png',
		title: 'Time Efficiency',
		description:
			'The software streamlines the process of generating financial reports by automating repetitive tasks, such as data collection, calculations, and formatting.',
	},
];
const Index = () => {
	return (
		<section className='section-benefits'>
			<div className='section-benefits__content'>
				<h2 className='benefits__title'>Benefits of Kibi</h2>
				<p className='benefits__description'>
					Our accounting software revolutionizes journal entry management,
					offering a seamless solution to streamline your financial
					transactions.
				</p>
				<div className='benefits__container'>
					<ul className='benefits__list'>
						{benefitsData.map((item) => (
							<Benefit item={item} key={item.id} />
						))}
					</ul>
					<PaymentPlan />
				</div>
			</div>
		</section>
	);
};

export default Index;
