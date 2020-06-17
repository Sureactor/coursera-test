(function(){
	angular.module('MenuApp')
	.service('MenuService',MenuService);

	MenuService.$inject = ['$q','$http'];
	function MenuService($q,$http){
		var service = this;

		service.list = [];
		service.getList = function(){

			var defer = $q.defer();
			service.response = $http({
				method:'GET',
				url:'https://davids-restaurant.herokuapp.com/categories.json'
			});
			console.log(service.response.data);
			defer.resolve(service.response);
			return defer.promise;
		}

		service.get = function(){
			var defer = $q.defer();
			defer.resolve(service.response);
			return defer.promise;
		}
	}
})();