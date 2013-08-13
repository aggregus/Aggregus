module.exports = function(app) {
  app.get('/', function(req, res) {
	  res.render('../views/static/home.jade');	
  })
}