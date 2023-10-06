import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// User registration


// https://appcenter.intuit.com/connect/oauth2?
//     client_id=Q3ylJatCvnkYqVKLmkxxxxxxxxxxxxxxxkYB36b5mws7HkKUEv9aI&response_type=code&
//     scope=com.intuit.quickbooks.accounting&
//     redirect_uri=https://www.mydemoapp.com/oauth-redirect&
//     state=security_token%3D138r5719ru3e1%26url%3Dhttps://www.mydemoapp.com/oauth-redirect
export const intuitSignInClient = async () => {
	try {
		const response = await axios.post(
			`https://appcenter.intuit.com/connect/oauth2?client_id=ABAc1kMQ3krUiAKWA5hP3I9hnXYH0SpuZjx3ld5pcRwCO4yABP&response_type=code&scope=com.intuit.quickbooks.accounting&redirect_uri=https://438c-39-62-29-82.ngrok-free.app/login&state=yyyxxx`
		);
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};

// User login
export const loginUser = async (loginData) => {


	try {
		const response = await axios.post(`${API_URL}/auth/login`, loginData);
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};
