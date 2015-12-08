var handlefail =  function (callback) {
	return function (res) {
		callback (null, res.data)
	}
}
	mmodule.exports = function (app) {
	app.factory('cfResource', ['$http', function ($http) {
		return function (resourceName) {
			return {
				getAll: function (callback) {
					$http.get('/api/' + resourceName)
					.then(function(res) {
						callback (null, res.data);
					}, function (res) {
						console.log(res);
						callback(res.data);
					})
				}
			}
		}
	}])
}