var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var tempUser = new Schema(
    {
        username: {type: String, required: true, max: 45, trim: true, unique: true},
        password: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        publicKey: {type: String, required: true, unique: true},
        createdAt: {type: Date, required: true},
        uniqueString: {type: String, required: true}
    }
)

// Virtual for entity id
tempUser
.virtual('id')
.get(function () {
    return this._id;
});

// Export model
module.exports = mongoose.model('tempUser', tempUser);