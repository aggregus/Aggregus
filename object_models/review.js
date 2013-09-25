/**
 * Review Schema
 * 
 * hash: _id
 * range: none
 * 
 */
var ReviewSchema = new Schema({
    
});

var Review  = dynamodb.model("Review",{hash: '_id'}, ReviewSchema);

module.exports.prefix = prefix;

module.exports.Review = Review;
module.exports.ReviewSchema = ReviewSchema;