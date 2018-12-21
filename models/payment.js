var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentSchema = new Schema (
    {
        buyingUser: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        fiatAmount: {type: Number, required: true, min: 0, max: 1000000},
        razorpayTransactionId: {type: String, required: true},
        status: {type: String, enum: ['SUCCESS', 'FAILED', 'PENDING'], required: true}
    }
);

PaymentSchema
.virtual('id')
.get(function () {
    return this._id;
});

// Export model
module.exports = mongoose.model('Payment', PaymentSchema);