require('angular/angular');
var angular = window.angular;
var countryStreamApp = angular.module('CountryStreamApp', []);
require('./countries/countries')(countryStreamApp);