import React from 'react';

import '../../../../styling/LandingPage/Benefits/PaymentPlan.css';
const Index = () => {
	return (
		<div className='payment-plan'>
			<h3 className='payment-plan__title'>Pricing</h3>
			<p className='payment-plan__description'>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae.
			</p>
			<div className='payment-plan__includes'>
				<p className='payment-plan__includes-title'>Whats included</p>
				<ul className='payment-plan__includes-list'>
					<li className='payment-plan__indluded'>All avanced CRM features</li>
					<li className='payment-plan__indluded'>Up to 50,000 accounts</li>
					<li className='payment-plan__indluded'>Custom branding</li>
				</ul>
			</div>

			<p className='payment__plan-amount-info'>
				<span className='payment-plan__amount'>$199</span>{' '}
				<span className='period'> / Month</span>
			</p>
			<a href='/stripe' className='payment-plan__cta'>
				Get Started
			</a>
			<p className='payment-plan__payment-help'>No credit card required</p>
		</div>
	);
};

export default Index;
