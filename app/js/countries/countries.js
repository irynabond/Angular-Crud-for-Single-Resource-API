module.exports = function(app) {
  require('./controllers/countries_controller')(app);
  require('./directives/country_directive')(app);
  require('./directives/country_transclude_directive')(app);
};
