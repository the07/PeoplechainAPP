var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RequestSchema = new Schema (
    {
        requestedUser: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        requestingUser: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        requestedEntity: {type: String, required: true},
        status: {type: String, enum: ['AWAITING', 'GRANTED', 'DECLIINED'], default: 'AWAITING'},
        sharedEncryptedKey: {type: String}
    }
);

RequestSchema
.virtual('id')
.get(function () {
    return this._id;
});

// Export model
module.exports = mongoose.model('Request', RequestSchema);