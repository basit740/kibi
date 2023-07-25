import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// User registration
export const intuitSignIn = async () => {
	try {
		const response = await axios.get(`${API_URL}/initiate-intuite-auth`);
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
