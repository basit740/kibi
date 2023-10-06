const Users = require('../models/Users');
const Companies = require('../models/Companies');

exports.storeCompany = async (data) => {
    const {userInfo, companyInfo} = data;
    console.log('company info', companyInfo)
    const userId = await Users.findOne({email: userInfo.email}).select('_id email').exec();
    console.log("userId: ", userId);
    const key = `${companyInfo.CompanyInfo.Id}-${userId.email}`;
    let company = await Companies.findOne({Kibi_CompanyId: key}).exec();
    console.log('company found', company);
    if(!company) {
        company = await Companies.create({Kibi_CompanyId: key, Kibi_User: userId._id, CompanyName: companyInfo.CompanyInfo.CompanyName, LegalName: companyInfo.CompanyInfo.LegalName});
    }
    console.log('company', company);
    return key;

    
}