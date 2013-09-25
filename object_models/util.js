var getValidAttributes = function getValidAttributes(requested_attributes, schema){
    var valid_attributes = []
    
    for(var i in requested_attributes){
        var requested_attribute = requested_attributes[i]
        
        if(schema.paths[requested_attribute] != undefined ){
            valid_attributes.push(requested_attribute)
        }
    }
    
    return valid_attributes;
}

/**
 * Cleans out private attributes that begin with and underscore
 */
var sanitize = function sanitize(item){
    var sanitized = {};
    
    for(var path in item){
        if(path.indexOf('_') === 0){
            sanitized[path] = item[path];
        }
    }
    
    return sanitized;
}

module.exports.getValidAttributes = getValidAttributes;
module.exports.sanitize = sanitize;