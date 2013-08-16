function get(req, res) {
    // TODO adjust query hidden fields based on login status
    // i.e. for an authenticated user they need some financial info abou their
    // account, both looking at someone else they don't need to see it

    // make sure it's a safe string
    if (typeof req.query._id === "string"){
        var _id = req.query._id;

        var query = {
            '_id': _id,
            '_details.deleted': false
            //'hidden': false;
        };
        
        User.find(query, {_details: 0, password: 0, financial: 0}, function(err,doc) {
              if (doc) {
                res.send(200, doc);
            }
            else if (err) {
                res.send(500);
            }
            else {
                res.send(404);
            }
        });
    } else {
        res.send(404);
    }
}
    
function post(req, res) {
        res.send(401);
        
        // Account creation is handled by the Access API.
        
    }
    
function put(req, res) {
        var user = req.body.user;

        User.update(
            {_id: user._id}, 
            {
                $set: user
            }, 
            function(err,doc) {
                  if (err) {
                    res.send(500);
                    console.log(err);
                }
                else if (doc) {
                    res.send(200);
                }
                else {
                    res.send(404);
                }
            });
    }
    
function del(req, res) {
        var user = req.body.user;

        User.update(
            {_id: user._id}, 
            {
                $set: {
                    hidden: true
                }
            }, 
            function(err,doc) {
                  if (err) {
                    res.send(500);
                }
                else if (doc) {
                    res.send(200);
                }
                else {
                    res.send(404);
                }
            });
        }

var route = '/api/user';

module.exports.bindings = [
    { "method": "get", "route": route, "callback": get },
    { "method": "post", "route": route, "callback": post },
    { "method": "put", "route": route, "callback": put },
    { "method": "del", "route": route, "callback": del }
];


//module.exports.get = get;
//module.exports.post = post;
//module.exports.put = put;
//module.exports.del = del;

