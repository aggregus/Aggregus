// load secrets
var secrets = require('./secrets.js')('dev');

// Load central dependencies

express = require('express');
stylus = require('stylus');
crypto = require('crypto');
jade = require('jade');
mongoose = require('mongoose');
mandrill = require('node-mandrill')(secrets.mandrill_api_key);
MemoryStore = require('connect').session.MemoryStore;
fs = require('fs');
querystring = require('querystring');
_ = require('underscore');
util = require('util');

// Configure Stripe

stripe = require('./manual_modules/stripe')(secrets.stripe_api_key);
	
// Mongoose Connection

var db = mongoose.connection;

db.on('disconnected', function() {
	mongoose.connect(secrets.dbURI, {server:{auto_reconnect:true}});
});

db.on('error', function(error) {
  console.error('Error in MongoDb connection: ' + error);
  mongoose.disconnect();
});

mongoose.connect(secrets.dbURI, {server:{auto_reconnect:true}});

// Hello there, gorgeous.

app = express();

// Tell our Express app how to handle itself

app
  .set('view engine', jade)
  .use(stylus.middleware({
   src: __dirname + '/www',
   compile: function(str, path) {
	return stylus(str)
	  .set('filename', path)
	  .set('compress', false)
	  .set('warn', true);
   }
  }))
  .use(express.compress())
  .use(express.bodyParser())
  .use(express.cookieParser())
	.use(express.cookieSession({
		secret: secrets.session_salt,
		cookie: {path:'/', httpOnly: true, maxAge: 2*60*60*1000}
	}))
  .use(app.router)
  .use(express.static(__dirname + '/www'));

app.configure('production', function() {
	app.use(function (req, res, next) {
	  res.setHeader('Strict-Transport-Security', 'max-age=8640000; includeSubDomains');
	
	  if (req.headers['x-forwarded-proto'] !== 'https') {
		return res.redirect(301, 'https://' + req.headers.host + '/');
	  }
	
	  next();
	});
});

app.get('/api', function(req, res) {
	res.send('HAHA');
});

// Email Module

Email = require('./object_models/email')(mandrill);

// Mongoose Models

User = mongoose.model('User', require('./object_models/user')(mongoose));
Experience = mongoose.model('Experience', require('./object_models/experience')(mongoose));
Booking = mongoose.model('Booking', require('./object_models/booking')(mongoose));
Notification = mongoose.model('Notification', require('./object_models/notification')(mongoose));
Message = mongoose.model('Message', require('./object_models/message')(mongoose));
Heart = mongoose.model('Heart', require('./object_models/heart')(mongoose));
Review = mongoose.model('Review', require('./object_models/review')(mongoose));

// Routing Modules

require('./routes')(app);

//require('./routes/static')(app, crypto, User, Notifications, Experience, Booking, Review, Heart, Message, email);

// "LISTEN!"

app.listen(8080);

