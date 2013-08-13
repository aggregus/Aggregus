module.exports = function(app) {
	app.get('/api/heart', function(req, res) {
		
		var heart = req.query.heart;

		heart.hidden = false;

		Heart.find(query, function(err,doc) {
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
	
	app.post('/api/heart', function(req, res) {
		var heart = req.body.heart;
		
		var newHeart = new Heart(heart);
		
		newHeart.save(function(err) {
			if (err) {
				res.send(500)
				console.log(err)
			}
			else {
				res.send(200);
				Email.heartCreate(heart);
				Email.heartReceived(heart);
			}
		});

	});
	
	app.put('/api/heart', function(req, res) {
		var heart = req.body.heart;

		Heart.update(
			{_id: heart._id}, 
			{
				$set: heart,
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
	
	app.delete('/api/heart', function(req, res) {
		var heart = req.body.heart;

		Heart.update(
			{_id: heart._id}, 
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