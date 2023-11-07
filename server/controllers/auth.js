const { getAuthResponse, getUserInfo, getCompanyInfo, getAccountDetails, getAuthURI, getCompanyId } = require('../utils/intiut');
const { storeUser } = require('./users');
const { storeCompany } = require('./company');
const { storeAccounts } = require('./accounts');

exports.getAuthUri = async (req, res) => {
	const authUri = await getAuthURI()
	console.log({ authUri });
	res.status(200).json({
		success: true,
		authUri,
	});
}
exports.authenticateUser = async (req, res) => {
	console.log({ url: req.body });
	const authResponse = await getAuthResponse(req.body.url)
	const userInfo = await getUserInfo();
	const companyInfo = await getCompanyInfo();
	const accounts = await getAccountDetails();
	//console.log({ ...authResponse, ...userInfo, ...companyInfo })
	await storeUser(userInfo.userInfo);
	const companyId = await storeCompany({...userInfo, ...companyInfo});
	await storeAccounts({ ...userInfo, ...companyInfo, ...accounts });
	res.status(200).json({
		success: true,
		data: { ...authResponse, ...userInfo, ...companyInfo, ...accounts, companyId: companyId },
	});

}
