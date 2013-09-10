/**
 * User Schema
 * 
 * hash: _id
 * range: none
 * 
 */
var UserSchema = new Schema({
    _id: { //HashKey
        type: Number,
        required: true,
        default: Date.now()
    },
    _date_created: {
        type: Date,
        required: true,
    },
    _type: String,
    _terms_agree: Boolean,
    _deleted: Boolean,
    name_first: String,
    name_last: String,
    name_middle: String,
    name_business: String,
    password: {
        type:String,
        required: true,
    },
    description: String,
    image_cover: String,
    image_profile: String,
    image_gallery: [String],
    contact_email: {
        type: String,
        ref: 'UserEmail'
    },
    community: {
        type:Number,
        required: true,
        ref: 'Community'},
    contact_phone: Number,
    contact_address_street_one: String,
    contact_address_street_two: String,
    contact_address_city: String,
    contact_address_state: String,
    contact_address_zip: Number,
    social_facebook_id: Number,
    social_facebook_username: String,
    social_twitter_id: Number,
    social_twitter_username: String,
    social_pinterest_id: Number,
    social_pinterest_username: String,
    social_googleplus_id: Number,
    social_googleplus_username: String
});
var User = dynamodb.model("User",{hash: '_id'}, UserSchema);


/**
 * User Email Schema **server schema**
 * 
 * hash: email
 * range: none
 * 
 * This is used as an independant call during account creation to confirm
 * password uniqueness.
 * 
 * Access for password resets where the account must be found by email.
 * 
 * Access for email preferences on community, notification and hearts.
 * 
 * Also potentially useful for a 'find friends by email' tool in the future.
 */
var UserEmailSchema = new Schema({
    email: { // HashKey
        type: String,
        required: true,
        lowecase: true,
        projection: ['_password_reset_state','_password_reset_code'],
    },
    user: {
        type: Number,
        // required: true,
        ref: 'User'
    },
    pretty_email: { // preserves email case
        type:String,
        required: true,
    },
    _email_confirm: Boolean,
    _password_reset_state: Boolean,
    _password_reset_code: String,
    preferences_email_community: Boolean,
    preferences_email_notifications: Boolean,
    preferences_email_hearts: Boolean
});
var UserEmail = dynamodb.model("UserEmail",{hash: 'contact_email'}, UserEmailSchema);

/**
 * User Finance Schema **server schema**
 * 
 * hash: contact_email
 * range: user
 * index: owed
 * 
 * Used for financial information.
 * 
 * Access for change bank or cc (stripe customer) information.
 * 
 * Access for payments, thus the rational for the 'financial_owed' index
 */
var UserFinanceSchema = new Schema({
    community: { //HashKey
        type: Number,
        required: true,
        ref: 'Community'},
    user: { //RangeKey
        type: Number,
        required: true,
        ref: 'User'
    },
    pending: Number,
    owed: {
        type: Number,
        index: true, // set as index to search for payments
        projection: ['financial_stripe_bank']
    },
    stripe_customer_id: String,
    stripe_customer: {
        type: Object,
        select: false
    },
    stripe_recipient_id: String,
    stripe_recipient: {
        type: Object,
        select: false
    },
});
var UserFinance = dynamodb.model("UserFinance",{hash: 'community', range: 'user'}, UserFinanceSchema);

module.exports.User = User;
module.exports.UserSchema = UserSchema;
module.exports.UserEmail = UserEmail;
module.exports.UserEmailSchema = UserEmailSchema;
module.exports.UserFinance = UserFinance;
module.exports. UserFinanceSchema =  UserFinanceSchema;