
var objectid = function(hashids, prefix){
    this.hashids = hashids;
    this.prefix = prefix;
}

/**
 * Validates that an ID was encoded with the secret
 * 
 */
objectid.prototype.validate = function validateID(ID){
    return this.hashids.decrypt(ID.slice(this.prefix.length)).length > 0;
}

/**
 * Generates an ID with the hashids secret and prepends the prefix
 * 
 */
objectid.prototype.generate = function generate(ip){
    if(this.prefix)
        return this.prefix + this.hashids.encrypt(Date.now());
    else
        return this.hashids.encrypt(Date.now());
}

var export = function(hashids){
    return new objectid(hashids),
}

module.exports = export;