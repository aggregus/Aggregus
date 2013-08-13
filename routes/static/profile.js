module.exports = function(app) {
  app.get('/profile/:id', function(req, res) {
	  User.find({_id: req.params.id}, function(err, user) {
		  if (user) {
			  res.render('./views/static/profile.jade', user);
		  }
		  else if (err) {
			  res.render('./views/static/500/experience.jade');
		  }
		  else {
			  res.render('./views/static/404/experience.jade');
		  }
	});
  })
}