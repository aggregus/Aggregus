function get(req, res) {
    var experience;
    
    console.log(req.query)
    
    if (req.query.experience) {
        experience = req.query.experience;
    } else {
        experience = {};
    }
    
    console.log(experience);
    
    //experience.hidden = false;

    Experience.find(experience, function(err,doc) {
          if (doc) {
            res.send(200, doc);
        }
        else if (err) {
            res.send(500);
        }
        else {
            res.send(404)
        }
    });
}
    
function post(req, res) {
        var experience = req.body.experience;
        
        var newExperience = new Experience(experience);
        
        newExperience.save(function(err) {
            if (err) {
                res.send(500)
                console.log(err)
            }
            else {
                res.send(200);
                Email.experienceCreated(experience);
            }
        });

    }
    
function put(req, res) {
        var experience = req.body.experience;

        Experience.update(
            {_id: experience._id}, 
            {
                $set: experience,
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
                    res.send(404)
                }
            });
    }
    
function del(req, res) {
        var experience = req.body.experience;

        Experience.update(
            {_id: experience._id}, 
            {
                $set: {
                    hidden: true
                },
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

var route = '/api/experience';

module.exports.bindings = [
    { "method": "get", "route": route, "callback": get },
    { "method": "post", "route": route, "callback": post },
    { "method": "put", "route": route, "callback": put },
    { "method": "del", "route": route, "callback": del }
];
