const mongoose = require('mongoose');

const AccountsSchema = new mongoose.Schema({
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
    }
})

const Accounts = mongoose.model('Accounts', AccountsSchema);

module.exports = Accounts;