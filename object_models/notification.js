module.exports = function(mongoose) {
	
	var NotificationSchema = new mongoose.Schema({
	  _id: {type: String},
	  _details: {
		  date_created: {type: String},
		  type: {type: String}
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
		  ref: 'Experience'
	  },
	  booking: {
		  type: String,
		  ref: 'Booking'
	  },
	  message: {
		  type: String,
		  ref: 'Message'
	  },
	  heart: {
		  type: String,
		  ref: 'Heart'
	  },
  	});
	
	return NotificationSchema
	
}