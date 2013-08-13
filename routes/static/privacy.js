module.exports = function(app) {
  app.get('/privacy', function(req, res) {
	  res.render('./views/static/privacy.jade');	
  })
}