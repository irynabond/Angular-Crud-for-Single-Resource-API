require(__dirname + '/../../app/js/entry');
require('angular-mocks');

describe('country controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('CountryStreamApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = $ControllerConstructor('CountryController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.countries)).toBe(true);
  });

  describe('REST request functions', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('CountryController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should add an array to countries with a GET all', function() {
      $httpBackend.expectGET('/api/countries').respond(200, [{_id: 1, name: 'italy'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.countries[0].name).toBe('italy');
    });

    it('should be able to create a new country', function() {
      $httpBackend.expectPOST('/api/countries', {name: 'italy', description: 'Great', duration: "5 days"}).respond(200, {name: 'a different country'});
      expect($scope.countries.length).toBe(0);
      expect($scope.newCountry).toEqual($scope.defaults);      
      $scope.newCountry.name = 'italy';
      $scope.create($scope.newCountry);
      $httpBackend.flush();
      expect($scope.countries[0].name).toBe('italy');
      expect($scope.newCountry).toEqual($scope.defaults);
    });

    it('should make a delete request when destroy is called', function() {
      var country = {name: 'test', description: 'good', duration: 3, _id: 1};
      $scope.countries = [{name: 'second test', _id: 2}, country, {name: 'third test', _id: 3}];
      $httpBackend.expectDELETE('/api/countries/1').respond(200);
      $scope.destroy(country);
      $httpBackend.flush();
      expect($scope.countries.length).toBe(2);
      expect($scope.countries.indexOf(country)).toBe(-1);
      expect($scope.countries[0].name).toBe('second test');
      expect($scope.countries[1].name).toBe('third test');
    });
  });
});