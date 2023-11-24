const mongoose = require("mongoose");

const AmortizationWaterfallSchema = new mongoose.Schema({
  monthYear: {
    type: String,
    required: true,
  },
  expenseAmount: {
    type: Number,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
});
const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});
const TransactionsSchema = new mongoose.Schema({
  Kibi_User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  Kibi_CompanyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Companies",
    required: true,
  },
  Kibi_tid: {
    type: String,
    required: true,
  },
  transectionType: {
    type: String,
  },
  num: {
    type: String,
  },
  name: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  amount: {
    type: Number,
    default: 0,
  },
  markReadyValue: {
    type: Boolean,
  },
  amortizationStartDateValue: {
    type: String,
    required: true,
  },
  amortizationEndDateValue: {
    type: String,
    required: true,
  },
  expenseAccountValue: {
    type: String,
  },
  classValue: {
    type: ClassSchema,
  },
  expensedToDate: {
    type: Number,
  },
  remainingExpense: {
    type: Number,
  },
  currentPeriodExpense: {
    type: Number,
  },
  totalMonths: {
    type: Number,
  },
  remaingMonths: {
    type: Number,
  },
  remainingMonths: {
    type: Number,
  },
  isEditable: {
    type: Boolean,
    default: true,
  },
  amortizationWaterfall: [AmortizationWaterfallSchema],
  Id: {
    type: String,
  },
});

const Transactions = mongoose.model("Transactions", TransactionsSchema);

module.exports = Transactions;
