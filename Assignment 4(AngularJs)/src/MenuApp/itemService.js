(function(){
	angular.module('MenuApp')
	.service('itemService',itemService);

	itemService.$inject = ['$q','$http'];
	function itemService($q,$http){
		var service = this;

		service.list = [];
		service.response;

		service.getList = function(shortName){

			var defer = $q.defer();
			console.log('here'+shortName);
			service.response = $http({
				method:'GET',
				url:'https://davids-restaurant.herokuapp.com/menu_items.json',
				params:{
					category:shortName
				}
			});
			console.log(service.response.data);
			defer.resolve(service.response);
			return defer.promise;
		}


	}
})();