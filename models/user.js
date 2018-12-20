var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        username: {type: String, required: true, max:45, unique: true, trim: true},
        password: {type: String, required: true, max:256},
        publicKey: {type: String, unique: true, trim: true},
        email: {type: String, unique: true, trim: true},
        first_name: {type: String},
        last_name: {type: String},
        date_of_birth: {type: Date},
        gender: {type: String, enum: ['Male', 'Female', 'Other']},
        location: {type: String},
        skills: {type: Array}, // enum should be 'SkillSchema'
        transactions: {type: Array},
        active: {type: Boolean, default: false},
    }
);

// Virtual for user's full name
UserSchema
.virtual('name')
.get(function () {
    return this.first_name + ' ' + this.last_name;
});

// Virtual for user's profile url
UserSchema
.virtual('url')
.get(function () {
    return 'www.peoplechain.com/' + this._id;
})

// Balance of a user
UserSchema
.virtual('balance') 
.get(function () {
    let balance = 100
    return balance;
})

// Export model
module.exports = mongoose.model('User', UserSchema);