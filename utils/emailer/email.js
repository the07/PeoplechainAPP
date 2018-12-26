'use strict';

// Create a mailer instance to send emails.

// TODO: Email verification for both constructor and class method sendMail
var nodemailer = require('nodemailer');

module.exports = class Mailer {

    constructor (service, username, password) {
        this.username = username;
        this.transporter = nodemailer.createTransport({
            service: service,
            auth: {
                user: username,
                pass: password
            }
        })
    }

    sendMail (toEmailAddress, subject, text, callback) {
        var mailOptions = {
            from: this.username,
            to: toEmailAddress,
            subject: subject,
            text: text 
        };

        this.transporter.sendMail(mailOptions, function(error, info) {
            callback(error, info);
        }); 
    }
}