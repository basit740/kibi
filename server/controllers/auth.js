const {
  getAuthResponse,
  getUserInfo,
  getCompanyInfo,
  getAccountDetails,
  getAuthURI,
  getCompanyId,
} = require("../utils/intiut");
const { storeUser } = require("./users");
const { storeCompany } = require("./company");
const { storeAccounts } = require("./accounts");

exports.getAuthUri = async (req, res) => {
  try {
    const authUri = await getAuthURI();
    console.log({ authUri });

    res.status(200).json({
      success: true,
      authUri,
    });
  } catch (err) {
    console.error("Error getting authentication URI:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.authenticateUser = async (req, res) => {
  try {
    console.log({ url: req.body });
    const authResponse = await getAuthResponse(req.body.url);

    const [userInfo, companyInfo, accounts] = await Promise.all([
      getUserInfo(),
      getCompanyInfo(),
      getAccountDetails(),
    ]);

    await storeUser(userInfo.userInfo);
    const companyId = await storeCompany({ ...userInfo, ...companyInfo });
    await storeAccounts({ ...userInfo, ...companyInfo, ...accounts });

    res.status(200).json({
      success: true,
      data: {
        ...authResponse,
        ...userInfo,
        ...companyInfo,
        ...accounts,
        companyId,
      },
    });
  } catch (err) {
    console.error("Error authenticating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
