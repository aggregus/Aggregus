module.exports = function(app) {
	app.get('/api/booking', function(req, res) {
		
		var booking = req.query.booking;

		booking.hidden = false;

		Booking.find(query, function(err,doc) {
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
	
	app.post('/api/booking', function(req, res) {
		var booking = req.body.booking;
		
		var newBooking = new Booking(booking);
		
		newBooking.save(function(err) {
			if (err) {
				res.send(500)
				console.log(err)
			}
			else {
				res.send(200);
				Email.bookingCreate(booking);
				Email.bookingReceived(booking);
			}
		});

	});
	
	app.put('/api/booking', function(req, res) {
		var booking = req.body.booking;

		Booking.update(
			{_id: booking._id}, 
			{
				$set: booking,
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
	
	app.delete('/api/booking', function(req, res) {
		var booking = req.body.booking;

		Booking.update(
			{_id: booking._id}, 
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