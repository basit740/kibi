const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors');
const uuid = require('uuid');
const session = require('express-session');
const OAuthClient = require('intuit-oauth');

dotenv.config({
	path: './.env',
});

// -------------------------------- Application --------------------------------
const app = express();
app.use(cors());
app.use(express.json());

// Use the express-session middleware
app.use(
	session({
		secret: process.env.SECRET_KEY, // Replace this with a strong secret key
		resave: false,
		saveUninitialized: false,
	})
);

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

app.get('/api/v1/initiate-intuite-auth', (req, res) => {
	// Generate a random state value using uuid
	const state = uuid.v4();

	// Save the state value in the user's session
	req.session.oauthState = state;

	// Construct the Intuit authorization URL
	const clientId = process.env.INTUIT_APP_CLIENT_ID; // Replace with your actual client ID
	const clientSecret = process.env.INTUIT_APP_CLIENT_SECRET; // Replace with your actual client ID
	const redirectUri = process.env.INTUIT_APP_REDIRECT_URI; // Replace with your actual redirect URI
	// Instance of client
	var oauthClient = new OAuthClient({
		clientId,
		clientSecret,
		environment: 'sandbox', // ‘sandbox’ or ‘production’
		redirectUri,
		logging: true,
	});

	// AuthorizationUri
	var authUri = oauthClient.authorizeUri({
		scope: [OAuthClient.scopes.Accounting],
		state: state,
	}); // can be an array of multiple scopes ex : {scope:[OAuthClient.scopes.Accounting,OAuthClient.scopes.OpenId]}

	console.log(authUri);
	// Redirect the user to the Intuit authorization URL
	// res.status(200).json({
	// 	success: true,
	// 	authUri,
	// });

	res.redirect(authUri);

	// res.redirect(authUri);
});
