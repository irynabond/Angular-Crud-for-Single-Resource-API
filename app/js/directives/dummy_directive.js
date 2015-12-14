module.exports = function(app) {
  app.directive('dummyDirective', function() {
    return {
      restrict: 'AC',
      template: '<h1>Hello {{greeting}}! Discover the country you want to visit! </h1><input type="text" data-ng-model="greeting">',
      scope: {
        greeting: '@'
      }
    }
  });
};