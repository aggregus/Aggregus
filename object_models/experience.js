/**
 * Experiences will be accessed on
 *      Community pages - multiple access by community._id and experience.state
 *      User pages - multiple access by user._id [and state]
 *      Experience pages - single access by experience._id
 *      Booking pages - single access by experience._id
 * 
 * They are updated from the dashboard
 */


// community,_id - experience PRIMARY_KEY
// community,_state - search
// community,price - search
// community,host - search
// community,bookings_max - search
// community,bookings_min - search
// community,bookings_restrict_dates - search
// 
// host,_id - PRIMARY_KEY
// host,_state - profile, dashboard

/**
 * Experience Schema
 * 
 * hash: _id
 * range: none
 * 
 */
var ExperienceSchema = new Schema({
    community: {
        type: Number,
        required: true,
        ref: 'Community'
    },
    _id: {
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
    
    // experience details
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    host: {
        type: Number,
        required: true,
        ref: 'User'
    },
    guest_instructions: {
        type: String
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

    // Location information
    location_lat: Number,
    location_lng: Number,
    location_normal: String, // Friendly location name
    radius: Number,
    
    // booking constraints
    bookings_times: [String],  // TODO is this better handled as Date with custom get?
    bookings_max: {
        type: Number,
        required: true,
    },
    bookings_min: {
        type: Number,
        required: true,
        min: 1,
    },
    bookings_dates_yes: [Date],
    bookings_dates_no: [Date],
    bookings_restrict: {
        type: Boolean,
        required: true,
        default: false
    },
    
    // social data
    heart_count: {
        type: Number,
        default: 0,
    },
    review_count: {
        type: Number,
        default: 0,
    }
});
var Experience = dynamodb.model("Experience", {hash: '_id'}, ExperienceSchema);

/**
 * Search published Experiences
 * 
 * these are migrated when the status changes
 */
var ExperienceSearchSchema = new Schema({
    community: {
        type: Number,
        required: true,
        ref: 'Community'
    },
    _id: {
        type: Number,
        required: true,
        ref: 'Experience'
    },
    host: {
        type: Number,
        index: true,
        projection: 'ALL',
        ref: 'User'
    },
    price: {
        type: Number,
        index: true,
        projection: 'ALL',
    },
    bookings_max: {
        type: Number,
        index: true,
        projection: 'ALL',
    },
    bookings_min: {
        type: Number,
        index: true,
        projection: 'ALL',
    },
    bookings_restrict: {
        type: Boolean,
        index: true,
        projection: 'ALL',
    }
});
var ExperienceSearch = dynamodb.model("ExperienceSearch", {hash: 'community', range: '_id'}, ExperienceSearchSchema);

/**
 * 
 */
var ExperienceByHostSchema = new Schema({
    host: {
        type: Number,
        required: true,
        ref: 'User'
    },
    _id: {
        type: Number,
        required: true,
        ref: 'Experience'
    },
    _state: {
        type: String,
        index: true,
        enum: [
        'new',
        'published',
        'approved',
        'booked',
        'withdrawn-approved',
        'withdrawn-booked',
        'archived',
        'deleted']
    }
});
var ExperienceByHost = dynamodb.model("ExperienceByHost", {hash: 'host', range: '_id'}, ExperienceByHostSchema);

/**
 * This table is intended to be created on a per community basis with the 
 */
var ExperienceDatesSchema = new Schema({
    date: Date, // HashKey
    _id: { // RangeKey
        type: Number,
        ref: 'Experience'
    },
});


module.exports.Experience = Experience;
module.exports.ExperienceSchema = ExperienceSchema;

module.exports.ExperienceSearch = ExperienceSearch;
module.exports.ExperienceSearchSchema = ExperienceSearchSchema;

module.exports.ExperienceByHost = ExperienceByHost;
module.exports.ExperienceByHostSchema = ExperienceByHostSchema;

module.exports.ExperienceDatesSchema = ExperienceDatesSchema
