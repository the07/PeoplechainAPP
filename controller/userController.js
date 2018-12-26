var tempUser = require('../models/tempUser');
var User = require('../models/user.js');
var Crypto = require("crypto");
var Mailer = require('../utils/emailer/email');
var config = require('../config/email');
var bcrypt = require('bcrypt-nodejs');

// Register the user and store in tempUser Schema
exports.register_user = function(req, res) {

    console.log(req.body);

    if (Object.keys(req.body).length === 0) {
        return res.sendStatus(400);
    }

    res.writeHead(200, {"Content-Type": "application/json"});

    if (req.body.username && req.body.password && req.body.email && req.body.publicKey) {

        let response
        let uniqueString = Crypto.randomBytes(20).toString('hex');


        var user = new tempUser({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null),
            email: req.body.email,
            publicKey: req.body.publicKey,
            createdAt: Date.now(),
            uniqueString: uniqueString
        })

        user.save(function(err, user) {
            if (err) {
                response = 'User already exists'
                return res.end(response);
            }

            console.log('User created successfully ' + user);

            // Send verification mail to the user
            let subject = 'PeopleChain verification email';
            let toAddress = user.email;
            let text = `
                
                    Please click on the following link to verify your email\n

                    localhost:3000/user/verify/${user.username}/${user.uniqueString}
                
            `

            var mailer = new Mailer(config.service, config.username, config.password);

            mailer.sendMail(toAddress, subject, text, function(error, info) {
                if (error) {
                    return res.end('User created but some issue sending mail, please request for another verification mail.')
                } else {
                    console.log(info.response);
                }
            })

            return res.end('User created successfully, please check email for verification link.')

        })
        
    } else {
        return res.end('Unable to connect to server');
    }
};

// Verify user (essentially verify email)
exports.verify_email = function(req, res) {
    var username = req.params.username;
    var token = req.params.token;

    tempUser.findOne({username}, (err, user) => {
        if (err) {
            res.end('Unable to verify email');
        } else {
            if (user.uniqueString === token) {

                var newUser = new User({
                    username: user.username,
                    password: user.password,
                    publicKey: user.publicKey,
                    email: user.email,
                    createdAt: user.createdAt
                });

                newUser.save(function(err, user) {
                    if (err) {
                        return res.end('Unable to create user, please verify again.');
                    } else {
                        console.log(user);
                        return res.end('User verified and active. Please login to continue.');
                    }
                });

                tempUser.remove({username}, function(err) {
                    if (err) {
                        console.log(err);
                    }
                })
            } else {
                res.end('Resend activation link, token does not match');
            }
        }
    })
};

// Verify user (using phone number)
exports.verify_phone = function(req, res) {
    res.send('Not yet implemented, Verify phone');
};

// Get user by id
exports.get_user = function(req, res) {
    res.send('Not yet implemented, Get user by id');
};

// Get all user
exports.get_all_user = function(req, res) {
    res.send('Not yet implemented, Get All Users');
};

// Update user profie
exports.update_profile = function(req, res) {
    res.send('Not yet implemented, Update profile');
};



