const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({

    publickey: String,
    username: String,
    user_account_address: String
})

// create new User document
User.statics.create = function (publickey, username, user_account_address) {
    const user = new this({
        publickey,
        username,
        user_account_address
    })


    // return the Promise
    return user.save()
}

// find one user by using username
User.statics.findOneByUsername = function (username) {
    //console.log("asdfsaf\n");
    return this.findOne({
        username
    }).exec()
}


module.exports = mongoose.model('User', User)