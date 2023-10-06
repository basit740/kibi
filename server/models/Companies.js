const mongoose = require('mongoose');

const CompaniesSchema = new mongoose.Schema({
    CompanyName: {
        type: String,
        required: true,
    },
    LegalName: {
        type: String,
        required: true,
    },
    Kibi_User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    Kibi_CompanyId: {
        type: String, 
        required: true,
        unique: true,
    },
    // CompanyName: {
    //     type: Boolean,
    //     required: true,
    // },
    // CompanyStartDate: {
    //     type: String,
    //     required: true,
    // }
    
})

const Companies = mongoose.model('Companies', CompaniesSchema);

module.exports = Companies;