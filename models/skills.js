var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SkillSchema = new Schema(
    {
        skillName: {type: String, required: true, unique: true},
    }
);

SkillSchema
.virtual('id')
.get(function () {
    return this._id;
});

module.exports = mongoose.model('Skill', SkillSchema);