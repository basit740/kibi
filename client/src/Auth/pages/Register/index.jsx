import React, { useEffect } from 'react';
import AuthWrapper from 'auth/components/AuthWrapper';
import TextControl from 'auth/components/TextControl';
import 'styling/Auth/Register.css';
const Index = () => {
	const handleChangeEmail = (e) => {
		console.log(e.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		window.location.href = '/dashboard';
	};

	useEffect(() => {
		document.title = 'Kibi | Register';
	}, []);

	return (
		<AuthWrapper title='Welcome To Kibi'>
			<div className='register'>
				<form className='register__form' onSubmit={handleSubmit}>
					<div className='form-control'>
						<label htmlFor=''>First Name</label>
						<TextControl
							id='email'
							className='text-control--text'
							type='email'
							onChange={handleChangeEmail}
							placeholder='Your first name'
						/>
					</div>
					<div className='form-control'>
						<label htmlFor=''>Last Name</label>
						<TextControl
							id='email'
							className='text-control--text'
							type='email'
							onChange={handleChangeEmail}
							placeholder='Your last name'
							required={true}
						/>
					</div>

					<div className='form-control'>
						<label htmlFor=''>Email</label>
						<TextControl
							id='email'
							className='text-control--text'
							type='email'
							onChange={handleChangeEmail}
							placeholder='jessica.hanson@example.com'
							required={true}
						/>
					</div>

					<div className='form-control'>
						<label htmlFor='password'>Password</label>
						<TextControl
							id='password'
							className='text-control--password'
							type='password'
							onChange={handleChangeEmail}
							placeholder='Password'
							required={true}
						/>
					</div>
					<div className='form-control'>
						<label htmlFor='password'>Confirm Password</label>
						<TextControl
							id='password'
							className='text-control--password'
							type='password'
							onChange={handleChangeEmail}
							placeholder='Confirm Password'
							required={true}
						/>
					</div>
					<div className='form-control'>
						<label htmlFor='password'>Phone (optional)</label>
						<TextControl
							id='password'
							className='text-control--password'
							type='text'
							onChange={handleChangeEmail}
							placeholder='123-456-789'
						/>
					</div>
					<div className='form-control form-control--checkbox'>
						<input type='checkbox' id='agree-on-terms' />{' '}
						<label htmlFor='agree-on-terms'>
							Agreed to the terms of use and privacy policy.
						</label>
					</div>

					<div className='form__actions'>
						<button className='register__submit' type='submit'>
							Create Account
						</button>
					</div>
				</form>
			</div>
		</AuthWrapper>
	);
};

export default Index;
