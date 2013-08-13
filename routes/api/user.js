module.exports = function(app) {
	app.get('/api/user', function(req, res) {
		var user = req.query.user;

		//user.hidden = false;

		User.find(query, {password: 0}, function(err,doc) {
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
	
	app.post('/api/user', function(req, res) {
		res.send(401) 
		
		// Account creation is handled by the Access API.
		
	});
	
	app.put('/api/user', function(req, res) {
		var user = req.body.user;

		User.update(
			{_id: user._id}, 
			{
				$set: user,
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
	
	app.delete('/api/user', function(req, res) {
		var user = req.body.user;

		User.update(
			{_id: user._id}, 
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