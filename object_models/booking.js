/**
 * Booking Schema
 * 
 * hash: _id
 * range: none
 * 
 */
var BookingSchema = new Schema({
    _id: { //HashKey
        type: Number,
        required: true,
        default: Date.now()
    },
    _date_created: Date,
    _confirmed: Boolean,
    _charged: Boolean,
    _charge_token: String,
    guest: {
        type: Number,
        ref: 'User'
    },
    host: {
        type: Number,
        ref: 'User'
    },
    booked_experience: {
        type: Number,
        ref: 'Experience'
    },
    booked_date: String,
    booked_time: String,
    booked_attendees: Number,
    booked_profit_total: Number, // TODO description
    booked_profit_guest: Number, // TODO description
});

var Booking  = dynamodb.model("Booking",{hash: '_id'}, BookingSchema);

module.exports.prefix = prefix;
module.exports.Booking = Booking;
module.exports.BookingSchema = BookingSchema;