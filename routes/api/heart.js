function get(req, res) {
		
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
	}
	
function post(req, res) {
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

	}
	
function put(req, res) {
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
	}
	
function del(req, res) {
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
		}

var route = '/api/heart';

module.exports.bindings = [
    { "method": "get", "route": route, "callback": get },
    { "method": "post", "route": route, "callback": post },
    { "method": "put", "route": route, "callback": put },
    { "method": "del", "route": route, "callback": del }
];
