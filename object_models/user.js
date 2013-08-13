module.exports = function(mongoose) {

	UserSchema = new mongoose.Schema({
	  _id: {type: String},
	  _details: {
		  date_created: {type: String},
		  type: {type: String},
		  terms_agree: {type: Boolean},
		  email_confirm: {type: Boolean},
		  deleted: {type: Boolean},
		  password_reset: {type: Boolean}
	  },
	  name: {
		  first: {type: String},
		  middle: {type: String},
		  last: {type: String},
		  business_name: {type: String}
	  },
	  password: {type: String},
	  description: {type: String},
	  photos: {
		  cover: {type: String},
		  profile: {type: String},
		  gallery: {type: String}
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
	  contact: {
		  email: {type: String},
		  phone: {type: Number},
		  address: {
			  street: {
				  one: {type: String},
				  two: {type: String}
			  },
			  city: {type: String},
			  state: {type: String},
			  zip: {type: Number}
		 }
	  },
	  social: {
		  facebook: {
			  id: {type: Number},
			  username: {type: String}
		  },
		  twitter: {
			  id: {type: Number},
			  username: {type: String}
		  },
		  pinterest: {
			  id: {type: Number},
			  username: {type: String}
		  }
	  },
	  financial: {
		  bank_account: {type: Object},
		  balance_owed: {type: Object}
	  }
  	});
	
	return UserSchema
}