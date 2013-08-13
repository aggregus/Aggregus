module.exports = function(app) {
	app.get('/api/notification', function(req, res) {
		
		var notification = req.query.notification;

		notification.hidden = false;

		Notification.find(query, function(err,doc) {
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
	
	app.post('/api/notification', function(req, res) {
		var notification = req.body.notification;
		
		var newNotification = new Notification(notification);
		
		newNotification.save(function(err) {
			if (err) {
				res.send(500)
				console.log(err)
			}
			else {
				res.send(200);
			}
		});

	});
	
	app.put('/api/notification', function(req, res) {
		var notification = req.body.notification;

		Notification.update(
			{_id: notification._id}, 
			{
				$set: notification,
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
	
	app.delete('/api/notification', function(req, res) {
		var notification = req.body.notification;

		Notification.update(
			{_id: notification._id}, 
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