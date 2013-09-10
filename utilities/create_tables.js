var debug = require('../debug.js');
var secrets = require('../secrets.js')('dev');

dynamodb = require('dynamodb-odm');
Schema = dynamodb.Schema;

dynamodb.connect({
    accessKeyId: secrets.aws_ddb_accessKeyId,
    secretAccessKey: secrets.aws_ddb_secretAccessKey,
    region: 'us-west-2',
    apiVersion: '2012-08-10'
},secrets.aws_ddb_tablePrefix);

/**
 * User Models
 */
var BadgeModels = require('../object_models/badge.js');
var BookingModels = require('../object_models/booking.js');
var CommunityModels = require('../object_models/community.js');
var ExpModels = require('../object_models/experience.js');
var HeartModels = require('../object_models/heart.js');
var MsgModels = require('../object_models/message.js');
var NotifiModels = require('../object_models/notification.js');
var UserModels = require('../object_models/user.js');

var tables = [
    { model: BadgeModels.Badge,             throughput: { read: 1, write: 1 } },
    
    { model: BookingModels.Booking,         throughput: { read: 1, write: 1 } },
    
    { model: CommunityModels.Community,     throughput: { read: 1, write: 1 } },
    
    { model: ExpModels.Experience,          throughput: { read: 1, write: 1 } },

    { model: HeartModels.HeartByCreator,    throughput: { read: 1, write: 1 } },
    { model: HeartModels.HeartByExperience, throughput: { read: 1, write: 1 } },

    { model: MsgModels.Message,             throughput: { read: 1, write: 1 } },
    { model: MsgModels.MessageBySender,     throughput: { read: 1, write: 1 } },
    { model: MsgModels.MessageByRecipient,  throughput: { read: 1, write: 1 } },
    
    { model: NotifiModels.Notification,     throughput: { read: 1, write: 1 } },
    
    { model: UserModels.User,               throughput: { read: 1, write: 1 } },
    { model: UserModels.UserEmail,          throughput: { read: 1, write: 1 } },
    { model: UserModels.UserFinance,        throughput: { read: 1, write: 1 } }
    // { model: _constructor_, throughput: { read: 2, write: 1 } },
    
];

function createTables(index){
    if(!index) index = 0;
    var spec = tables[index];
    var modelName = spec.model.modelName;
    var tableName = dynamodb.connection.tableName(modelName);

    function nextTable(){
        if(index + 1 < tables.length){
            // lets process the next one!
            setTimeout(createTables, 0, index + 1)
        }
    }
    
    spec.model.create(spec.throughput, function(err,res){
        if(!err){
            debug(modelName, res);
            nextTable();
        }else{
            if(err.code == "LimitExceededException" || 
               err.code == "ThrottlingException")
            {
                // lets slow down the request rate and try again
                debug(err.code + ": while creating " + tableName + ", waiting 5 seconds");
                setTimeout(createTables, 5000, index)
            }else if(err.code == "ResourceInUseException"){
                // oops, table already exists, lets keep moving on
                debug(err.code + ": skipping " + tableName + ", table already exists");
                nextTable();
            }else{
                // just stop trying
                debug("Error while creating " + tableName + ", processing cue terminating", err);
            }
        }
    });    
}

createTables();