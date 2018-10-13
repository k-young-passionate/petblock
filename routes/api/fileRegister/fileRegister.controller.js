const Files = require('../../../models/file')
const jwt = require('jsonwebtoken')






exports.register = (req, res) => {
    const {
        file_hash,
        file_name
    } = req.body
    console.log("acccsdcs")
    const create = (err) => {
        console.log(err)
        console.log(file_hash + file_name)
        if (err) {
            throw new Error('file exist')
        } else {
            return Files.create(file_hash, file_name)
        }
    }


    // respond to the client
    const respond = () => {
        res.json({
            message: 'file uploaded!!'
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication

    Files.findOneByFileName(file_name)
        .then(create)
        .then(respond)
        .catch(onError)
}