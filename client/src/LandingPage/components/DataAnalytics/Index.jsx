import React from 'react';
import VideoPlayer from './Video/Index.jsx';
import '../../../styling/LandingPage/DataAnalytics/DataAnalytics.css';
const Index = () => {
	return (
		<section className='section-data-anaylics'>
			<div className='data-analytics__content'>
				<h2 className='data-analytics__title section-heading'>
					We make it easy to track all data analytics
				</h2>
				<p className='data-analytics__description'>
					Our accounting software revolutionizes journal entry management,
					offering a seamless solution to streamline your financial
					transactions.
				</p>

				<VideoPlayer />
			</div>
		</section>
	);
};

export default Index;
