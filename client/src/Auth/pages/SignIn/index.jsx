import React, { useEffect, useState } from 'react';

import AuthWrapper from '../../components/AuthWrapper';
import Control from '../../components/Control';
import Divider from '../../components/Divider';
import TextControl from '../../components/TextControl';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from 'dashboard/components/Loader'
import { toast } from 'react-toastify';

import { v4 as uuidv4 } from 'uuid';

import 'styling/Auth/SignIn.css';
// import { useOAuth2Token } from 'react-oauth2-hook';

import { getIntuitAuthUri } from 'services/intuit';
// import { toToastItem } from 'react-toastify/dist/utils';

const Index = () => {
	

	const [loading, setLoading] = useState(false);
	const [intuitLoading, setIntuitLoading] = useState(false);
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
		setIntuitLoading(true);
		const response = await getIntuitAuthUri();
		window.location.href = response.authUri;
		setIntuitLoading(false);
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
	
	// if (loading) {
	// 	return (
	// 		<div>
	// 			<h1>Loading....</h1>
	// 		</div>
	// 	);
	// }
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
						{
							intuitLoading &&
							<Loader size='sm' />
						}
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
						<button className='bg-primary sign-in__submit' type='submit'>
							Sign In
						</button>
					</div>
				</form>
			</div>
		</AuthWrapper>
	);
};

export default Index;
