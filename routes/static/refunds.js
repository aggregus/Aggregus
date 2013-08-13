module.exports = function(app) {
  app.get('/refunds', function(req, res) {
	  res.render('./views/static/refunds.jade');	
  })
}