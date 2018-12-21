var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tempUser = new Schema(
    {
        username: {type: String, required: true, max: 45, trim: true},
        entityValue: {type: String, required: true},
        entiryType: {type: String, required: true, enum: ['Email', 'Phone']},
        createdAt: {type: Date, required: true}
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