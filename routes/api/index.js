module.exports = function(app) {
  require('./user')(app);
  require('./notification')(app);
  require('./experience')(app);
  require('./booking')(app);
  require('./message')(app);
  require('./review')(app);
  require('./heart')(app);
}