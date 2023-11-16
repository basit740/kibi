const OAuthClient = require("intuit-oauth");
const dotenv = require("dotenv");
const uuidv4 = require("uuid").v4;

dotenv.config({
  path: "./.env",
});

console.log(process.env.INTUIT_APP_CLIENT_ID, "waleed");

const oauthClient = new OAuthClient({
  clientId: process.env.INTUIT_APP_CLIENT_ID,
  clientSecret: process.env.INTUIT_APP_CLIENT_SECRET,
  environment: process.env.INTUIT_APP_ENVIRONMENT,
  redirectUri: process.env.INTUIT_APP_REDIRECT_URI,
});

const getAccessToken = async () => {
  const authResponse = await oauthClient.getToken().getToken();
  return authResponse.access_token;
};

const makeApiCall = async (url, method = "GET") => {
  const accessToken = await getAccessToken();
  return oauthClient.makeApiCall({
    url,
    method,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

exports.getAuthURI = async () => {
  return oauthClient.authorizeUri({
    scope: process.env.INTUIT_APP_SCOPES.split(" "),
    state: "testState",
  });
};

exports.getAuthResponse = async (url) => {
  const authResponse = await oauthClient.createToken(url);
  return { authResponse: authResponse.getJson() };
};

exports.getCompanyInfo = async () => {
  const companyID = oauthClient.getToken().realmId;
  const environmentUrl =
    oauthClient.environment === "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;
  const url = `${environmentUrl}v3/company/${companyID}/companyinfo/${companyID}`;

  const companyInfo = await makeApiCall(url);
  return { companyInfo: companyInfo.getJson() };
};

exports.getUserInfo = async () => {
  const environmentUrl =
    oauthClient.environment === "sandbox"
      ? OAuthClient.userinfo_endpoint_sandbox
      : OAuthClient.userinfo_endpoint_production;
  const userInfo = await makeApiCall(environmentUrl);

  return { userInfo: userInfo.getJson() };
};

exports.getAccountDetails = async () => {
  const companyID = oauthClient.getToken().realmId;
  const environmentUrl =
    oauthClient.environment === "sandbox"
      ? process.env.INTUIT_APP_SANDBOX_BASE_URL
      : OAuthClient.userinfo_endpoint_production;
  const url = `${environmentUrl}/v3/company/${companyID}/reports/AccountList`;

  const accounts = await makeApiCall(url);
  return { accounts: accounts.getJson() };
};

exports.getClassDetails = async () => {
  const companyID = oauthClient.getToken().realmId;
  const environmentUrl =
    oauthClient.environment === "sandbox"
      ? process.env.INTUIT_APP_SANDBOX_BASE_URL
      : OAuthClient.userinfo_endpoint_production;
  const url = `${environmentUrl}/v3/company/${companyID}/query?query=select * from Class&minorversion=69`;

  const classes = await makeApiCall(url);
  return { classes: classes.getJson() };
};

exports.getExpenseTransactionsByMonth = async (
  expenseAccountName = "Prepaid Expenses",
  year = 2023,
  month = 10
) => {
  const companyID = oauthClient.getToken().realmId;
  const environmentUrl = getEnvironmentUrl();
  const { fromDate, toDate } = getTransactionDateRange(year, month);

  const url =
    `${environmentUrl}/v3/company/${companyID}/reports/TransactionList?` +
    `accountName=${encodeURIComponent(expenseAccountName)}&` +
    `date_macro=This%20Month&start_date=${fromDate}&end_date=${toDate}`;

  try {
    const transactionsResponse = await makeApiCall(url);
    const transactions = transactionsResponse.getJson();
    console.log(transactions);
    return { transactions: transactions?.Rows?.Row?.map(parseTransactionData) };
  } catch (error) {
    console.error("Error fetching expense transactions:", error);
    throw new Error("Failed to fetch transactions");
  }
};

function getEnvironmentUrl() {
  return oauthClient.environment === "sandbox"
    ? process.env.INTUIT_APP_SANDBOX_BASE_URL
    : OAuthClient.userinfo_endpoint_production;
}

function getTransactionDateRange(year, month) {
  const fromDate = `${year}-${String(month - 1).padStart(2, "0")}-01`;
  const toDate = `${year}-${String(month).padStart(2, "0")}-01`;
  return { fromDate, toDate };
}

exports.createJournalEntry = async (lineItems) => {
  const companyID = oauthClient.getToken().realmId;
  const environmentUrl =
    oauthClient.environment === "sandbox"
      ? process.env.INTUIT_APP_SANDBOX_BASE_URL
      : OAuthClient.userinfo_endpoint_production;
  const apiUrl = `${environmentUrl}/v3/company/${companyID}/journalentry`;

  try {
    const response = await makeApiCall(apiUrl, "POST", {
      Line: lineItems,
    });
    return { success: true, journalEntry: response.getJson() };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

exports.getCompanyId = () => {
  return oauthClient.getToken().realmId;
};

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function getStartOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getUniqueId() {
  return uuidv4(); // Assuming uuidv4 is imported from a relevant library
}

function parseTransactionData(transaction) {
  const accountData = {
    tid: getUniqueId(),
    transectionType: transaction.ColData[1]?.value || null,
    num: transaction.ColData[2]?.value || null,
    name: transaction.ColData[4]?.value || null,
    description: transaction.ColData[6]?.value || "",
    amount: parseFloat(transaction.ColData[9]?.value) || 0,
  };

  return accountData;
}

exports.getAuthURI = async () => {
  const authUri = await oauthClient.authorizeUri({
    scope: process.env.INTUIT_APP_SCOPES.split(" "),
    state: "testState",
  });
  return authUri;
};
