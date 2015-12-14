module.exports = function(app) {
  app.directive('countryDirective', function() {
    return {
      restrict: 'AC',
      templateUrl: '/templates/country_directive_template.html',
      scope: {
        country: '=',
      }
    }
  });
};