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
    var value = req.params.value.toString();
    var name = req.session.username;
    console.log(name + "\n");
    const verify = (user) => {
        console.log(user + "\n");
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
<<<<<<< HEAD
            return User.create(publickey, username, user_account_address)

=======
<<<<<<< HEAD
            return User.create(publickey, username,user_account_address)
=======
            return User.create(publickey, usernamem, user_account_address)
>>>>>>> d984ace5641a3a3d39613547ea2b0589fbc082da
>>>>>>> ae8bb956aa9eb9ac0394513d130cb213fb4b9287
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