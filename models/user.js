var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema(
    {
        username: {type: String, required: true, max:45, unique: true, trim: true},
        password: {type: String, required: true, max:256},
        publicKey: {type: String, required: true ,unique: true, trim: true},
        email: {type: String, unique: true, trim: true},
        createdAt: {type: Date, required: true},
        active: {type: Boolean, default: true},
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

// Checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// // Balance of a user
// UserSchema
// .virtual('balance') 
// .get(function () {
//     let balance = 100
//     return balance;
// })

// Export model
module.exports = mongoose.model('User', UserSchema);