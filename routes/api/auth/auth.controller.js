const User = require('../../../models/user')
const jwt = require('jsonwebtoken')
const session = require('express-session')

/*
    POST /api/auth/register
    {
        username,
        password
    }
*/


exports.authreq = (req, res) => {
    var random = Math.random();
    req.session.mes = random.toString();
    console.log(req.session.mes)
    res.send(random.toString());
}

exports.signature = (req, res) => {
    var value = req.params.value.toString();

    if (req.session.mes) {
        if (value == req.session.mes) {
            res.send('맞아요.\n');
        } else {
            res.send("틀렸음\n");
        }

    } else {
        console.log(req.session.mes);
        res.send("plz authreq first");
    }

}
exports.register = (req, res) => {
    const {
        publickey,
        username
    } = req.body
    let newUser = null

    // create a new user if does not exist
    const create = (user) => {

        console.log("asdf" + publickey + username + "\n");
        if (user) {

            throw new Error('publickey exists')
        } else {
            return User.create(publickey, username)
        }
    }



    // respond to the client
    const respond = (isAdmin) => {
        res.json({
            message: 'registered successfully',
            admin: isAdmin ? true : false
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