/**
 * Message Schema
 * 
 * hash: _id
 * range: none
 * 
 */
var MessageSchema = new Schema({
    _id: { //RangeKey
        type: Number,
        required: true,
        default: Date.now()
    },
    _read: Boolean,
    _replied: Boolean,
    sender: {type: Number, ref: ''},
    recipient: {type: Number, ref: ''},
    message: String,
    subject: String
});

var Message = dynamodb.model("Message",{hash: '_id'}, MessageSchema);
var MessageBySender = dynamodb.model(
    "MessageBySender",
    {hash: 'sender', range: '_id'},
    MessageSchema
);
var MessageByRecipient = dynamodb.model(
    "MessageByRecipient",
    {hash: 'recipient', range: '_id'},
    MessageSchema
);

module.exports.prefix = prefix;

module.exports.Message = Message;
module.exports.MessageBySender = MessageBySender;
module.exports.MessageByRecipient = MessageByRecipient;
module.exports.MessageSchema = MessageSchema;