import React, { useEffect, useState } from 'react';

import AuthWrapper from '../../components/AuthWrapper';
import Control from '../../components/Control';
import Divider from '../../components/Divider';
import TextControl from '../../components/TextControl';
import { useLocation, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { v4 as uuidv4 } from 'uuid';

import 'styling/Auth/SignIn.css';
// import { useOAuth2Token } from 'react-oauth2-hook';

import { getIntuitAuthUri } from 'services/intuit';
// import { toToastItem } from 'react-toastify/dist/utils';

const Index = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	console.log(params)
	const realmId = params.get('realmId');
	const code = params.get('code');
	const state = params.get('state');

	const [loading, setLoading] = useState(false);
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
		const response = await getIntuitAuthUri();
		window.location.href = response.authUri;
	};

	// useEffect(() => {
	// 	if (state) {
	// 		const clientId = import.meta.env.VITE_INTUIT_CLIENT_ID;
	// 		const clientSecret = import.meta.env.VITE_INTUIT_CLIENT_SECRET;

	// 		const credentials = `${clientId}:${clientSecret}`;

	// 		(async () => {
	// 			const redirectUrl = `${import.meta.env.VITE_INTUIT_REDIRECT_URI}?code=${code}&state=${state}&realmId=${realmId}`;
	// 			try {
	// 				const accessTokenResponse = await intuitGetAccessToken(redirectUrl);

	// 				console.log('accessTokenResponse', accessTokenResponse);

	// 				localStorage.setItem(
	// 					'intuitAccessToken',
	// 					accessTokenResponse.data.access_token
	// 				);
	// 				localStorage.setItem(
	// 					'ituitIdToken',
	// 					accessTokenResponse.data.id_token
	// 				);

	// 				const userInfoResponse = await getUserInfo(
	// 					accessTokenResponse.data.access_token
	// 				);
	// 				console.log(userInfoResponse);
	// 				// navigate('/dashboard');
	// 				// validate id token
	// 				// const idTokenResponse = await validateIdToken(
	// 				// 	accessTokenResponse.data.id_token
	// 				// );

	// 				// console.log('id token resose....', idTokenResponse);
	// 			} catch (err) {
	// 				console.log(err);

	// 				toast.error(err.message);
	// 			}
	// 		})();
	// 	}
	// }, []);

	// New code
	useEffect(() => {
		const url = window.location.href;
		const hasCode = code;

		if (hasCode) {
			const newUrl = url.split('?code=');
			window.history.pushState({}, null, newUrl[0]);

			setLoading(true);
			// setData({ ...data, isLoading: true });
			// will check load state here

			const client_id = import.meta.env.VITE_INTUIT_CLIENT_ID;
			const client_secret = import.meta.env.VITE_INTUIT_CLIENT_SECRET;
			const redirect_uri = import.meta.env.VITE_INTUIT_REDIRECT_URI;
			const requestData = {
				client_id,
				redirect_uri,
				client_secret,
				code: code,
				url: url,
			};
			const proxy_url = import.meta.env.VITE_API_URL + '/authenticate';

			console.log({ requestData });
			fetch(proxy_url, {
				method: 'POST',
				body: JSON.stringify(requestData),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			})
				.then((response) => response.json())
				.then((data) => {
					// dispatch({
					//   type: 'LOGIN',
					//   payload: { user: data, isLoggedIn: true },
					// });

					setLoading(false);
					console.log({ data });
					if (data.success) {
						toast.success('logged in successfully');
						console.log({
							data: data.data.userInfo,
						});
						console.log({
							auth: data.data.authResponse,
						});

						localStorage.setItem('loggedIn', true);
						localStorage.setItem('intuitLoggedIn', true);
						localStorage.setItem('user', JSON.stringify(data.data.userInfo));
						localStorage.setItem('companyId', data.data.companyId);
						console.log(data.data.companyId);
						localStorage.setItem('authResponse', JSON.stringify(data.data.authResponse));
						navigate('/dashboard');
					} else {
						toast.error(data.message);
					}
				})
				.catch((error) => {
					// setData({
					//   isLoading: false,
					//   errorMessage: 'Sorry! Login failed',
					// });

					setLoading(false);
					toast.error(error.message);
				});
		}
	}, [code]);

	if (loading) {
		return (
			<div>
				<h1>Loading....</h1>
			</div>
		);
	}
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
								src='icons/google-logo.png'
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
