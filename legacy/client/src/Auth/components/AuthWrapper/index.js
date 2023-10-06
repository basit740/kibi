import React from 'react';
import 'styling/Auth/AuthWrapper.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const Index = ({ title, children }) => {
	return (
		<section className='auth-wrapper'>
			<ToastContainer />
			<div className='auth-wrapper__content'>
				<div className='auth-wrapper__header'>
					<img
						className='auth-wrapper__logo'
						src='icons/color-logo-1.png'
						alt=''
					/>
					<h2 className='auth-wrapper__title'>{title}</h2>
				</div>
				<div className='auth-wrapper__main'>{children}</div>
				<p className='helper__content'>
					{title === 'Sign in to your account' ? (
						<>
							<span>Don’t have an account?</span>{' '}
							<Link to='/register'>Sign Up</Link>
						</>
					) : (
						<>
							<span>Already have an account?</span>{' '}
							<Link to='/login'>Sign In</Link>
						</>
					)}
				</p>
			</div>
		</section>
	);
};

export default Index;
