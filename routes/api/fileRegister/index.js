const router = require('express').Router()
const controller = require('./fileRegister.controller')
var multer = require('multer');
var upload = multer({
    dest: 'uploads/'
})




router.post('/fileUpload', controller.register)
router.post('/up', upload.single('userfile'), function (req, res) {
    let file = req.file;

    let result = {
        originalName: file.originalname,
        size: file.size,
    }

    res.json(result);
})
router.get('/uploadform', function (req, res) {

    res.render('upload');

})


module.exports = router