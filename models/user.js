var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        username: {type: String, required: true, max:45},
        password: {type: String, required: true, max:256},
        publicKey: {type: String},
        first_name: {type: String},
        last_name: {type: String},
        date_of_birth: {type: Date},
        gender: {type: String, enum: ['Male', 'Female', 'Other']},
        location: {type: String},
        skills: {type: Array} // enum should be 'SkillSchema'
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

// Export model
module.exports = mongoose.model('User', UserSchema);