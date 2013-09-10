/**
 * Community Schema
 * 
 * hash: _id
 * range: none
 * 
 */
var CommunitySchema = new Schema({
    _id: { //HashKey
        type: Number,
        required: true,
        default: Date.now()
    },
    _date_created: Date,
    name: String
    ambassador: {
        type: Number,
        ref: 'User'
    },
    location_lat: Number,
    location_lng: Number
});

var Community  = dynamodb.model("Community",{hash: '_id'}, CommunitySchema);

module.exports.Community = Community;