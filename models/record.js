var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecordSchema = new Schema(
    {
        publicKey: {type: String, required: true},
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        organization: {type: Schema.Types.ObjectId, ref: 'Organization', required: true},
        start_year: {type: Date, required: true},
        end_year: {type: Date},
        public_data: {type: String},
        private_data_hash: {type: String},
        multihash: {type: Array},
        status: {type: String, enum: ['SIGNED', 'UNSIGNED', 'DECLINED', 'REVIEW'], default: 'UNSIGNED'},
        user_signature: {type: String},
        signee: {type: Schema.Types.ObjectId, ref: 'User'},
        signee_signature: {type: String},
        transactionId: {type: String},
        signTransactionId: {type: String},
        creationTimestamp: {type: Date},
        signTimeStamp: {type: Date}
    }
);

RecordSchema
.virtual('id')
.get(function () {
    return this._id;
});

// Export model
module.exports = mongoose.model('Record', RecordSchema);