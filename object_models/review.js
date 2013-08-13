module.exports = function(mongoose) {
	
	var ReviewSchema = new mongoose.Schema({
	  _id: {type: String},
	  _details: {
		  date_created: {type: String},
		  approved: {type: String},
		  type: {type: String}
	  },
	  creator: {
		  type: String, 
		  ref: 'User'
	  },
	  recipient: {
		  experience: {
			type: String, 
			ref: 'Experience'
		  },
		  host: {
			type: String, 
			ref: 'User'
		  },
		  guest: {
			type: String, 
			ref: 'User'
		  }
	  },
	  content: {
		 rating: {type: Number},
		 description: {type: String}
	  }
  	});	
	
	return ReviewSchema
	  
	
}