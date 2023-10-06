const Users = require('../models/Users');
const Companies = require('../models/Companies');
const Accounts = require('../models/Accounts');


exports.storeAccounts = async (data) => {
    const {userInfo, companyInfo, accounts} = data;
    console.log('accounts: ', accounts);
    console.log('company info', companyInfo)
    const userId = await Users.findOne({email: userInfo.email}).select('_id email').exec();
    console.log("userId: ", userId);
    const key = `${companyInfo.CompanyInfo.Id}-${userId.email}`;
    let company = await Companies.findOne({Kibi_CompanyId: key}).select('_id').exec();
    console.log('company found', company);

    accounts.Rows.Row.map( async (account)=>{
        const accountKey = `${key}-${account.ColData[1].value}`
        console.log(accountKey)
        let account01 = await Accounts.findOne({Kibi_AccountId: accountKey}).exec();
        console.log('account found', account01);
        if(!account01) {
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
        console.log('account', account01);

    });    
}
exports.getAccounts = async(companyId)=> {
    const company_Id = await Companies.findOne({Kibi_CompanyId: companyId}).select('_id').exec();
    const accounts = await Accounts.find({Kibi_CompanyId: company_Id._id}).select('AccountNumber AccountName Kibi_AvailableForSelection').exec();
    console.log(accounts);
    return accounts;
}

exports.changeAccountStatus = async(id, value)=> {
    const filter = { _id: id};
    const update = {Kibi_AvailableForSelection: value}
    const response = await Accounts.findOneAndUpdate(filter, update);
    return response;
}