module.exports = function(mongoose) {
	
	var BookingSchema = new mongoose.Schema({
	  _id: {type: String},
	  _details: {
		  date_created: {type: String},
		  confirmed: {type: Boolean},
		  charged: {type: Boolean},
		  charge_token: {type: String}
	  },
	  booking_details: {
		  date_booked: {
			  date: {type: String},
			  time: {type: String}
		  },
		  attendees: {type: String},
		  total_price: {type: Number},
		  host_profit: {type: Number}
	  },
	  creator: {
		  type: String,
		  ref: 'User'
	  },
	  recipient: {
		  type: String,
		  ref: 'User'
	  },
	  experience: {
		  type: String,
		  ref: 'User'
	  }
  	});	
	
	return BookingSchema
	
}