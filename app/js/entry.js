require('angular/angular');
var angular = window.angular;
var countryStreamApp = angular.module('CountryStreamApp', []);
require('./filters/filters')(countryStreamApp);
require('./services/services')(countryStreamApp);
require('./directives/directives')(countryStreamApp);
require('./countries/countries')(countryStreamApp);