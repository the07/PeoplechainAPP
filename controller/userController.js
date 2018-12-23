var tempUser = require('../models/tempUser');
var User = require('../models/user.js');

// Register the user and store in tempUser Schema
exports.register_user = function(req, res) {
    res.send('Not yet implemented, Register user');
};

// Verify user (essentially verify email)
exports.verify_email = function(req, res) {
    res.send('Not yet implemented, Verify email');
};

// Verify user (using phone number)
exports.verify_user = function(req, res) {
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



