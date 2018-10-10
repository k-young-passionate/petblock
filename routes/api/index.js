const router = require('express').Router()
const auth = require('./auth')


router.use('/auth', auth)

router.get('/isit', function (req, res) {
    res.send("good!")
})

module.exports = router