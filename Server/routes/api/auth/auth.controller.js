const User = require('../../../models/user')
const OTP_schema = require('../../../models/OTP')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const fs = require('fs')
const NodeRSA = require('node-rsa');

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
    const checkusername = (user) =>{
        if(user){

            var random = Math.random();

            //session에 데이터를 저장(random number, publickey, username)
            req.session.mes = random.toString();
            req.session.publickey = user["publickey"];
            req.session.username = username;

            console.log(req.session.mes)
            console.log(req.session.publickey)

            res.json({
                nonce : random.toString(),
                publickey : user["publickey"]
            })
        }
        else{
            res.json({
                message: "user not find"
            })
        }
    }

    //authreq 단계에서 유저의 이름을 받아 이름이 있는지 확인
    User.findOneByUsername(name)
        .then(checkusername)
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
    const pubkey=req.session.publickey;
    
    const key = new NodeRSA();
    const sig = new Buffer(message, 'base64');

    console.log(name);
    console.log("message is " + message);
    console.log("sig is " + sig);

    key.importKey(pubkey);
    const isSignatureValid = key.verify(value, sig);
    if (isSignatureValid) {
        console.log("valid signature!");
    }

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


            throw new Error('username exists, try again!')
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