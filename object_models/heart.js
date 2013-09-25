/**
 * Heart Schema
 * 
 * hash: creator or experience (depending on access senario
 * range: _id
 * 
 * Probably want to try to put in the HeartByExperience table first as key
 * collision is more likely there.
 */
var HeartSchema = new Schema({
    user: {
        type: Number,
        required: true,
        ref: 'User'
    },
    experience: {
        type: Number,
        required: true,
        ref: 'Experience'
    },
    _created: { //RangeKey
        type: Number,
        index: true,
        default: Date.now()
    }
});

var HeartByCreator = dynamodb.model(
    "HeartByCreator",
    {hash: 'user', range: 'experience'},
    HeartSchema
);
var HeartByExperience = dynamodb.model(
    "HeartByExperience",
    {hash: 'experience', range: 'user'},
    HeartSchema
);

module.exports.HeartSchema = HeartSchema;
module.exports.HeartByCreator = HeartByCreator;
module.exports.HeartByExperience = HeartByExperience;