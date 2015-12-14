require('angular/angular');
require('angular-route');
var angular = window.angular;
var countryStreamApp = angular.module('CountryStreamApp', ['ngRoute']);

require('./filters/filters')(countryStreamApp);
require('./services/services')(countryStreamApp);
require('./directives/directives')(countryStreamApp);
require('./countries/countries')(countryStreamApp);

countryStreamApp.config(['$routeProvider', function($route) {
  $route
    .when('/countries', {
      templateUrl: '/templates/countries_view.html',
      controller: 'CountryController'
    })
    .otherwise({
      redirectTo: '/countries'
    })
}]);