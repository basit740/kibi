const { getExpenseTransactionsByMonth } = require("../utils/intiut");
const Transections = require("../models/Transections");
const { fillRemainingTransectionValues } = require("../utils/transections");
const Users = require("../models/Users");
const Companies = require("../models/Companies");
exports.getTransactions = async (req, res) => {
  try {
    console.log("i am here");
    const transectionsData = await getExpenseTransactionsByMonth();

    // Assuming transactionsData contains the data fetched from Intuit API
    res.json({ success: true, data: transectionsData.transactions });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getTransactionsFromDb = async (req, res) => {
  try {
    const companyId = req.query.companyId;
    const company_Id = await Companies.findOne({ Kibi_CompanyId: companyId })
      .select("_id")
      .exec();
    console.log(company_Id);
    const transactions = await Transections.find({
      Kibi_CompanyId: company_Id._id,
    }).exec();
    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.saveTransactions = async (req, res) => {
  try {
    const { transections, userId, companyId } = req.body;
    const objectId_user = await Users.findOne({ email: userId })
      .select("_id")
      .exec();
    const objectId_company = await Companies.findOne({
      Kibi_CompanyId: companyId,
    })
      .select("_id")
      .exec();
    const finalTransections = transections.map((transection) => {
      return fillRemainingTransectionValues(
        transection,
        objectId_user._id,
        objectId_company._id
      );
    });
    const response = await Transections.insertMany(finalTransections);
    console.log(response);
    res.json({ success: true, data: response });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
