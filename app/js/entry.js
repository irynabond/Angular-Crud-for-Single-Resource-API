require('angular/angular');
var angular = window.angular;
var countryStreamApp = angular.module('CountryStreamApp', []);
require('./services/services')(countryStreamApp);
require('./countries/countries')(countryStreamApp);