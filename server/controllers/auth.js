const {
  getAuthResponse,
  getUserInfo,
  getCompanyInfo,
  getAccountDetails,
  getAuthURI,
  getCompanyId,
  getLocations,
  getClasses,
} = require("../utils/intiut");
const { storeUser } = require("./users");
const { storeCompany } = require("./company");
const { storeAccounts } = require("./accounts");
const { storeLocations } = require("./locations");
const { storeClasses } = require("./class");

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
    console.log({ url: req.body.url });
    const authResponse = await getAuthResponse(req.body.url);

    const [userInfo, companyInfo, accounts, locations, classes] =
      await Promise.all([
        getUserInfo(),
        getCompanyInfo(),
        getAccountDetails(),
        getLocations(),
        getClasses(),
      ]);

    await storeUser(userInfo.userInfo);
    const companyId = await storeCompany({ ...userInfo, ...companyInfo });
    await storeAccounts({ ...userInfo, ...companyInfo, ...accounts });
    await storeLocations({ ...userInfo, ...companyInfo, locations: locations });
    await storeClasses({ ...userInfo, ...companyInfo, classes: classes });

    res.status(200).json({
      success: true,
      data: {
        ...authResponse,
        ...userInfo,
        ...companyInfo,
        ...accounts,
        ...locations,
        ...classes,
        companyId,
      },
    });
  } catch (err) {
    console.error("Error authenticating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
