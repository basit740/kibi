const { getExpenseTransactionsByMonth } = require("../utils/intiut");
const Transactions = require("../models/Transections");
const { fillRemainingTransactionValues } = require("../utils/transections");
const Users = require("../models/Users");
const Companies = require("../models/Companies");

exports.getTransactions = async (req, res) => {
  try {
    const { year, month } = req.query;
    const transactionsData = await getExpenseTransactionsByMonth(
      "Prepaid Expenses",
      year,
      month
    );
    res.json({ success: true, data: transactionsData.transactions });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

exports.getTransactionsFromDb = async (req, res) => {
  try {
    const companyId = req.query.companyId;
    if (!companyId) {
      return res
        .status(400)
        .json({ success: false, message: "Company ID is required" });
    }

    const company = await Companies.findOne(
      { Kibi_CompanyId: companyId },
      "_id"
    ).exec();
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    const transactions = await Transactions.find({
      Kibi_CompanyId: company._id,
    }).exec();
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.saveTransactions = async (req, res) => {
  try {
    const { transactions, userId, companyId } = req.body;
    if (!userId || !companyId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Company ID are required",
      });
    }

    const [user, company] = await Promise.all([
      Users.findOne({ email: userId }, "_id").exec(),
      Companies.findOne({ Kibi_CompanyId: companyId }, "_id").exec(),
    ]);

    if (!user || !company) {
      return res
        .status(404)
        .json({ success: false, message: "User or Company not found" });
    }

    const filledTransactions = transactions.map((transaction) =>
      fillRemainingTransactionValues(transaction, user._id, company._id)
    );

    const response = await Transactions.insertMany(filledTransactions);
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { transactionId, updatedData } = req.body;

    // Input validation
    if (!transactionId) {
      return res
        .status(400)
        .json({ success: false, message: "Transaction ID is required" });
    }
    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Updated data is required" });
    }
    const finalTransaction = fillRemainingTransactionValues(
      updatedData,
      updatedData.Kibi_User,
      updatedData.Kibi_CompanyId
    );

    // Attempt to update the transaction
    const updatedTransaction = await Transactions.findOneAndUpdate(
      transactionId,
      { $set: finalTransaction },
      { new: true, runValidators: true } // Ensures updated document is returned and schema validations are applied
    );

    if (!updatedTransaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }

    res.json({ success: true, data: updatedTransaction });
  } catch (error) {
    // Improved error handling for potential database or server issues
    console.error("Error updating transaction:", error);
    res.status(500).json({
      success: false,
      message: "Error updating transaction",
      error: error.message,
    });
  }
};
