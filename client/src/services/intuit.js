import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const INTUIT_SERVER_URL = import.meta.env.VITE_INTUIT_SERVER_URL;

// curl -X POST 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer' \
// -H 'Accept: application/json' \
// -H 'Content-Type: application/x-www-form-urlencoded' \
// -H 'Authorization: REPLACE_WITH_AUTHORIZATION_HEADER (details below)' \
// -d 'grant_type=authorization_code' \
// -d 'code=REPLACE_WITH_AUTHORIZATION_CODE' \
// -d 'redirect_uri=REPLACE_WITH_REDIRECT_URI'

export const getIntuitAccessToken = async (payload) => {
	const clientId = import.meta.env.VITE_INTUIT_CLIENT_ID;
	const clientSecret = import.meta.env.VITE_INTUIT_CLIENT_SECRET;
	const redirectUri = import.meta.env.VITE_INTUIT_REDIRECT_URI;
	const headers = {
		Accept: 'application/json', // Example header, you can add more if needed
		'Content-Type': 'application/x-www-form-urlencoded',
		Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
	};

	const data = {
		grant_type: 'authorization_code',
		code: payload.code,
		redirect_uri: redirectUri,
	};

	try {
		const response = await axios.post(
			`https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer`,
			data,
			{ headers }
		);
		console.log('intuit Response', response);
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};

export const getIntuitAuthUri = async () => {
	try {
		const response = await axios.get(`${API_URL}/get-intuite-auth-uri`);
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};
export const intuitGetAccessToken = async (payload) => {
	try {
		const response = await axios.post(
			`${API_URL}/intuit-get-access-token`,
			{ url: payload },
			{
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			}
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			throw error.response.data;
		} else {
			throw error.message; // Handle network errors
		}
	}
};

export const getUserInfoIntuit = async () => {
	try {
		const response = await axios.get(`${API_URL}/intuit-get-user-info`);
		return response.data;
	} catch (error) {
		console.log('error', error);
		throw error.response.data;
	}
};
export const validateIdToken = async (payload) => {
	// try {
	// 	const response = await axios.get(API_URL + '/validate-id-token');
	// 	return response.data;
	// } catch (error) {
	// 	console.log('error', error);
	// 	if (error.response) {
	// 		throw error.response.data;
	// 	} else {
	// 		throw error.message; // Handle network errors
	// 	}
	// }

	try {
		const response = await axios.post(
			`${API_URL}/validate-id-token`,
			{ id_token: payload },
			{
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			}
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			throw error.response.data;
		} else {
			throw error.message; // Handle network errors
		}
	}
};

export const changeAvailablilityStatus = async (body) => {
	try {
		const response = await axios.post(`${API_URL}/change-availablility-status`,body);
		return response.data;
	} catch (error) {
		console.log('error', error);
		throw error.response.data;
	}
};

export const getUserInfo = async (accessToken) => {
	// try {
	// 	const response = await fetch(
	// 		`${INTUIT_SERVER_URL}/openid_connect/userinfo`,
	// 		{
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				Accept: 'application/json',
	// 				Authorization: 'Bearer ' + localStorage.getItem('intuitAccessToken'),
	// 			},
	// 		}
	// 	);

	// 	const jsonResponse = await response.json();
	// 	console.log('jsonResponse', jsonResponse);

	// 	return jsonResponse; // No need for .data here
	// } catch (error) {
	// 	if (error.response) {
	// 		throw error.response.data;
	// 	} else {
	// 		console.log('detail error', error);
	// 		throw error.message; // Handle network errors
	// 	}
	// }

	try {
		const response = await axios.get(
			`${INTUIT_SERVER_URL}/openid_connect/userinfo`,
			{
				headers: {
					Authorization: 'Bearer ' + accessToken,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error('Error:', error);
		if (error.response) {
			console.error('Response error:', error.response.data);
			throw error.response.data;
		} else {
			console.error('Network error:', error.message);
			throw error.message; // Handle network errors
		}
	}
};
///intuit-get-user-info

//validate-id-token

//intuit-get-access-token

/*

GET https://accounts.platform.intuit.com/v1/openid_connect/userinfo
Accept: application/json
Authorization: Bearer <access token>

{
   "sub": "1182d6ec-2a1f-4aa3-af3f-bb3b95db45af",
   "email": "john@doe.com",
   "emailVerified": true,
   "givenName": "John",
   "familyName": "Doe",
   "phoneNumber": "+1 6305555555",
   "phoneNumberVerified": false,
   "address": {
      "streetAddress": "2007 saint julien ct",
      "locality": "mountain view",
      "region": "CA",
      "postalCode": "94043",
      "country": "US"
   }
}

*/
