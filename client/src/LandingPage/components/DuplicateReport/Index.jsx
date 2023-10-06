import React from 'react';
import 'styling/LandingPage/DuplicateReport.css';
const Index = () => {
	return (
		<section className='section-duplicate-report'>
			<div className='duplicate-report'>
				<h2 className='duplicate-report__title'>
					The easy way to duplicate your reports
				</h2>
				<p className='duplicate-report__description'>
					Simply swap the company on your template and build the same report for
					another client in seconds
				</p>
				<div className='duplicate-report__actions'>
					<a
						href='/try'
						className='duplicate-report__btn duplicate-report__btn--try-free'
					>
						Try for free
					</a>
					<a
						href='/contact-us'
						className='duplicate-report__btn duplicate-report__btn--contact-us'
					>
						Contact Us
					</a>
				</div>
			</div>
		</section>
	);
};

export default Index;
