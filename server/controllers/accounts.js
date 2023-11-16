const Users = require("../models/Users");
const Companies = require("../models/Companies");
const Accounts = require("../models/Accounts");
const SelectAll = require("../models/SelectAll");

exports.storeAccounts = async (data) => {
  const { userInfo, companyInfo, accounts } = data;

  console.log("Accounts:", JSON.stringify(accounts));
  console.log("Company Info:", companyInfo);

  const user = await Users.findOne({ email: userInfo.email }, "_id").exec();
  if (!user) {
    console.log("User not found:", userInfo.email);
    return;
  }

  const key = `${companyInfo.CompanyInfo.Id}-${userInfo.email}`;
  const company = await Companies.findOne(
    { Kibi_CompanyId: key },
    "_id"
  ).exec();
  if (!company) {
    console.log("Company not found:", key);
    return;
  }

  // Prepare bulk operations
  let createOps = [];
  let updateOps = [];
  const db_accounts = await Accounts.find({ Kibi_CompanyId: company._id });
  const isExistingAccount = (accountId) => {
    const result = db_accounts.find(
      (account) => account.Kibi_AccountId === accountId
    );
    return !!result;
  };

  for (const account of accounts.Rows.Row) {
    const accountKey = `${key}-${account.ColData[1].value}`;
    const accountData = {
      Kibi_User: user._id,
      Kibi_CompanyId: company._id,
      Kibi_AccountId: accountKey,
      AccountNumber: account.ColData[0].value,
      AccountName: account.ColData[1].value,
      Type: account.ColData[2].value,
      DetailType: account.ColData[3].value,
      Description: account.ColData[4].value,
      Balance: account.ColData[5].value,
    };

    const existingAccount = isExistingAccount(accountKey);
    if (existingAccount) {
      updateOps.push({
        updateOne: {
          filter: { Kibi_AccountId: accountKey },
          update: { $set: accountData },
        },
      });
    } else {
      createOps.push({
        insertOne: {
          document: { ...accountData, Kibi_AvailableForSelection: false },
        },
      });
    }
  }

  // Perform bulk operations
  if (createOps.length > 0) await Accounts.bulkWrite(createOps);
  if (updateOps.length > 0) await Accounts.bulkWrite(updateOps);
};

exports.getAccounts = async (req, res) => {
  const companyId = req.query.companyId;

  // Validate input
  if (!companyId) {
    return res.status(400).json({ message: "Company ID is required" });
  }

  try {
    // Retrieve company ID
    const company = await Companies.findOne(
      { Kibi_CompanyId: companyId },
      "_id"
    ).exec();

    // Handle case where company is not found
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Fetch accounts related to the company
    const accounts = await Accounts.find({ Kibi_CompanyId: company._id })
      .select("AccountNumber AccountName Kibi_AvailableForSelection DetailType")
      .exec();

    // Return the accounts in response
    res.json({
      status: "200",
      data: accounts,
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error fetching accounts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAvailableAccounts = async (req, res) => {
  const companyId = req.query.companyId;

  // Validate input
  if (!companyId) {
    return res.status(400).json({ message: "Company ID is required" });
  }

  try {
    // Retrieve company ID
    const company = await Companies.findOne(
      { Kibi_CompanyId: companyId },
      "_id"
    ).exec();

    // Handle case where company is not found
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Fetch available accounts related to the company
    const accounts = await Accounts.find({
      Kibi_CompanyId: company._id,
      Kibi_AvailableForSelection: true,
    })
      .select(
        "AccountNumber AccountName Kibi_AvailableForSelection DetailType Description Balance"
      )
      .exec();

    // Return the accounts in response
    res.json({
      status: "200",
      data: accounts,
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error fetching available accounts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.changeAccountStatus = async (req, res) => {
  const { id, value } = req.body;

  // Validate input
  if (!id || value === undefined) {
    return res.status(400).json({ message: "ID and value are required" });
  }

  try {
    // Update account status
    const updatedAccount = await Accounts.findOneAndUpdate(
      { _id: id },
      { Kibi_AvailableForSelection: value },
      { new: true }
    ).exec();

    if (!updatedAccount) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Determine the state of all accounts
    const [allAvailable, allBusy] = await Promise.all([
      Accounts.countDocuments({ Kibi_AvailableForSelection: true }),
      Accounts.countDocuments({ Kibi_AvailableForSelection: false }),
    ]);

    // Update or create SelectAll record based on the account states
    const selectAllValue = allAvailable > 0 && allBusy === 0;
    await SelectAll.findOneAndUpdate(
      { TableName: "Accounts" },
      { SelectAllValue: selectAllValue },
      { upsert: true }
    );

    res.json({
      status: "200",
      data: updatedAccount,
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error changing account status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.changeAllAccountsStatus = async (req, res) => {
  const { value } = req.body;

  // Validate input
  if (value === undefined) {
    return res.status(400).json({ message: "Value is required" });
  }

  try {
    // Update all accounts with the provided value
    const updateResult = await Accounts.updateMany(
      {},
      { Kibi_AvailableForSelection: value }
    );

    // Update the SelectAll table with the same value
    await SelectAll.findOneAndUpdate(
      { TableName: "Accounts" },
      { SelectAllValue: value },
      { upsert: true }
    );

    res.json({
      status: "200",
      data: updateResult,
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error updating all accounts status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getSelectAllAccountsValue = async (req, res) => {
  try {
    // Retrieve the SelectAll value for accounts
    const selectAllRecord = await SelectAll.findOne({
      TableName: "Accounts",
    }).exec();

    // Check if the record exists
    if (!selectAllRecord) {
      return res
        .status(404)
        .json({ message: "SelectAll record for Accounts not found" });
    }

    res.json({
      status: "200",
      data: selectAllRecord,
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error fetching SelectAll accounts value:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getQuickbooksBalance = async (req, res) => {
  const companyId = req.query.companyId;

  // Validate input
  if (!companyId) {
    return res.status(400).json({ message: "Company ID is required" });
  }

  try {
    // Find the company
    const company = await Companies.findOne(
      { Kibi_CompanyId: companyId },
      "_id"
    ).exec();

    // Handle company not found scenario
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Find the account with 'Prepaid Expenses'
    const account = await Accounts.findOne(
      {
        Kibi_CompanyId: company._id,
        AccountName: "Prepaid Expenses",
      },
      "Balance"
    ).exec();

    // Handle account not found scenario
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json({
      status: "200",
      data: account.Balance,
    });
  } catch (err) {
    // Correct error message property name
    res.status(500).json({
      status: "500",
      message: err.message,
    });
  }
};
