module.exports = function(app) {
   app.get('/experience/:id', function(req, res) {
	   res.render('../views/static/experience.jade');
  })
}

//	  Experience.find({_id: req.params.id}).populate('creator', app.get('userGuard')).exec(function( err, experience ) {
//		  if (experience) {
//			  console.log(experience);
//			  //res.render('../views/static/experience.jade', experience);
//		  }
//		  else if (err) {
//			  res.render('./views/static/500/experience.jade');
//		  }
//		  else {
//			  res.render('./views/static/404/experience.jade');
//		  }
//	  });