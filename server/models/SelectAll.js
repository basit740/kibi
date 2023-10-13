const mongoose = require('mongoose');

const SelectAllSchema = new mongoose.Schema({
    TableName: {
        type: String,
        required: true,
        unique: true
    },
    SelectAllValue: {
        type: Boolean, 
    },
})

const SelectAll = mongoose.model('SelectAll', SelectAllSchema);

module.exports = SelectAll;