const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Files = new Schema({

    file_hash: String,
    file_name: String
})

// create new User document
Files.statics.create = function (file_hash, file_name) {
    const file = new this({
        file_hash,
        file_name
    })


    // return the Promise
    return file.save()
}

// find one user by using username
Files.statics.findOneByFileName = function (file_name) {
    console.log("asdfsaf\n");
    return this.findOne({
        file_name
    }).exec()
}




module.exports = mongoose.model('Files', Files)