const OAuthClient = require('intuit-oauth');
const dotenv = require('dotenv');

dotenv.config({
	path: './.env',
});

console.log(process.env.INTUIT_APP_CLIENT_ID, 'waleed')

const oauthClient = new OAuthClient({
	clientId: process.env.INTUIT_APP_CLIENT_ID,
	clientSecret: process.env.INTUIT_APP_CLIENT_SECRET,
	environment: process.env.INTUIT_APP_ENVIRONMENT,
	redirectUri: process.env.INTUIT_APP_REDIRECT_URI,
});

exports.getAccountDetails = async () => {
	const companyID = oauthClient.getToken().realmId;
	const authResponse = await oauthClient.getToken().getToken();
	const access_token = authResponse.access_token;
	const response = await oauthClient
		.makeApiCall({
			url:
				oauthClient.environment === 'sandbox'
					? process.env.INTUIT_APP_SANDBOX_BASE_URL + `/v3/company/${companyID}/reports/AccountList`
					: OAuthClient.userinfo_endpoint_production,
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				"Authorization": `Bearer ${access_token}`
			}
		});
	return { accounts: response.getJson() };
}

exports.getClassDetails = async () => {
	const authResponse = await oauthClient.getToken().getToken();
	const access_token = authResponse.access_token;
	const companyID = oauthClient.getToken().realmId;
	const response = await oauthClient
		.makeApiCall({
			url:
				oauthClient.environment === 'sandbox'
					? process.env.INTUIT_APP_SANDBOX_BASE_URL + `/v3/company/${companyID}/query?query=select  * from Class&minorversion=69v3/company/${companyID}/reports/AccountList`
					: OAuthClient.userinfo_endpoint_production,
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				"Authorization": `Bearer ${access_token}`
			}
		});
	return { classes: response.getJson() };
}

exports.getAuthResponse = async (url) => {
	const authResponse = await oauthClient.createToken(url)

	const accessToken = authResponse.getJson().access_token;
	const response = await oauthClient.getToken().setToken(authResponse.getJson());
	return { authResponse: authResponse.getJson() }
}

exports.getCompanyInfo = async () => {
	const companyID = oauthClient.getToken().realmId;
	const url = oauthClient.environment === 'sandbox'
		? OAuthClient.environment.sandbox
		: OAuthClient.environment.production;

	const companyInfo = await oauthClient
		.makeApiCall({
			url: `${url}v3/company/${companyID}/companyinfo/${companyID}`,
		})
	return { companyInfo: companyInfo.getJson() };
};
exports.getUserInfo = () => {
	return oauthClient
		.makeApiCall({
			url:
				oauthClient.environment === 'sandbox'
					? OAuthClient.userinfo_endpoint_sandbox
					: OAuthClient.userinfo_endpoint_production,
			method: 'GET',
		})
		.then(async (userInfo) => {
			return { userInfo: userInfo.getJson() };
		});
};

exports.getAuthURI = async () => {
	const authUri = await oauthClient.authorizeUri({
		scope: process.env.INTUIT_APP_SCOPES.split(' '),
		state: 'testState',
	});
	return authUri
}

exports.getCompanyId = () => {
	const companyID = oauthClient.getToken().realmId;
	return companyID;
}
