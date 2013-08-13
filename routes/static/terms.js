module.exports = function(app) {
  app.get('/terms', function(req, res) {
	  res.render('./views/static/terms.jade');	
  })
}