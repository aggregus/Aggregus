var debug = require('../debug.js');
var secrets = require('../secrets.js');
var util = require('util');
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
//var ReviewModels = require('../object_models/review.js');
var UserModels = require('../object_models/user.js');

var tables = [
    { model: BadgeModels.Badge,             throughput: { read: 1, write: 1 } },
    
    { model: BookingModels.Booking,         throughput: { read: 1, write: 1 } },
    
    { model: CommunityModels.CommunityMaster,     throughput: { read: 1, write: 1 } },
    { model: CommunityModels.CommunityName, throughput: { read: 1, write: 1 } },
    
    { model: ExpModels.Experience,          throughput: { read: 1, write: 1 } },
    { model: ExpModels.ExperienceSearch,   throughput: { read: 1, write: 1 } },
    { model: ExpModels.ExperienceByHost,   throughput: { read: 1, write: 1 } },
    
    { model: HeartModels.HeartByCreator,    throughput: { read: 1, write: 1 } },
    { model: HeartModels.HeartByExperience, throughput: { read: 1, write: 1 } },

    { model: MsgModels.Message,             throughput: { read: 1, write: 1 } },
    { model: MsgModels.MessageBySender,     throughput: { read: 1, write: 1 } },
    { model: MsgModels.MessageByRecipient,  throughput: { read: 1, write: 1 } },
    
    { model: NotifiModels.Notification,     throughput: { read: 1, write: 1 } },
    
    // review
    // { model: _constructor_, throughput: { read: 2, write: 1 } },
    // { model: _constructor_, throughput: { read: 2, write: 1 } },
    
    { model: UserModels.User,               throughput: { read: 1, write: 1 } },
    { model: UserModels.UserEmail,          throughput: { read: 1, write: 1 } },
    { model: UserModels.UserFinance,        throughput: { read: 1, write: 1 } }
    // { model: _constructor_, throughput: { read: 2, write: 1 } },
    
];

var getTableName = function getTableName(index){
    var modelName = tables[index].model.modelName;
    return dynamodb.connection.tableName(modelName);
}

// global variable used to stop showTableStatus
var showTableStatus_timeout;

/**
 * displays the status of all the tables, terminates when all tables reach 
 * terminal state.
 */
var showTableStatus = function showTableStatus(callback, working){
    switch(working){
        case '|':
            working = '/';
            break;
        case '/':
            working = '-';
            break;
        case '-':
            working = '\\';
            break;
        case '\\':
        default:
            working = '|';
            break;
    }
    
    var continue_logging = false;
    console.error('\033[2J');
    //console.error('----');
    for(var index in tables){
        var spec = tables[index];
        var tableName = getTableName(index);

        var status = 'UNKNOWN';
        if(spec.description){
            status = spec.description.TableStatus;
        }
        
        var padding = new Array( 25 - tableName.length ).join( '.' );
        
        if(status == 'UNKNOWN' || status == 'UPDATING' || status == 'CREATING' || status == 'DELETING'){
            continue_logging = true;
            console.error(util.format("%s%s%s %s", tableName, padding, status, working));
        }else{
            console.error(util.format("%s%s%s", tableName,padding, status));
        }
    }
    if(continue_logging)
        showTableStatus_timeout = setTimeout(showTableStatus, 250, callback, working);
    else{
        showTableStatus_timeout = undefined;
        if(callback) callback();
    }
}

/**
 * Polls tables[index] at 5 second intervals until no longer in transitive
 * state (CREATING or DELETING) and executes a callback for the terminal state
 * providing the index
 */
var pollTableTransition = function pollTableTransition(index, onDelete, onActive){
    var spec = tables[index];
    var tableName = getTableName(index);
    
    dynamodb.connection.db.describeTable(tableName, function(err, res){
        if(!err){
            spec.description = res;
            switch(res.TableStatus){
                case 'CREATING':
                case 'DELETING':
                case 'UPDATING':
                    setTimeout(pollTableTransition, 5000, index, onDelete, onActive);
                    break;
                case 'ACTIVE':
                    if(onActive) onActive(index);
                    break;
            }
        }else{
            switch(err.code){
                case "ResourceNotFoundException":
                    spec.description = {
                        TableName: tableName,
                        TableStatus: 'DELETED'
                    };
                    if(onDelete) onDelete(index);
                    break;
                case "ThrottlingException":
                    setTimeout(pollTableTransition, 10000, index, onDelete, onActive);
                    break;
                default:
                    debug("Error while polling " + tableName + ", polling terminating", err);
            }
        }
    });
}

var createTable = function createTable(index){
    var spec = tables[index];
    var tableName = getTableName(index);

    spec.model.create(spec.throughput, function(err,res){
        if(!err){
            spec.description = res;
            setTimeout(pollTableTransition, 10000, index, createTable);
        }else{
            switch(err.code){
                case "LimitExceededException":
                case "ThrottlingException":
                    // lets slow down the request rate and try again
                    setTimeout(createTable, 5000, index);
                    break;
                case "ResourceInUseException":
                    // oops, table already exists
                    // still want to describe it
                    pollTableTransition(index, createTable);
                    break;
                default:
                    // just stop trying
                    spec.description = {
                        TableName: tableName,
                        TableStatus: 'ERROR'
                    };
                    debug("Error while creating " + tableName + ", processing cue terminating", err);
                    //throw err;
            }
        }
    });
}

/**
 * Iterates through the models and creates each table.
 */
var createTables = function createTables(){
    // start displaying the tables status
    if(!showTableStatus_timeout)
        showTableStatus_timeout = setTimeout(showTableStatus, 0);
    
    for(var index in tables){
        setTimeout(createTable, index*500, index);
    }
}

/**
 * Iterates through the models and deletes each table.
 */
var deleteTable = function deleteTable(index){
    var spec = tables[index];
    var tableName = getTableName(index);
    
    dynamodb.connection.db.deleteTable(tableName, function(err,res){
        if(!err){
            spec.description = res;
            setTimeout(pollTableTransition, 10000, index);
        }else{
            switch(err.code){
                case "LimitExceededException":
                case "ThrottlingException":
                    // lets slow down the request rate and try again
                    setTimeout(deleteTable, 5000, index);
                    break;
                case "ResourceNotFoundException":
                    // mark as deleted and move on
                    spec.description = {
                        TableName: tableName,
                        TableStatus: 'DELETED'
                    };
                    break;
                case "IncompleteSignatureException":
                case "InternalFailureException":
                case "ServiceUnavailableException":
                case "ValidationException":
                default:
                    // just stop trying
                    spec.description = {
                        TableName: tableName,
                        TableStatus: 'ERROR'
                    };
                    debug("Error while deleting " + tableName + ", processing cue terminating", err);
                    //throw err;
            }
        }
    });
}

var deleteTables = function deleteTables(){
    // start displaying the tables status
    if(!showTableStatus_timeout)
        showTableStatus_timeout = setTimeout(showTableStatus, 0);
    
    for(var index in tables){
        setTimeout(deleteTable, index*500, index);
    }
}

var checkTables = function checkTables(callback){
    // start displaying the tables status
    if(!showTableStatus_timeout)
        showTableStatus_timeout = setTimeout(showTableStatus, 0, function(){
            for(var index in tables){
                console.log();
                //console.log(util.inspect(tables[index].description, {color: true}));
                debug(tables[index].description);
            }
            if(callback) callback();
        });
    
    for(var index in tables){
        setTimeout(pollTableTransition, index*10, index);
    }
}

var updateTable = function updateTable(index){
    var spec = tables[index];
    var tableName = getTableName(index);
    
    dynamodb.connection.db.updateTable(tableName, spec.throughput, function(err,res){
        if(!err){
            spec.description = res;
            setTimeout(pollTableTransition, 10000, index);
        }else{
            switch(err.code){
                case "LimitExceededException":
                    debug('Unreasonable!', err);
                    // TODO: check and scale...
                    break;
                case "ThrottlingException":
                    // lets slow down the request rate and try again
                    debug(err);
                    setTimeout(updateTable, 5000, index);
                    break;
                case "ResourceInUseException":
                    // oops, table already exists
                    // still want to describe it
                    pollTableTransition(index, updateTable, updateTable);
                    break;
                case "ResourceNotFoundException":
                    // mark as deleted and move on
                    spec.description = {
                        TableName: tableName,
                        TableStatus: 'DELETED'
                    };
                    break;
                case "ValidationException":
                    debug("Error while updating " + tableName + ", there was no change", err);
                    break;
                case "IncompleteSignatureException":
                case "InternalFailureException":
                case "ServiceUnavailableException":
                default:
                    // just stop trying
                    debug("Error while updating " + tableName + ", processing cue terminating", err);
                    //throw err;
            }
        }
    });
}

module.exports.createTables = createTables;
module.exports.deleteTables = deleteTables;
module.exports.checkTables = checkTables;
module.exports.tables = tables;
module.exports.updateTable = updateTable;