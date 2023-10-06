import React from 'react';
import '../../../styling/LandingPage/Footer.css';

import DuplicateReport from '../DuplicateReport/Index.jsx';
const Index = () => {
	return (
		<footer className='footer'>
			<DuplicateReport />
			<nav className='footer__nav'>
				<a href='/' className='footer__brand'>
					<img src='/icons/color-logo.png' alt='' />
				</a>
				<ul className='footer__nav-list'>
					<li className='footer__nav-item'>
						<a href='/terms'>Terms</a>
					</li>
					<li className='footer__nav-item'>
						<a href='/privacy-policy'>Privacy Policy</a>
					</li>
					<li className='footer__nav-item'>
						<a href='/security'>Security</a>
					</li>
				</ul>
			</nav>
		</footer>
	);
};

export default Index;
