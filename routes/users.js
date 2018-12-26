var express = require('express');
var router = express.Router();
var passport = require('passport');

// Route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(400).json({
        'message': 'Access-denied'
    });
}


//Require controller modules
var userController = require('../controller/userController');
var recordController = require('../controller/recordController');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// router.post('/', function(req, res, next) {
//   console.log(req);
//   res.json({
//     msg: 'New user created'
//   });
// });

// Register a user
router.post('/register', userController.register_user);

// Verify email
router.post('/verify/:username/:token', userController.verify_email);

// User Login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/user/dashboard',
    failureRedirect: '/user/login'
}));

// User dashboard
router.get('/dashboard', isLoggedIn, userController.get_user);

// Add a record
router.post('/record/add', isLoggedIn, recordController.add_record);



module.exports = router;
