function get(req, res) {
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
            res.send(404);
        }
    });
}
    
function post(req, res) {
    var booking = req.body.booking;
    
    var newBooking = new Booking(booking);
    
    newBooking.save(function(err) {
        if (err) {
            res.send(500);
            console.log(err);
        }
        else {
            res.send(200);
            Email.bookingCreate(booking);
            Email.bookingReceived(booking);
        }
    });

}
    
function put(req, res) {
    var booking = req.body.booking;

    Booking.update(
        {_id: booking._id}, 
        {
            $set: booking
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
                res.send(404);
            }
        });
}
    
function del(req, res) {
    var booking = req.body.booking;

    Booking.update(
        {_id: booking._id}, 
        {
            $set: {
                hidden: true
            }
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

var route = '/api/booking';

module.exports.bindings = [
    { "method": "get", "route": route, "callback": get },
    { "method": "post", "route": route, "callback": post },
    { "method": "put", "route": route, "callback": put },
    { "method": "del", "route": route, "callback": del }
];
