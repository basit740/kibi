const Users = require('../models/Users');

exports.storeUser = async (user) => {
    let response = await Users.findOne({email: user.email}).exec();
    if(!response){
       response = await Users.create(user);
    }
}