const router = require('express').Router()
const controller = require('./fileRegister.controller')
var multer = require('multer');
var formdata = require('form-data');
const bodyParser = require('body-parser');
const formidable = require('formidable')



var upload = multer({
    dest: 'temp_storage/'
})

router.post('/uploadfile', controller.uploadfile)



module.exports = router