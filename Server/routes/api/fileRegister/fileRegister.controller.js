const Files = require('../../../models/file')
const jwt = require('jsonwebtoken')
var multer = require('multer');
var formdata = require('form-data');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const session = require('express-session');



var upload = multer({
    dest: 'temp_storage/'
})


exports.uploadfile = (req, res) => {
    //session auth 인증후 해야함
    console.log(req.session.username_to_treat);
    console.log(req.session.isdoctor);
    var form = new formidable.IncomingForm();
    form.keepExceptions = true;
    var username = [];
    form.parse(req);


    form.on('field', function (name, value) {

        username.push(req.session.username_to_treat.toString() + '/');
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

exports.downloadfile = (req, res) => {
    console.log(req.session.isdoctor);
    req.session.isdoctor++;
    if (req.session.isdoctor >= 1) {
        const {
            username,
            filename
        } = req.body
        var path = "uploads/" + username.toString() + "/" + filename.toString();
        res.send(path);
    } else {
        res.json({
            message: "plz auth OTP first"
        })
    }
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