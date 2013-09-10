/**
 * Badge  Schema
 * 
 * hash: _id
 * range: none
 * 
 */
var BadgeSchema = new Schema({
    _id: { //RangeKey
        type: Number,
        required: true,
        default: Date.now()
    },
    image: String,
    name: String,
    description: String,
    conditions: String
});

var Badge  = dynamodb.model("Badge",{hash: '_id'}, BadgeSchema);

module.exports.Badge = Badge;
module.exports.BadgeSchema = BadgeSchema;