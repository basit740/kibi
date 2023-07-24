const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
	addWebpackAlias({
		dashboard: path.resolve(__dirname, 'src/Dashboard'),
		'landing-page': path.resolve(__dirname, 'src/LandingPage'),
		auth: path.resolve(__dirname, 'src/Auth'),
		styling: path.resolve(__dirname, 'src/styling'),
		store: path.resolve(__dirname, 'src/store'),
		utils: path.resolve(__dirname, 'src/utils'),
	})
);
