var angular = window.angular;
module.exports = function(app) {
  app.controller('CountryController', ['$scope', '$http', function($scope, $http) {
    $scope.countries = [];
    $scope.errors = [];
    $scope.defaults = {};
    $scope.updatingCountries = {};
    $scope.newCountry = angular.copy($scope.defaults);

    $scope.getAll = function() {
      $http.get('/api/countries')
        .then(function(res) {
          $scope.countries = res.data;
        }, function(err) {
          console.log(err.data);
        });
    };

    $scope.create = function(country) {
      $http.post('/api/countries', country)
        .then(function(res) {
          $scope.countries.push(res.data);
          $scope.newCountry = angular.copy($scope.defaults);
        }, function(err) {
          console.log(err.data)
        });
    };

    $scope.update = function(country) {
      country.editing = false;
      $http.put('/api/countries/' + country._id, country)
        .then(function(res) {
          console.log('The country is updated');
        }, function(err) {
          $scope.errors.push('could not get country: ' + country.name);
          console.log(err.data);
        });
    };

    $scope.remove = function(country) {
      $scope.countries.splice($scope.countries.indexOf(country), 1);
      $http.delete('/api/countries/' + country._id)
        .then(function(res) {
          console.log('Country removed');
        }, function(err) {
          console.log(err.data);
          $scope.errors.push('could not remove country: ' + country.name);
          $scope.getAll();
        });
    };

    $scope.startUpdate = function(country) {
      country.editing = true;
      $scope.updatingCountries[country._id] = {name: country.name, description: country.description, duration: country.duration};
    };
    $scope.cancel = function(country) {
      var oldCountry = $scope.updatingCountries[country._id];
      country.name = oldCountry.name;
      country.description = oldCountry.description;
      country.duration = oldCountry.duration;
      country.editing = false;
    };
  }]);
};
