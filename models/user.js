const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({

    publickey: String,
    username: String

})

// create new User document
User.statics.create = function (publickey, username) {
    const user = new this({
        publickey,
        username
    })

    // return the Promise
    return user.save()
}

// find one user by using username
User.statics.findOneByUsername = function (username) {
    console.log("asdfsaf\n");
    return this.findOne({
        username
    }).exec()
}


// verify the password of the User documment
User.methods.verify = function (password) {
    return this.password === password
}

User.methods.assignAdmin = function () {
    this.admin = trues
    return this.save()
}

module.exports = mongoose.model('User', User)