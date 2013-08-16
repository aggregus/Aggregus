/**
 * Binds a function to an express app route
 *
 * @param {Object} app the instanciated express app
 * @param {Object} binding_spec Must have properties: method, route, and spec
 *      
 *      Example binding_spec:
 *          {
 *              method: "get",
 *              route: "/api/experience/:id",
 *              callback: api.experience.get
 *          }
 */

function bind_route(app, binding_spec){
    switch(binding_spec.method){
        case 'post':
            app.post(binding_spec.route, binding_spec.callback);
            break;
        case 'put':
            app.put(binding_spec.route, binding_spec.callback);
            break;
        case 'del':
            app.del(binding_spec.route, binding_spec.callback);
            break;
        case 'get':
        default:
            app.get(binding_spec.route, binding_spec.callback);
            break;
    }
}

module.exports = function(app){
    var static = require('./static');
    var api = require('./api');
    var admin = require('./admin');
    
    underscore.each(
        [
            static,
            api.booking,
            api.experience,
            api.heart,
            api.message,
            api.notification,
            api.review,
            api.user
        ], function(endpoint){
            underscore.each(endpoint.bindings, function(binding){
                bind_route(app,binding);
            })
        }
    );
    
    return {
        "api": api,
        "static": static,
        "admin": admin
    };
}
