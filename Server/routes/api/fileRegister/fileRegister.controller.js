const Files = require('../../../models/file')
const jwt = require('jsonwebtoken')
var multer = require('multer');
var formdata = require('form-data');
const bodyParser = require('body-parser');
const formidable = require('formidable')



var upload = multer({
    dest: 'temp_storage/'
})


exports.uploadfile = (req, res) => {
    var form = new formidable.IncomingForm();
    form.keepExceptions = true;
    var username = [];
    form.parse(req);

    form.on('field', function (name, value) {

        username.push(value.toString() + '/');
    }).on('fileBegin', function (name, file) {
        file.path = 'uploads/' + username[0].toString() + file.name;
        console.log()
    }).on('file', function (name, file) {
        console.log('Uploaded ' + file.name);
    }).on('end', function () {
        console.log(username[0]);
    })
    res.send('oksy');

}




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