const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    emailVerified: {
        type: Boolean,
        required: true,
    },
    familyName: {
        type: String,
        required: true,
    },
    givenName: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    phoneNumberVerified: {
        type: Boolean,
        required: true,
    },
    sub:{
        type: String,
        required: true,
    }
    
})

const Users = mongoose.model('Users', UsersSchema);

module.exports = Users;