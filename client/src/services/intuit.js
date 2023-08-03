import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// curl -X POST 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer' \
// -H 'Accept: application/json' \
// -H 'Content-Type: application/x-www-form-urlencoded' \
// -H 'Authorization: REPLACE_WITH_AUTHORIZATION_HEADER (details below)' \
// -d 'grant_type=authorization_code' \
// -d 'code=REPLACE_WITH_AUTHORIZATION_CODE' \
// -d 'redirect_uri=REPLACE_WITH_REDIRECT_URI'

export const getIntuitAccessToken = async (payload) => {
	const clientId = process.env.REACT_APP_INTUIT_CLIENT_ID;
	const clientSecret = process.env.REACT_APP_INTUIT_CLIENT_SECRET;
	const redirectUri = process.env.REACT_APP_INTUIT_REDIRECT_URI;
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

export const intuitSignIn = async () => {
	try {
		const response = await axios.get(`${API_URL}/initiate-intuite-auth`);
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};
