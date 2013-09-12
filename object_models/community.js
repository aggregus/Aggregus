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
        default: Date.now()
    },
    _date_created: Date,
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ambassador: {
        type: Schema.Types.NumberArray,
        ref: 'User'
    },
    location_lat: Number,
    location_lng: Number,
    location_normal: String //Google Maps API full name
});
var CommunityMaster = dynamodb.model("Community",{hash: '_id'}, CommunitySchema);

var CommunityNameSchema = new Schema({
    name: String,
    _id: {
        type: Number,
        default: Date.now()
    },
});
var CommunityName = dynamodb.model("CommunityName", {hash: 'name'}, CommunityNameSchema);


var Community = function Community(data){
    this.community = new CommunityMaster(data);
    this.communityName = new CommunityName({
        name: this.community.data.name,
        _id: this.community._id
    });
};

Community.prototype.insert = function insert(){
    function tryCommunity(self, tryCount){
        if(!tryCount) tryCount = 0;
        
        self.community.insert(function(res,err){
            if(!err){
                if(tryCount > 0){
                    // have to go back and fix communityName
                    self.
                }
            }else{
                switch(err.code){
                    case "ConditionalCheckFailedException":
                        // duplicate ID, we can try this again
                        if(tryCount < 2){
                            tryCommunity(self, tryCount + 1);
                        }
                        break;
                    case "ThrottlingException":
                        // TODO error handling
                        break;
                    case "IncompleteSignatureException":
                    case "InternalFailureException":
                    case "ServiceUnavailableException":
                    default:
                        // TODO error handling
                };
            }
        });
    }
    
    this.communityName.insert(function(res,err){
        if(!err){
            this
            });
        }else{
            switch(err.code){
                case "ConditionalCheckFailedException":
            // TODO name error
            }
        }
    });
};

module.exports.CommunityMaster = CommunityMaster;
module.exports.CommunityNameSchema = CommunityNameSchema;

module.exports.CommunityName = CommunityName;
module.exports.CommunitySchema = CommunitySchema;