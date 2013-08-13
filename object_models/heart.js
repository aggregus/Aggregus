module.exports = function(mongoose) {
	
	var HeartSchema = new mongoose.Schema({
	  _id: {type: String},
	  _details: {
		  date_created: {type: String}
	  },
	  creator: {
		  type: String,
		  ref: 'User'
	  },
	  experience: {
		  type: String,
		  ref: 'Experience'
	  }
  	});	
	
	return HeartSchema
	
}