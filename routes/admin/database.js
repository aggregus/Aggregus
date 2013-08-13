module.exports = function(app) {
	app.get('/admin/database/updateSchema/user', function(req, res) {
		
		User.find({}, function(err, doc) {
		
			_.each(doc, function( user ) {
						var newUser = {
							'_id': user._doc.name.first.replace(/\s+/g, '') + user._doc.name.last.replace(/\s+/g, '') + Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 1000),
							'_details': {
								date_created: user._doc.dateSignup ? user._doc.dateSignup : null,
								type: 'individual',
								terms_agree: true,
								email_confirm: true,
								deleted: false,
								password_reset: false
							},
							'name': {
								first: user._doc.name.first,
								middle: null,
								last: user._doc.name.last,
								business_name: null
							},
							'password': user._doc.password,
							'description': user.description,
							'photos': {
								cover: user._doc.coverimg,
								profile: user._doc.profileimg,
								gallery: user._doc.photoURL ? user._doc.photoURL : null
							},
							'location': {
								normal: {
								  formatted_address: user._doc.location.normal,
								  city: null,
								  postal_code: null,
								  county: null,
								  country: null  
								},
								lat: user._doc.location.lat,
								lng: user._doc.location.lng
							},
							'contact': {
								email: user._doc.email,
								phone: null,
								address: {
									street: {
										one: null,
										two: null
									},
									city: null,
									state: null,
									zip: null
							   }
							},
							'social': {
								facebook: {
									id: user._doc.fbid ? user._doc.fbid : null,
									username: user._doc.social.facebook ? user._doc.social.facebook : null
								},
								twitter: {
									id: null,
									username: user._doc.social.twitter ? user._doc.social.twitter : null
								},
								pinterest: {
									id: null,
									username: user._doc.social.pinterest ? user._doc.social.pinterest : null
								}
							},
							'financial': {
								bank_account: user._doc.bankacct ? user._doc.bankacct : null,
								balance_owed: user._doc.balanceOwed ? user._doc.balanceOwed : null
							}
						}
	
						User.remove({email: user._doc.email}, function() {
							console.log("Pow!");
						});
						
						var userUp = new User(newUser);
						
						userUp.save();
			});
			
			res.send(200, doc);
		});
	});
	
app.get('/admin/database/updateSchema/experience', function(req, res) {
		
		Experience.find({}, function(err, doc) {
			
			_.each(doc, function( experience ) {
						var newExperience = {
						  _id: 'experience.' + Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 1000),
						  _details: {
							  date_created: experience._doc.dateCreated,
							  approved: true,
						  },
						  name: experience._doc.name,
						  description: experience._doc.description,
						  guest_instructions: experience._doc.guestInstructions,
						  experience_details: {
							attendees: {
								max_total: null,
								min_total: null,
								max_booking: experience._doc.attendees.maximum,
								min_booking: experience._doc.attendees.minimum
							},
							dates: {
								abs_yes: experience._doc.dates.absyes,
								abs_no: experience._doc.dates.absno
							},
							times: experience._doc.times,
							restrict_dates: experience._doc.restrictDates,
							permit_mixed: experience._doc.permitMixed,
							duration: experience._doc.duration,
						  },
						  photos: {
							  cover: experience._doc.coverimg,
							  profile: experience._doc.profileimg,
							  gallery: experience._doc.photoURL
						  },
						  creator: {
							  type: String, 
							  ref: 'User'
						  },
						  location: {
							  normal: {
								formatted_address: experience._doc.location.normal,
								city: null,
								postal_code: null,
								county: null,
								country: null 
							  },
							  lat: experience._doc.location.lat,
							  lng: experience._doc.location.lng
						  },
						  price: experience._doc.price,
						}
	
						Experience.remove({name: experience._doc.name}, function() {
							console.log("Pow!");
						});
						
						var xpUp = new Experience(newExperience);
						
						xpUp.save();
					});
			res.send(200, doc);
		});
	});
	
app.get('/admin/database/demo', function(req, res) {
	Experience.find({}).populate('creator', {financial: 0, password: 0}).exec(function(err, experience) {
		console.log(experience);
		res.send(200, "ducks");
	});
});
}