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
        username,
        user_account_address
    } = req.body
    let newUser = null

    // create a new user if does not exist
    const create = (user) => {
        console.log(user);
        console.log("asdf" + publickey + username + user_account_address + "\n");
        if (user) {

            throw new Error('publickey exists')
        } else {
<<<<<<< HEAD
            return User.create(publickey, username,user_account_address)
=======
            return User.create(publickey, usernamem, user_account_address)
>>>>>>> d984ace5641a3a3d39613547ea2b0589fbc082da
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