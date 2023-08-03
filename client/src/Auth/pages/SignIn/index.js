import React, { useEffect, useState } from 'react';
import AuthWrapper from '../../components/AuthWrapper';
import Control from '../../components/Control';
import Divider from '../../components/Divider';
import TextControl from '../../components/TextControl';
import { useLocation } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { v4 as uuidv4 } from 'uuid';

import 'styling/Auth/SignIn.css';
// import { useOAuth2Token } from 'react-oauth2-hook';

import { intuitSignIn } from 'services/intuit';

const Index = () => {
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const realmId = params.get('realmId');
	const code = params.get('code');
	const state = params.get('state');
	const [returnedUUID, setReturnedUUID] = useState('');
	const handleChangeEmail = (e) => {
		console.log(e.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		window.location.href = '/dashboard';
	};

	const handleClickGoogle = async () => {
		alert('Click Google');
	};

	// const notify = ({errorEmw}) => toast('UNAUTHORIZED_REQUEST!');

	const handleClickInuite = async () => {
		//https://appcenter.intuit.com/connect/oauth2?client_id=ABAc1kMQ3krUiAKWA5hP3I9hnXYH0SpuZjx3ld5pcRwCO4yABP&redirect_uri=https://438c-39-62-29-82.ngrok-free.app/login&scope=com.intuit.quickbooks.accounting&response_type=code&state=token_xxx
		// send authorization request to quickbooks
		// try {
		// 	// await intuitSignIn();
		const response = await intuitSignIn();
		// 	// const response = await intuitSignInClient();
		// 	console.log(response);
		// 	window.location.href = response.authUri;
		// } catch (e) {
		// 	console.error(e.message);
		// }

		// const unqCode = uuidv4();
		// localStorage.setItem('unqCode', unqCode);

		// const clientId = process.env.REACT_APP_INTUIT_CLIENT_ID;
		// const redirectUri = process.env.REACT_APP_INTUIT_REDIRECT_URI;
		// const intuitAuthUrl = process.env.REACT_APP_INTUIT_AUTH_URL;
		// const intuitScope = process.env.REACT_APP_INTUIT_SCOPE;

		// window.location.href = `${intuitAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${intuitScope}&response_type=code&state=${unqCode}`;
		window.location.href = response.authUri;
	};

	useEffect(() => {
		const storedUUID = localStorage.getItem('unqCode');

		if (state) {
			// if (state !== storedUUID) {
			// 	toast.error('UNAUTHORIZED_REQUEST !', {
			// 		position: toast.POSITION.TOP_LEFT,
			// 	});
			// 	return;
			// }

			// make api call to get data

			const clientId = process.env.REACT_APP_INTUIT_CLIENT_ID;
			const clientSecret = process.env.REACT_APP_INTUIT_CLIENT_SECRET;
			const redirectUri = process.env.REACT_APP_INTUIT_REDIRECT_URI;

			const credentials = `${clientId}:${clientSecret}`;
			const encodedCredentials = btoa(credentials);

			const urlEncodeData = (data) => {
				return Object.keys(data)
					.map(
						(key) =>
							encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
					)
					.join('&');
			};
			// const data = {
			// 	grant_type: 'authorization_code',
			// 	code,
			// 	redirect_uri: redirectUri,
			// };

			// const headers = {
			// 	Accept: 'application/json', // Example header, you can add more if needed
			// 	'Content-Type': 'application/x-www-form-urlencoded',
			// 	Authorization: `Basic ${encodedCredentials}`,
			// };
			try {
				const redirectUrl = `${process.env.REACT_APP_INTUIT_REDIRECT_URI}?code=${code}&state=${state}&realmId=${realmId}`;

				fetch('http://localhost:8080/api/v1/intuit-get-code', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						url: redirectUrl,
					}),
				})
					.then((response) => {
						console.log(response.status); // Output the status
						if (!response.ok) {
							throw new Error('Network response was not ok'); // Throw an error for non-2xx responses
						}
						return response;
					})
					.then((response) => response.json()) // Send response body to next then chain
					.then((body) => console.log(body))
					.catch((error) => console.error('Error:', error.message)); // Catch any errors that occurred in the chain
			} catch (err) {
				console.error('Error:', err.message);
				toast.error(err.message);
			}
		}
	}, []);

	return (
		<AuthWrapper title='Sign in to your account'>
			<div className='sign-in'>
				<div className='sign-in__third-party'>
					<Control
						className='google'
						disabled={true}
						onClick={handleClickGoogle}
					>
						<div className='google-control'>
							<img
								className='google-log'
								src='/icons/google-logo.png'
								alt='google logo'
							/>
							<span>Sign In With Google</span>
						</div>
					</Control>
					<Control className='intuit' onClick={handleClickInuite}>
						Sign In With Intuit
					</Control>

					<Divider />
				</div>
				<form className='sign-in__form' onSubmit={handleSubmit}>
					<div className='form-control'>
						<label htmlFor=''>Email</label>
						<TextControl
							id='email'
							className='text-control--text'
							type='email'
							onChange={handleChangeEmail}
							placeholder='jessica.hanson@example.com'
						/>
					</div>

					<div className='form-control'>
						<label htmlFor='password'>Password</label>
						<TextControl
							id='password'
							className='text-control--password'
							type='password'
							onChange={handleChangeEmail}
							placeholder='Type your Password'
						/>
					</div>
					<div className='form__actions'>
						<button className='sign-in__submit' type='submit'>
							Sign In
						</button>
					</div>
				</form>
			</div>
		</AuthWrapper>
	);
};

export default Index;
