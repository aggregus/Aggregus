module.exports = function(app) {
	app.get('/api/message', function(req, res) {
		
		var message = req.query.message;

		message.hidden = false;

		Message.find(query, function(err,doc) {
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
	
	app.post('/api/message', function(req, res) {
		var message = req.body.message;
		
		var newMessage = new Message(message);
		
		newMessage.save(function(err) {
			if (err) {
				res.send(500)
				console.log(err)
			}
			else {
				res.send(200);
				Email.messageCreated(message);
			}
		});

	});
	
	app.put('/api/message', function(req, res) {
		var message = req.body.message;

		Message.update(
			{_id: message._id}, 
			{
				$set: message,
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
	
	app.delete('/api/message', function(req, res) {
		var message = req.body.message;

		Message.update(
			{_id: message._id}, 
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