#! /usr/bin/env node

console.log('This script populates some test users, organizations, records and skills in the database, Specified database as argument.');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument.');
    return
}

const crypto = require('crypto');
var async = require('async');
var User = require('./models/user');
var Organization = require('./models/organization');
var Record = require('./models/record');
var Skill = require('./models/skills');

var mongoose = require('mongoose');
var mongodb = userArgs[0];
mongoose.connect(mongodb, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'));

var users = [];
var organizations = [];
var records = [];
var skills= [];

function userCreate(username, password, cb) {
    userDetail = {
        username: username,
        password: crypto.createHash('sha256').update(password).digest('base64')
    }

    var user = new User(userDetail);
    user.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New User: ' + user);
        users.push(user);
        cb(null, user);
    });
};

function organizationCreate(name, admin, location, cb) {
    orgDetail = {
        orgname: name,
        admin: admin,
        location: location
    }

    var org = new Organization(orgDetail);
    org.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }

        console.log('New Organization: ' + org);
        organizations.push(org);
        cb(null, org);
    });
}

function skillCreate(skillName, cb) {
    skillDetail = {
        skillName: skillName
    }

    var skill = new Skill(skillDetail);
    skill.save(function (err) {
        if (err) {
            cb(err, null);
            return
        }

        console.log('New Skill: ' + skill);
        skills.push(skill);
        cb(null, skill);
    });
}

function recordCreate(publicKey, user, organization, start_year, cb) {
    recordDetails = {
        publicKey: publicKey,
        user: user,
        organization: organization,
        start_year: start_year
    }

    var record = new Record(recordDetails);
    record.save(function (err) {
        if (err) {
            cb(err, null);
            return
        }

        console.log('New Record added: ' + record);
        records.push(record);
        cb(null, record);
    });
}

function createUsersAndSkills(cb) {
    async.parallel([
        function(callback) {
            userCreate('thegaurav', 'mdwbo1903@@', callback);
        },
        function(callback) {
            userCreate('sauravsingh', 'something', callback);
        },
        function(callback) {
            userCreate('mosessam', 'password', callback);
        },
        function(callback) {
            skillCreate('Marketing', callback);
        },
        function(callback) {
            skillCreate('Javascript', callback);
        },
        function(callback) {
            skillCreate('GOLang', callback);
        },
    ], cb);
}

function createOrganizations(cb) {
    async.parallel([
        function(callback) {
            organizationCreate('Heptagon', users[2], 'Bangalore', callback);
        },
        function(callback) {
            organizationCreate('Andood', users[1], 'Bangalore', callback);
        },
        function(callback) {
            organizationCreate('Blockdood', users[0], 'Bangalore', callback);
        },
    ], cb);
}

function createRecords(cb) {
    async.parallel([
        function(callback) {
            let currentDate = new Date();
            recordCreate('412341234124ASddsfd898s7df89sd7fs8d7f', users[0], organizations[2], currentDate, callback);
        },
        function(callback) {
            let currentDate = new Date();
            recordCreate('23523452354jh45oih324o5ih4532oi32h54', users[1], organizations[1], currentDate, callback);
        },
        function(callback) {
            let currentDate = new Date();
            recordCreate('98932452354jh2jh431j2h43j12h43j12j2h', users[2], organizations[0], currentDate, callback);
        },
    ], cb);
}

async.series([
    createUsersAndSkills,
    createOrganizations,
    createRecords
],
// Optional callback
function (err, results) {
    if (err) {
        console.log('FINAL ERR: ' + err);
    } else {
        console.log(results);
    }

    // All done, disconnect from database
    mongoose.connection.close();
});






