module.exports = function(app) {
  app.directive('countryFormDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: 'templates/country_form_template.html',
      transclude: true,
      scope: {
        buttonText: '@',
        formName: '@',
        country: '=',
        save: '&'
      }    
    }
  });
};