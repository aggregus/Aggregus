/**
 * Experience Schema
 * 
 * hash: _id
 * range: none
 * 
 */
var ExperienceSchema = new Schema({
    _id: { //HashKey
        type: Number,
        required: true,
        default: Date.now()
    },
    _date_created: Date,
    _state: {
        type: String,
        required: true,
        enum: [
            'new',
            'published',
            'approved',
            'booked',
            'withdrawn-approved',
            'withdrawn-booked',
            'archived',
            'deleted']
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    host_id: {
        type: Number,
        ref: 'User'
    },
    guest_instructions: {
        type: String,
        required: true
    },
    duration: Number,
    price: {
        type: Number,
        required: true,
        min: 5.0,
    },
    image_cover: String,
    video_url: String,
    photos_url: [String],
    location_lat: Number,
    location_lng: Number,
    location_normal: String, // TODO I don't know what this is
    bookings_times: [String],  // TODO is this better handled as Date with custom get?
    bookings_max_total: Number,
    bookings_min_total: Number,
    bookings_max_per: {
        type: Number,
        required: true,
    },
    bookings_min_per: {
        type: Number,
        required: true,
        min: 1,
    },
    bookings_dates_yes: [Date],
    bookings_dates_no: [Date],
    bookings_restrict_dates: Boolean,
    bookings_restrict_mixed: Boolean
});

var Experience = dynamodb.model("Experience", {hash: '_id'}, ExperienceSchema);

module.exports.Experience = Experience;
module.exports.ExperienceSchema = ExperienceSchema;