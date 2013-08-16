function about(req, res) {
    res.render('./views/static/about.jade');
}

function experience(req, res) {
    res.render('../views/static/experience.jade');
}

//      Experience.find({_id: req.params.id}).populate('creator', app.get('userGuard')).exec(function( err, experience ) {
//          if (experience) {
//              console.log(experience);
//              //res.render('../views/static/experience.jade', experience);
//          }
//          else if (err) {
//              res.render('./views/static/500/experience.jade');
//          }
//          else {
//              res.render('./views/static/404/experience.jade');
//          }
//      });

function home(req, res) {
    res.render('../views/static/home.jade');
}

function privacy(req, res) {
    res.render('./views/static/privacy.jade');
}

function profile(req, res) {
    User.find({_id: req.params.id}, function(err, user) {
        if (user) {
            res.render('./views/static/profile.jade', user);
        } else if (err) {
            res.render('./views/static/500/experience.jade');
        } else {
            res.render('./views/static/404/experience.jade');
        }
    });
}

function refunds(req, res) {
    res.render('./views/static/refunds.jade');
}

function terms(req, res) {
    res.render('./views/static/terms.jade');
}

var route = '/api/user';

module.exports.bindings = [
    { "method": "get", "route": "/", "callback": home },
    { "method": "get", "route": "/about", "callback": about },
    { "method": "get", "route": "/privacy", "callback": privacy },
    { "method": "get", "route": "/refunds", "callback": refunds },
    { "method": "get", "route": "/terms", "callback": terms },
    { "method": "get", "route": "/experience/:id", "callback": experience },
    { "method": "get", "route": "/profile/:id", "callback": profile }
];

//module.exports.about = about;
//module.exports.experience = experience
//module.exports.home = home;
//module.exports.privacy = privacy;
//module.exports.profile = profile;
//module.exports.refunds = refunds;
//module.exports.terms = terms;
