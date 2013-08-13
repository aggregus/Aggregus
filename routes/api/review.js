module.exports = function(app) {
	app.get('/api/review', function(req, res) {
		
		var review = req.query.review;

		review.hidden = false;

		Review.find(query, function(err,doc) {
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
	
	app.post('/api/review', function(req, res) {
		var review = req.body.review;
		
		var newReview = new Review(review);
		
		newReview.save(function(err) {
			if (err) {
				res.send(500)
				console.log(err)
			}
			else {
				res.send(200);
				//Email.reviewCreated(review);
			}
		});

	});
	
	app.put('/api/review', function(req, res) {
		var review = req.body.review;

		Review.update(
			{_id: review._id}, 
			{
				$set: review,
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
	
	app.delete('/api/review', function(req, res) {
		var review = req.body.review;

		Review.update(
			{_id: review._id}, 
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