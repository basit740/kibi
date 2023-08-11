import React, { useEffect, useState } from 'react';
import AuthWrapper from '../../components/AuthWrapper';
import Control from '../../components/Control';
import Divider from '../../components/Divider';
import TextControl from '../../components/TextControl';
import { useLocation, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { v4 as uuidv4 } from 'uuid';

import 'styling/Auth/SignIn.css';
// import { useOAuth2Token } from 'react-oauth2-hook';

import {
	intuitSignIn,
	validateIdToken,
	intuitGetAccessToken,
	getUserInfo,
} from 'services/intuit';

const Index = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const realmId = params.get('realmId');
	const code = params.get('code');
	const state = params.get('state');
	// const [returnedUUID, setReturnedUUID] = useState('');
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
		const response = await intuitSignIn();
		window.location.href = response.authUri;
	};

	useEffect(() => {
		// change page title
		document.title = 'Kibi | Login';
		// const storedUUID = localStorage.getItem('unqCode');

		// const getUserInfo = async()=>{
		// 	const response = await getUserInfoIntuit();
		// }

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

			(async () => {
				const redirectUrl = `${process.env.REACT_APP_INTUIT_REDIRECT_URI}?code=${code}&state=${state}&realmId=${realmId}`;
				try {
					const accessTokenResponse = await intuitGetAccessToken(redirectUrl);

					console.log('accessTokenResponse', accessTokenResponse);

					localStorage.setItem(
						'intuitAccessToken',
						accessTokenResponse.data.access_token
					);
					localStorage.setItem(
						'ituitIdToken',
						accessTokenResponse.data.id_token
					);

					const userInfoResponse = await getUserInfo(
						accessTokenResponse.data.access_token
					);
					console.log(userInfoResponse);
					// navigate('/dashboard');
					// validate id token
					// const idTokenResponse = await validateIdToken(
					// 	accessTokenResponse.data.id_token
					// );

					// console.log('id token resose....', idTokenResponse);
				} catch (err) {
					console.log(err);
				}
			})();

			// try {
			// 	const redirectUrl = `${process.env.REACT_APP_INTUIT_REDIRECT_URI}?code=${code}&state=${state}&realmId=${realmId}`;

			// 	fetch(process.env.REACT_APP_API_URL + '/intuit-get-code', {
			// 		method: 'POST',
			// 		headers: { 'Content-Type': 'application/json' },
			// 		body: JSON.stringify({
			// 			url: redirectUrl,
			// 		}),
			// 	})
			// 		.then((response) => {
			// 			console.log(response.status); // Output the status
			// 			if (!response.ok) {
			// 				throw new Error('Network response was not ok'); // Throw an error for non-2xx responses
			// 			}
			// 			return response;
			// 		})
			// 		.then((response) => response.json()) // Send response body to next then chain
			// 		.then(async (body) => {
			// 			console.log('body: ', body);
			// 			// window.location.href = '/dashboard';
			// 			localStorage.setItem('intuitAccessToken', body.data.access_token);

			// 			// also validate token here

			// 			const response = await validateIdToken();
			// 			console.log('validted Id token response here>>>>>>>', response);

			// 			navigate('/dashboard');
			// 		})
			// 		.catch((error) => console.error('Error:', error.message)); // Catch any errors that occurred in the chain
			// } catch (err) {
			// 	console.error('Error:', err.message);
			// 	toast.error(err.message);
			// }
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
						Sign In With Intuit -
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
