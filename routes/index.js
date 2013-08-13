module.exports = function(app) {
  app.set('userGuard', {password: 0, financial:0, contact: 0, _details: 0});
	
  require('./api')(app)
  require('./static')(app)
  require('./admin')(app)
}