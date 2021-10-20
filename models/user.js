const mongoose = require('mongoose');

// Uuers Schema
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

// Function for new creating new user
module.exports.createNewUser = function(newUser, callback){    
    newUser.save(callback)
}


// Function for verify username their names
module.exports.getUserByUsername = function(uname, callback){
    const query = {username: uname}
    User.findOne(query, callback);
}