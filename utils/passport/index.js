var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');

var myLocalConfig = (passport) => {

    passport.serializeUser(function (user, done) {
        done(null, user.username);
    });

    passport.deserializeUser(function (username, done) {
        User.findOne({username: username}, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass req from our route (to check if user is logged in)
    },
    function(req, username, password, done) {

        if (username) {
            username = username.toLowerCase();
        }

        process.nextTick(function() {
            User.findOne({username: username}, function(err, user) {

                console.log('Searching for user...');
                console.log(user);
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false);
                }

                if (!user.validPassword(password)) {
                    return done(null, false);
                }
                else {
                    return done(null, user);
                }
            });
        });
    }));
};

module.exports = myLocalConfig;