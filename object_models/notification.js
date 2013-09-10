/**
 * Notification Schema
 * 
 * hash: _id
 * range: none
 * 
 */
var NotificationSchema = new Schema({
    _id: { //RangeKey
        type: Number,
        required: true,
        default: Date.now()
    },
    _type: [String],
    sender: {type: Number, ref: ''},
    recipient: {type: Number, ref: ''},
    message: {type: Number, ref: ''},
    experience: {type: Number, ref: ''},
    booking: {type: Number, ref: ''},
    heart: {type: Number, ref: ''},
});

var Notification = dynamodb.model("Notification",{hash: '_id'}, NotificationSchema);

module.exports.Notification = Notification;
module.exports.NotificationSchema = NotificationSchema;