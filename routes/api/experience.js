module.exports = function(app) {
	app.get('/api/experience', function(req, res) {
		
		var experience = req.query.experience;

		experience.hidden = false;

		Experience.find(query, function(err,doc) {
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
	});
	
	app.post('/api/experience', function(req, res) {
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

	});
	
	app.put('/api/experience', function(req, res) {
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
	});
	
	app.delete('/api/experience', function(req, res) {
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
		});
}