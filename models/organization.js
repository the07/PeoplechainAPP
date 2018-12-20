var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrganizationSchema = new Schema (
    {
        orgname: {type: String, required: true, unique: true, trim: true},
        admin: {type: Schema.Types.ObjectId, required: true},
        location: {type: String, required: true},
        webpage: {type: String, unique: true, trim: true},
        verified: {type: Boolean}
    }
);

OrganizationSchema
.virtual('url')
.get(function () {
    return 'www.peoplechain.com' + this._id;
});

OrganizationSchema
.virtual('id')
.get(function () {
    return this._id;
});

// Export model
module.exports = mongoose.model('Organization', OrganizationSchema);
