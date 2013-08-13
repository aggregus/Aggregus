module.exports = function(mongoose) {
	
	var MessageSchema = new mongoose.Schema({
	  _id: {type: String},
	  _details: {
		  dateCreated: {type: String}
	  },
	  creator: {
		  type: String,
		  ref: 'User'
	  },
	  recipient: {
		  type: String,
		  ref: 'User'
	  },
	  content: {
		  subject: {type: String},
		  message: {type: String}
	  }
  	});	
	
	return MessageSchema
	
}