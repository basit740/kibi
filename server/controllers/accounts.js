const Users = require('../models/Users');
const Companies = require('../models/Companies');
const Accounts = require('../models/Accounts');
const SelectAll = require('../models/SelectAll');

exports.storeAccounts = async (data) => {
    const { userInfo, companyInfo, accounts } = data;
    //console.log('accounts: ', accounts);
    console.log('company info', companyInfo)
    const userId = await Users.findOne({ email: userInfo.email }).select('_id email').exec();
    console.log("userId: ", userId);
    const key = `${companyInfo.CompanyInfo.Id}-${userId.email}`;
    let company = await Companies.findOne({ Kibi_CompanyId: key }).select('_id').exec();
    console.log('company found', company);

    accounts.Rows.Row.map(async (account) => {
        const accountKey = `${key}-${account.ColData[1].value}`
        //console.log(accountKey)
        let account01 = await Accounts.findOne({ Kibi_AccountId: accountKey }).exec();
        //console.log('account found', account01);
        if (!account01) {
            account01 = await Accounts.create(
                {
                    Kibi_User: userId._id,
                    Kibi_CompanyId: company._id,
                    Kibi_AccountId: accountKey,
                    Kibi_AvailableForSelection: false,
                    AccountNumber: account.ColData[0].value,
                    AccountName: account.ColData[1].value,
                    Type: account.ColData[2].value,
                    DetailType: account.ColData[3].value,
                    Description: account.ColData[4].value,
                    Balance: account.ColData[5].value
                });
        }
        //console.log('account', account01);

    });
}
exports.getAccounts = async (req, res) => {
    const companyId = req.query.companyId
    const company_Id = await Companies.findOne({ Kibi_CompanyId: companyId }).select('_id').exec();
    console.log(company_Id)
    const accounts = await Accounts.find({ Kibi_CompanyId: company_Id._id }).select('AccountNumber AccountName Kibi_AvailableForSelection DetailType').exec();
    console.log(accounts);
    res.json({
        status: '200',
        data: accounts
    })
}
exports.getAvailableAccounts = async (req, res) => {
    const companyId = req.query.companyId;
    const company_Id = await Companies.findOne({ Kibi_CompanyId: companyId }).select('_id').exec();
    const accounts = await Accounts.find({ Kibi_CompanyId: company_Id._id, Kibi_AvailableForSelection: true }).select('AccountNumber AccountName Kibi_AvailableForSelection DetailType Description Balance').exec();
    console.log(accounts);
    res.json({
        status: '200',
        data: accounts
    })
}

exports.changeAccountStatus = async (req, res) => {
    const id = req.body.id;
    const value = req.body.value;
    const filter = { _id: id };
    const update = { Kibi_AvailableForSelection: value }
    const response = await Accounts.findOneAndUpdate(filter, update);
    const allAvailable = await Accounts.find({ Kibi_AvailableForSelection: true }).exec();
    const allBusy = await Accounts.find({ Kibi_AvailableForSelection: false }).exec();

    console.log(allAvailable.length, allBusy);
    const account = await SelectAll.findOne({ TableName: 'Accounts' }).exec();
    if (!account) {
        await SelectAll.create({ TableName: 'Accounts' });
    }

    if (allAvailable.length > 0 && allBusy.length > 0)
        await SelectAll.findOneAndUpdate({ TableName: 'Accounts' }, { SelectAllValue: false });
    else if (allAvailable.length > 0)
        await SelectAll.findOneAndUpdate({ TableName: 'Accounts' }, { SelectAllValue: true });
    else if (allBusy.length > 0)
        await SelectAll.findOneAndUpdate({ TableName: 'Accounts' }, { SelectAllValue: true });

    res.json({
        status: '200',
        data: response
    })
}

exports.changeAllAccountsStatus = async (req, res) => {
    const value = req.body.value;
    const update = { Kibi_AvailableForSelection: value }
    const response = await Accounts.updateMany({}, update);
    await SelectAll.findOneAndUpdate({ TableName: 'Accounts' }, { SelectAllValue: value })
    console.log(value)
    res.json({
        status: '200',
        data: response
    })
}

exports.getSelectAllAccountsValue = async (req, res) => {
    const response = await SelectAll.findOne({ TableName: 'Accounts' }).exec();
    res.json({
        status: '200',
        data: response,
    })
}

