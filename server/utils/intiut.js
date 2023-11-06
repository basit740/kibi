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

// exports.getTransections = (endDate) => {
// 	let startDate = getStartOfMonth(endDate);
// 	endDate = formatDate(endDate);
// 	startDate = formatDate(startDate);
// 	const companyID = oauthClient.getToken().realmId;

// 	oauthClient.makeApiCall(
// 		{
// 			url: 
// 			oauthClient.environment === 'sandbox'? 
// 			process.env.INTUIT_APP_SANDBOX_BASE_URL + `/v3/company/${companyID}/reports/TransactionList?start_date=${startDate}&end_date=${endDate}&source_account_type=Expense&columns=account_name tracking_num txn_type&minorversion=69`:
// 			process.env.INTUIT_APP_SANDBOX_BASE_URL + `/v3/company/${companyID}/reports/TransactionList?start_date=${startDate}&end_date=${endDate}&source_account_type=Expense&columns=account_name tracking_num txn_type&minorversion=69`
// 			,
// 			method: 'GET',
// 		}
// 	)

// }

exports.getExpenseTransactionsByMonth = async (expenseAccountName, year, month) => {
	const companyID = oauthClient.getToken().realmId;
	const authResponse = await oauthClient.getToken().getToken();
	const access_token = authResponse.access_token;
	
	const fromDate = new Date(year, month - 1, 1).toISOString(); // Start of the specified month
	const toDate = new Date(year, month, 0).toISOString(); // End of the specified month
  
	const response = await oauthClient.makeApiCall({
	  url: `${
		oauthClient.environment === 'sandbox'
		  ? process.env.INTUIT_APP_SANDBOX_BASE_URL
		  : OAuthClient.userinfo_endpoint_production
	  }/v3/company/${companyID}/reports/TransactionList?accountName=${encodeURIComponent(
		expenseAccountName
	  )}&date_macro=This%20Month&start_date=${fromDate}&end_date=${toDate}`,
	  method: 'GET',
	  headers: {
		Accept: 'application/json',
		Authorization: `Bearer ${access_token}`,
	  },
	});
  
	return { transactions: response.getJson() };
  };
  
  exports.createJournalEntry = async (lineItems) => {
	const companyID = oauthClient.getToken().realmId;
	const authResponse = await oauthClient.getToken().getToken();
	const access_token = authResponse.access_token;
  
	const apiUrl = `${
	  oauthClient.environment === 'sandbox'
		? process.env.INTUIT_APP_SANDBOX_BASE_URL
		: OAuthClient.userinfo_endpoint_production
	}/v3/company/${companyID}/journalentry`;
  
	const options = {
	  method: 'POST',
	  uri: apiUrl,
	  headers: {
		Authorization: `Bearer ${access_token}`,
		'Content-Type': 'application/json',
	  },
	  body: {
		Line: lineItems,
	  },
	  json: true,
	};
  
	try {
	  const response = await oauthClient.makeApiCall(options);
	  return { success: true, journalEntry: response.getJson() };
	} catch (error) {
	  return { success: false, error: error.message };
	}
  };
  

function formatDate(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
	const day = String(date.getDate()).padStart(2, '0');
  
	return `${year}-${month}-${day}`;
  }
  function getStartOfMonth(date) {
	return new Date(date.getFullYear(), date.getMonth(), 1);
  }
  const inputDate = new Date(); // Replace this with your desired date
  const formattedDate = formatDate(inputDate);
  
  console.log(formattedDate);
  
