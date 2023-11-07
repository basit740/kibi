const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors');
const uuid = require('uuid');
const session = require('express-session');
const connectDB = require('./db.js')
// Instance of intuit-oauth client

const {storeUser} = require('./controllers/users')
const {storeCompany} = require('./controllers/company')
const { request, response } = require('express');


//  Route files
const accounts = require('./routes/Accounts.js');
const auth = require('./routes/Auth.js');
const classes = require('./routes/Class.js');
const transections = require('./routes/Transections.js');

dotenv.config({
	path: './.env',
});

connectDB();

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


// Mount routers
app.use('/api/v1',accounts)
app.use('/api/v1/auth', auth)
app.use('/api/v1/class', classes)
app.use('/api/v1/transections', transections)

// -------------------------------- Handling HTTP Requests -----------------------

app.get('/', (req, res) => {
	res.send('Welcome home server');
});






// -------------------------------- Handling Intuite Requests -----------------------

// Intuite credentials;
// const clientId = process.env.INTUIT_APP_CLIENT_ID;
// const clientSecret = process.env.INTUIT_APP_CLIENT_SECRET;
// const redirectUri = process.env.INTUIT_APP_REDIRECT_URI;


// initiate auth request with Intuit server


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