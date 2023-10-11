const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
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
    Kibi_AvailableForSelection: {
        type: Boolean, 
        required: true,
    },
    Id: {
        type : String,
        required: true,
        unique: true,
    },
    Active: {
        type: Boolean,
    },
    FullyQualifiedName: {
        type: String,
    },
    SubClass: {
        type: Boolean,
    },
    Name: {
        type: String,
        required: true,
    }
})

const Class = mongoose.model('Class', ClassSchema);

module.exports = Class;