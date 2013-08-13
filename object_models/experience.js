module.exports = function(mongoose) {
	
	var ExperienceSchema = new mongoose.Schema({
	  _id: {type: String},
	  _details: {
		  date_created: {type: String},
		  approved: {type: Boolean},
	  },
	  name: {type: String},
	  description: {type: String},
	  guest_instructions: {type: String},
	  experience_details: {
	  	attendees: {
			max_total: {type: Number},
			min_total: {type: Number},
			max_booking: {type: Number},
			min_booking: {type: Number}
		},
		dates: {
			abs_yes: {type: Array},
			abs_no: {type: Array}
		},
		times: {type: Array},
		restrict_dates: {type: Boolean},
		permit_mixed: {type: Boolean},
		duration: {type: Number},
	  },
	  photos: {
		  cover: {type: String},
		  profile: {type: String},
		  gallery: {type: String}
	  },
	  creator: {
		  type: String, 
		  ref: 'User'
	  },
	  location: {
		  normal: {
			formatted_address: {type: String},
			city: {type: String},
			postal_code: {type: Number},
			county: {type: String},
			country: {type: String}  
		  },
		  lat: {type: Number},
		  lng: {type: Number}
	  },
	  price: {type: Number},
  	});	
	
	return ExperienceSchema
	
}