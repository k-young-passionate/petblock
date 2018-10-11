const router = require('express').Router()
const controller = require('./fileRegister.controller')



router.post('/fileUpload', controller.register)


module.exports = router