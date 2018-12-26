var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecordSchema = new Schema(
    {
        recordType: {type: String, required: true, enum: ['Education', 'Professional']},
        publicKey: {type: String, required: true},
        organizationName: {type: String, required: true, max: 100},
        orgnizationId: {type: String},
        role: {type: String, required: true, max: 25},
        start_date: {type: Date, required: true},
        end_date: {type: Date},
        private: {type: String, required: true},
        multihash: {type: String},
        chaintransactionId: {type: String, required: true},
        hash: {type: String, required: true},
        userSignature:  {type: String, required: true},
        signeeSignature: {type: String},
        encryptedKey: {type: String, required: true}
    }
);

RecordSchema
.virtual('id')
.get(function () {
    return this._id;
});

// Export model
module.exports = mongoose.model('Record', RecordSchema);