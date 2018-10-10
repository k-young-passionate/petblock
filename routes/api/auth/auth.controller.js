const User = require('../../../models/user')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const crypto2 = require('crypto2');
/*
    POST /api/auth/register
    {
        username,
        password
    }
*/


exports.authreq = (req, res) => {
    const {
        username
    } = req.body
    var random = Math.random();
    req.session.mes = random.toString();
    req.session.username = username;
    console.log(req.session.mes)
    res.send(random.toString());
}

exports.signature = (req, res) => {
    var value = req.session.mes.toString();
    var name = req.session.username;
    console.log(name + "\n");
    const verify = (user) => {
        const isSignatureValid = await crypto2.verify(value, publicKey, signature);
        if(isSignatureValid){
            var random = Math.random()*1000;
            random=random/1000;
            random=random.toString();
            res.json({
                OTP: random
            })
        }
    }
    User.findOneByUsername(name)
        .then(verify)



}
exports.register = (req, res) => {
    const {
        publickey,
        username,
        user_account_address
    } = req.body

    // create a new user if does not exist
    const create = (err) => {
        console.log(err);

        if (err) {

            throw new Error('publickey exists')
        } else {
            return User.create(publickey, username, user_account_address)

        }
    }



    // respond to the client
    const respond = () => {
        res.json({
            message: 'registered successfully'
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    User.findOneByUsername(username)
        .then(create)
        .then(respond)
        .catch(onError)
}