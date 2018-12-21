var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EndorsementSchema = new Schema (
    {
        skill: {type: Schema.Types.ObjectId, ref: 'Skill', required: true},
        endorsedUser: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        endorsingUser: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        score: {type: Number, min: 1, max: 5}
    }
);

EndorsementSchema
.virtual('id')
.get(function() {
    return this._id;
});

// Export model
module.exports = mongoose.model('Endorsement', EndorsementSchema);