function get(req, res) {
		
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
	}
	
function post(req, res) {
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

	}
	
function put(req, res) {
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
	}
	
function del(req, res) {
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
		}

var route = '/api/message';

module.exports.bindings = [
    { "method": "get", "route": route, "callback": get },
    { "method": "post", "route": route, "callback": post },
    { "method": "put", "route": route, "callback": put },
    { "method": "del", "route": route, "callback": del }
];
