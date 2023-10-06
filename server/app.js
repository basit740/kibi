const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors');
const uuid = require('uuid');
const session = require('express-session');
const OAuthClient = require('intuit-oauth');
const connectDB = require('./db.js')
// Instance of intuit-oauth client

const {storeUser} = require('./controllers/users')
const {storeCompany} = require('./controllers/company')
const {storeAccounts, getAccounts, changeAccountStatus} = require('./controllers/accounts');
const { request } = require('express');

dotenv.config({
	path: './.env',
});

connectDB();

const oauthClient = new OAuthClient({
	clientId: process.env.INTUIT_APP_CLIENT_ID,
	clientSecret: process.env.INTUIT_APP_CLIENT_SECRET,
	environment: process.env.INTUIT_APP_ENVIRONMENT,
	redirectUri: process.env.INTUIT_APP_REDIRECT_URI,
});
// -------------------------------- Application --------------------------------
const app = express();

app.use(express.json());
app.use(cors());
// Use the express-session middleware
// app.use(
// 	session({
// 		secret: process.env.SECRET_KEY, // Replace this with a strong secret key
// 		resave: false,
// 		saveUninitialized: false,
// 	})
// );

// -------------------------------- Staring Application -------------------------
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
	console.log(`applicaiton running at port: ${PORT}`.bgCyan)
);

// -------------------------------- Handling HTTP Requests -----------------------

app.get('/', (req, res) => {
	res.send('Welcome home server');
});

// -------------------------------- Handling Intuite Requests -----------------------

// Intuite credentials;
// const clientId = process.env.INTUIT_APP_CLIENT_ID;
// const clientSecret = process.env.INTUIT_APP_CLIENT_SECRET;
// const redirectUri = process.env.INTUIT_APP_REDIRECT_URI;
const getAccountDetails = async () => {
	const authResponse = await oauthClient.getToken().getToken();
	console.log('getting token',authResponse);
	const access_token = authResponse.access_token;
	const response = await oauthClient
	.makeApiCall({
		url:
			oauthClient.environment === 'sandbox'
				? process.env.INTUIT_APP_SANDBOX_BASE_URL + '/v3/company/4620816365323080540/reports/AccountList'
				: OAuthClient.userinfo_endpoint_production,
		method: 'GET',
		headers: {
			'Accept':'application/json',
			"Authorization": `Bearer ${access_token}`
		}
	});
	console.log(response.getJson());
	return response.getJson();
}

app.post('/api/v1/change-availablility-status', async (req, res)=>{
	const response = await changeAccountStatus(req.body.id, req.body.value);
	console.log(response);
	res.json({
		status: '200',
		data: response
	})
})
app.get('/api/v1/account-details', async (req, res) => {
	const accounts = await getAccounts(req.query.companyId);
		res.json({
			status: '200',
			data: accounts
		})
})
// initiate auth request with Intuit server
app.get('/api/v1/get-intuite-auth-uri', (req, res) => {
	// Generate a random state value using uuid
	// const state = uuid.v4();
	// Save the state value in the user's session
	// req.session.oauthState = state;
	// Instance of client
	// var oauthClient = new OAuthClient({
	// 	clientId,
	// 	clientSecret,
	// 	environment: 'sandbox', // ‘sandbox’ or ‘production’
	// 	redirectUri,
	// 	logging: true,
	// });

	// AuthorizationUri
	try {
		// app.get('/authorizeUrl', (req, res) => {
		// 	const authorizeURL = oauthClient.authorizeUri({
		// 		scope: process.env.REACT_APP_SCOPES.split(' '),
		// 		state: 'testState',
		// 	});
		// 	return res.send(authorizeURL);
		// }); can be an array of multiple scopes ex : {scope:[OAuthClient.scopes.Accounting,OAuthClient.scopes.OpenId]}
		const authUri = oauthClient.authorizeUri({
			scope: process.env.INTUIT_APP_SCOPES.split(' '),
			state: 'testState',
		});

		console.log({ authUri });
		//Redirect the user to the Intuit authorization URL
		res.status(200).json({
			success: true,
			authUri,
		});
	} catch (e) {
		res.status(400).json({
			success: false,
			error: e,
			message: e.message,
		});
	}
});

//GET ACCESS TOKEN
// app.post('/api/v1/intuit-get-access-token', async (req, res) => {
// 	// Construct the Intuit authorization URL
// 	// Instance of client
// 	var oauthClient = new OAuthClient({
// 		clientId,
// 		clientSecret,
// 		environment: 'sandbox', // ‘sandbox’ or ‘production’
// 		redirectUri,
// 		logging: true,
// 	});

// 	// Parse the redirect URL for authCode and exchange them for tokens

// 	try {
// 		var parseRedirect = req.body.url;

// 		const responseTokenObject = await oauthClient.createToken(parseRedirect);
// 		const getJson = responseTokenObject.getJson();

// 		// const user info

// 		// let useInfo;
// 		// validate id token

// 		oauthClient
// 			.validateIdToken()
// 			.then(function (response) {
// 				console.log('Is my ID token validated  : ' + response);
// 			})
// 			.catch(function (e) {
// 				console.log('The error is ' + JSON.stringify(e));
// 			});

// 		// also get user info

// 		// oauthClient
// 		// 	.getUserInfo()
// 		// 	.then(function (response) {
// 		// 		console.log('The User Info is  : ' + JSON.stringify(response.json()));
// 		// 	})
// 		// 	.catch(function (e) {
// 		// 		console.log('The error is ' + JSON.stringify(e.message));
// 		// 	});

// 		// const userInfoResponse = await oauthClient.getUserInfo();
// 		// userInfo = await userInfoResponse.json();

// 		// Is my ID token validated : true

// 		// console.log('validated id token response', validatedTokenResponse);
// 		res.status(200).json({
// 			success: true,
// 			data: { ...getJson },
// 		});
// 	} catch (err) {
// 		res.status(400).json({
// 			success: false,
// 			error: err,
// 			message: err.message,
// 		});
// 	}
// });

// // GET REFRESH TOKEN
// app.get('/api/v1/intuit-refresh-code', async (req, res) => {
// 	// Construct the Intuit authorization URL
// 	// Instance of client
// 	var oauthClient = new OAuthClient({
// 		clientId,
// 		clientSecret,
// 		environment: 'sandbox', // ‘sandbox’ or ‘production’
// 		redirectUri,
// 		logging: true,
// 	});

// 	// Parse the redirect URL for authCode and exchange them for tokens

// 	try {
// 		// var parseRedirect = req.body.url;
// 		const { refreshToken } = req.query;

// 		authResponse = await oauthClient.refreshUsingToken(refreshToken);
// 		const jsonResponse = await authResponse.getJson();

// 		res.status(200).json({
// 			success: true,
// 			data: jsonResponse,
// 		});
// 	} catch (err) {
// 		res.status(400).json({
// 			success: false,
// 			error: err,
// 			message: err.message,
// 		});
// 	}
// });

// // GET USER INFOR FROM INTUIT
// app.get('/api/v1/intuit-get-user-info', async (req, res) => {
// 	// const { accessToken } = req.query;

// 	// oauthClient
// 	// 	.getUserInfo(accessToken)
// 	// 	.then(function (response) {
// 	// 		console.log('The User Info is  : ' + JSON.stringify(response.json()));
// 	// 	})
// 	// 	.catch(function (e) {
// 	// 		console.log('The error is ' + JSON.stringify(e));
// 	// 	});

// 	try {
// 		var oauthClient = new OAuthClient({
// 			clientId,
// 			clientSecret,
// 			environment: 'sandbox', // ‘sandbox’ or ‘production’
// 			redirectUri,
// 			logging: true,
// 		});

// 		const response = await oauthClient.getUserInfo();
// 		const jsonResponse = await response.json();

// 		res.status(200).json({
// 			success: true,
// 			data: jsonResponse,
// 		});
// 	} catch (err) {
// 		res.status(400).json({
// 			success: false,
// 			error: err,
// 			message: err.message,
// 		});
// 	}
// });

// // VALIDATE ID TOKEN - do not call it now.
// app.post('/api/v1/validate-id-token', async (req, res) => {
// 	try {
// 		var oauthClient = new OAuthClient({
// 			clientId,
// 			clientSecret,
// 			environment: 'sandbox', // ‘sandbox’ or ‘production’
// 			redirectUri,
// 			logging: true,
// 		});

// 		// oauthClient.validateIdToken()
// 		//     .then(function(response){
// 		//         console.log('Is my ID token validated  : ' + response);
// 		//     })
// 		//     .catch(function(e) {
// 		//         console.log('The error is '+ JSON.stringify(e));
// 		//     });

// 		console.log('id_token', req.body.id_token);

// 		const response = await oauthClient.validateIdToken(req.body.id_token);
// 		const jsonResponse = await response.getJson();
// 		// Is my ID token validated : true

// 		res.status(200).json({
// 			success: true,
// 			data: jsonResponse,
// 		});
// 	} catch (err) {
// 		res.status(400).json({
// 			success: false,
// 			error: err,
// 			message: err.message,
// 		});
// 	}
// });

app.post('/api/v1/authenticate', (req, res) => {
	console.log({ url: req.body });
	// GetUserInfo
	const getUserInfo = (authResponse) => {
		return oauthClient
			.makeApiCall({
				url:
					oauthClient.environment === 'sandbox'
						? OAuthClient.userinfo_endpoint_sandbox
						: OAuthClient.userinfo_endpoint_production,
				method: 'GET',
			})
			.then(async(userInfo) => {
				console.log({ "userInfo": userInfo });
				await storeUser(userInfo.getJson())
				return Object.assign({ userInfo: userInfo.getJson() }, authResponse);
			});
	};

	// GetCompanyInfo
	const getCompanyInfo = (userInfo) => {
		const companyID = oauthClient.getToken().realmId;
		const url =
			oauthClient.environment === 'sandbox'
				? OAuthClient.environment.sandbox
				: OAuthClient.environment.production;

		return oauthClient
			.makeApiCall({
				url: `${url}v3/company/${companyID}/companyinfo/${companyID}`,
			})
			.then((companyInfo) => {
				return Object.assign({ companyInfo: companyInfo.getJson() }, userInfo);
			})
			.catch(function (e) {
				console.error(e);
			});
	};

	oauthClient
		.createToken(req.body.url)
		.then((authResponse) => {
			const accessToken =  authResponse.getJson().access_token;
			console.log(accessToken);
			const response = oauthClient.getToken().setToken(authResponse.getJson());
			console.log("response of setting token",response)
			return {authResponse: authResponse.getJson()}
		})
		.then(getUserInfo)
		.then(getCompanyInfo)
		.then(async (response) => {
			const companyId = await storeCompany(response);
			return {...response, companyId: companyId};
		}).then(async (response) => {
			const accounts = await getAccountDetails();
			console.log(accounts);
			response = {
				...response,
				accounts: accounts
			};
			await storeAccounts(response);
			return res.status(200).json({
				success: true,
				data: response,
			});
		})
		.catch(function (e) {
			console.log(e);
			console.error(e.intuit_tid);

			return res.status(400).json({
				success: false,
				message: e.message,
			});
		});
});

// https://appcenter.intuit.com/app/connect/oauth2?response_type=code&scope=com.intuit.quickbooks.accounting%20openid%20email%20phone%20profile&state=testState








/*

1. video url
2. keyword (happy)
3. frequency of the keyword (10)
4. duration of clip (2mins)



output: 3 clips and every clip would be of 2mins and in every clip 'happy' keywould would be apeared equal to 
frequency given by the user

clip : 2mins in that clip (happy) appears only 9 time (maximum)

*/