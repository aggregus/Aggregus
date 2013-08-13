module.exports = function(app) {
 require('./home')(app);
 require('./about')(app);
 require('./experience')(app);
 require('./profile')(app);
 require('./privacy')(app);
 require('./refunds')(app);
 require('./terms')(app);
}