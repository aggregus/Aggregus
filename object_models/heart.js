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
    _id: { //RangeKey
        type: Number,
        required: true,
        default: Date.now()
    },
    creator: {
        type: Number,
        required: true,
        ref: 'User'
    },
    experience: {
        type: Number,
        required: true,
        ref: 'Experience'
    },
});

var HeartByCreator = dynamodb.model(
    "HeartByCreator",
    {hash: 'creator', range: '_id'},
    HeartSchema
);
var HeartByExperience = dynamodb.model(
    "HeartByExperience",
    {hash: 'experience', range: '_id'},
    HeartSchema
);

module.exports.HeartSchema = HeartSchema;
module.exports.HeartByCreator = HeartByCreator;
module.exports.HeartByExperience = HeartByExperience;