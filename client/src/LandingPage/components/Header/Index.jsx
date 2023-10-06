import React from 'react';
import Hero from '../Hero/Index.jsx';
import HeroImage from '../HeroImage/Index.jsx';
import '../../../styling/LandingPage/Header.css';
const Index = () => {
	return (
		<header className='main-header'>
			<div className='header'>
				<nav className='main-nav'>
					<a href='/' className='brand'>
						<img src='logo.png' alt='brand' />
					</a>
					<ul className='main-nav__list'>
						<li className='main-nav__list-item'>
							<a href='/request-a-demo' className='main-nav__link'>
								Request a demo
							</a>
						</li>
						<li className='main-nav__list-item'>
							<a
								href='/login'
								className='main-nav__link main-nav__link--outline'
							>
								Log In
							</a>
						</li>
					</ul>
				</nav>
				<Hero />
			</div>
			<HeroImage />
		</header>
	);
};

export default Index;
