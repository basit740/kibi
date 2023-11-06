const mongoose = require('mongoose');

const TransactionsSchema = new mongoose.Schema({
    Kibi_User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    Kibi_CompanyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Companies', 
        required: true,
    },
    Kibi_AccountId: {
        type: String, 
        required: true,
        unique: true,
    },
    Kibi_AvailableForSelection: {
        type: Boolean, 
        required: true,
    },
    AccountNumber: {
        type: Number, 
    },
    AccountName: {
        type: String, 
        required: true,
    },
    Type: {
        type: String, 
    },
    DetailType: {
        type: String
    },
    Description: {
        type: String
    },
    Balance: {
        type: Number,
    },
    AmortizationStartDate: {
        type: Date,  // Added field for amortization start date
    },
    AmortizationEndDate: {
        type: Date,  // Added field for amortization end date
    },
});

const Transactions = mongoose.model('Transactions', TransactionsSchema);

module.exports = Transactions;
