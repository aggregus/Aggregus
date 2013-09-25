var object_util = require('./util.js');
var objectid = require('./objectid.js');

var userProvider = function(dynamodb, hashids){
    this.prefix = 'us_';
    this.db = dynamodb;
    this.objectid = new objectid(hashids, this.prefix);
    this.schemas = {};
    this.models = {};
    
    /**
    * User Schema
    * 
    * hash: _id
    * range: none
    * 
    */
    this.schemas.User = new this.db.Schema({
        _id: { //HashKey
            type: String,
            required: true,
            validate: [this.objectid.validate(), 'validID']
        },
        _date_created: {
            type: Date,
            required: true,
            default: Date.now
        },
        _type: String,
        _terms_agree: Boolean,
        _deleted: Boolean,
        _password: {
            type:String,
            required: true,
        },
        name_first: String,
        name_last: String,
        name_middle: String,
        name_business: String,
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
    this.models.User = this.db.model("User",{hash: '_id'}, this.schemas.User);


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
    this.schemas.UserEmail = new this.db.Schema({
        email: { // HashKey
            type: String,
            required: true,
            lowecase: true,
            projection: ['_password_reset_state','_password_reset_code'],
        },
        user: {
            type: Number,
            // required: true,
            ref: 'User',
            validate: [this.objectid.validate(), 'validID']
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
    this.models.UserEmail = this.db.model("UserEmail",{hash: 'email'}, this.schemas.UserEmail);

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
    this.schemas.UserFinance = new this.db.Schema({
        community: { //HashKey
            type: Number,
            required: true,
            ref: 'Community'},
        user: { //RangeKey
            type: Number,
            required: true,
            ref: 'User',
            validate: [this.objectid.validate(), 'validID']
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
    this.models.UserFinance = this.db.model("UserFinance",{hash: 'community', range: 'user'}, this.schemas.UserFinance);

    
    this.schemas.UserFB = new this.db.Schema({
        facebook_id: String,
        _id: {
            type: String,
            required: true,
            ref: 'User',
            validate: [this.objectid.validate(), 'validID']
        }
    });
    this.models.UserFB = this.db.model("UserFB", {hash: 'facebook_id'}, this.schemas.UserFB);
};

userProvider.prototype.findById = function(id, requested_attributes, callback){
    var self = this;
    var options = {};
    
    if(!callback && typeof requested_attributes === 'function'){
        callback = requested_attributes;
        requested_attributes = [];
    }else{
        options.attributesToGet = object_util.getValidAttributes(requested_attributes, this.schema.User);
    }
    
    self.models.User.getItem( { _id: id }, options, function(err, res){
        if(err){ return callback(err); }
        callback || callback(null, object_util.sanitize(res));
    });
};

userProvider.prototype.findByFBId = function(id, requested_attributes, callback){
    var self = this;
    
    if(!callback && typeof requested_attributes === 'function'){
        callback = requested_attributes;
        requested_attributes = [];
    }else{
        options.attributesToGet = object_util.getValidAttributes(requested_attributes, this.schema.User);
    }

    self.models.UserFB.getItem( { facebook_id: id }, options, function(err, res){
        if(err){ return callback(err);}
        if(res._id){
            self.findById(res._id, requested_attributes, callback);
        }else{
            callback || callback(null, {}); // didn't find a facebook user with that id
        }
    });
    
};

module.exports = userProvider;
