module.exports = function(app) {
  app.directive('countryTranscludeDirective', function() {
    return {
      restrict: 'AC',
      templateUrl: '/templates/country_transclude_directive.html',
      transclude: true,
      scope: {
        messageOne: '@'
      }
    }
  });
};