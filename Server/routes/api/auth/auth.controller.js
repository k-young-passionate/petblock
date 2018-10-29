const User = require('../../../models/user')
const OTP_schema = require('../../../models/OTP')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const fs = require('fs')

//const crypto2 = require('crypto2');
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
/*exports.petadd = (req, res) => {
    const {
        pet_name,
    } = req.body

}*/

exports.signature = (req, res) => {
    const {
        message
    } = req.body
    var value = req.session.mes.toString();
    var name = req.session.username;
    console.log(name);
    const verify = (user) => {
        //  const isSignatureValid = await crypto2.verify(value, publicKey, signature);
        if (user) {


            var random = Math.random() * 10000;
            var originrand = random;
            random = Math.floor(random);
            random = random.toString();
            // console.log(user + "asdf");
            res.json({
                OTP: random,
                Origin: originrand
            })
            OTP_schema.create(random, name);


        } else {

            res.json({
                message: "user not find"
            })
        }

    }
    User.findOneByUsername(name)
        .then(verify)
}

exports.filedown = (req, res) => {
    console.log(req.session.isdoctor);
    res.send("asdfsf");

}

exports.OTPauth = (req, res) => {
    const {
        given_OTP
    } = req.body

    var otp_auth_comp = function (err) {

        if (err) {
            req.session.isdoctor = 1;
            OTP_schema.deleteByOTP(given_OTP)
                .then(function () {
                    console.log("delete complete");
                })

            res.json({
                message: "now you're authenticated, good day doctor"
            })
        } else {
            res.json({
                message: "OTP is wrong. try again"
            })

        }
    }
    console.log(given_OTP)
    OTP_schema.findOneByOTP(given_OTP)
        .then(otp_auth_comp)
}
exports.register = (req, res) => {
    const {
        publickey,
        username,
        user_account_address,
        Pet_name
    } = req.body

    // create a new user if does not exist
    const create = (err) => {
        console.log(err);

        if (err) {


            throw new Error('publickey exists')
        } else {
            var dir = 'uploads/';
            dir = dir + username.toString();
            console.log(dir);
            fs.mkdirSync(dir);
            console.log(publickey);
            console.log(username);
            console.log(user_account_address);
            console.log(Pet_name);

            return User.create(publickey, username, user_account_address, Pet_name)

        }
    }



    // respond to the client
    const respond = () => {
        console.log('registered successfully');
        res.json({
            message: 'registered successfully'
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        console.log('publicket exist');
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