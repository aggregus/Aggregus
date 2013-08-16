function get(req, res) {
		
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
	}
	
function post(req, res) {
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

	}
	
function put(req, res) {
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
	}
	
function del(req, res) {
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
		}

var route = '/api/notification';

module.exports.bindings = [
    { "method": "get", "route": route, "callback": get },
    { "method": "post", "route": route, "callback": post },
    { "method": "put", "route": route, "callback": put },
    { "method": "del", "route": route, "callback": del }
];
