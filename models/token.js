var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TokenSchema = new Schema (
    {
        fromUser: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        toUser: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        transactionId: {type: String, required: true},
        tokenAmount: {type: Number, required: true},
        message: {type: String, max: 100}
    }
);

TokenSchema
.virtual('id')
.get(function () {
    return this._id;
});

// Export module
module.exports = mongoose.model('Token', TokenSchema);