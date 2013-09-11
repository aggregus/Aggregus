module.exports = function(app) {
  app.get('/profile/profile', function(req, res) {
  	res.render('../views/static/profile.jade');
  })

    app.get('/profile/city/locked', function(req, res) {
  	res.render('../views/static/city/locked.jade');
  })
  	app.get('/profile/city/unlocked', function(req, res) {
  	res.render('../views/static/city/unlocked.jade');
  })
  	app.get('/profile/dashboard', function(req, res) {
  	res.render('../views/static/dashboard.jade');
  })
  	app.get('/profile', function(req, res) {
  	res.render('../views/static/profile.jade');
  })
  	app.get('/homepage', function(req, res) {
  	res.render('../views/static/homepage.jade');
  })

}

//	  User.find({_id: req.params.id}, function(err, user) {
//		  if (user) {
//			  res.render('./views/static/profile.jade', user);
//		  }
//		  else if (err) {
//			  res.render('./views/static/500/experience.jade');
//		  }
//		  else {
//			  res.render('./views/static/404/experience.jade');
//		  }
//	});