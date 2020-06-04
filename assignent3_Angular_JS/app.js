(function(){

	angular
	.module('ShoppingApp',[])
	.controller('ShoppingController',shoppingController)
	.service('ShoppingControllerService', ShoppingControllerService)
	.directive('foundItems', FoundItems);

	function FoundItems(){
		var ddo = {
			templateUrl: 'foundItems.html',
			scope:{
				found: '<',
				onRemove: '&',
				title: '@',
				error:'<',
				look: '<'
			},
			controller : FoundItemsController,
			controllerAs : 's',
			bindToController : true
		};
		return ddo;
	}

	function FoundItemsController(){

	}

	shoppingController.$inject = ['ShoppingControllerService'];
	function shoppingController(ShoppingControllerService){
		var ctrl = this;
		ctrl.look = false;
		ctrl.search = "";
		ctrl.title='';
		ctrl.num = 0;
		ctrl.Recieve = function(){
			if(ctrl.search !== ''){
		var promise = ShoppingControllerService.getData(ctrl.num);
		promise.then(function(response){
			ctrl.look = false;
			ctrl.res = response.data;
			ctrl.num = 1;
		    

			ctrl.found = ShoppingControllerService.filter(ctrl.res,ctrl.search);
			if(ctrl.found.length === 0){
				ctrl.look = true;
				ctrl.title = '';
			}
			else{
			ctrl.title = 'Total '+ctrl.found.length+' menu items';
		
		    
		}
		    

		})
		.catch(function(error){
			console.log('Network error');
		});
	}
	else
	{
			ctrl.found = [];
			ctrl.look = true;
			ctrl.title = '';
	}

		
	}

	ctrl.remove = function(index){
		ctrl.found = ShoppingControllerService.remove(index);
		ctrl.title = 'Total '+ctrl.found.length+' menu items';
	}

	}

	ShoppingControllerService.$inject = ['$http'];
	function ShoppingControllerService($http){

		var service = this;
		service.found = [];
		service.resp = [];
		service.getData = function(val){
			if(val === 0){
		service.response = $http({
			method: 'GET',
			url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
		});
		console.log('here');
	}
		
		
		return service.response;
	}

	service.filter = function(data,search){
		var res = data;
		service.found = [];
		for(var i=0;i<res.menu_items.length;i++){
				if(
					(res.menu_items[i].description.toLowerCase().indexOf(search.toLowerCase()) !== -1)){
					var list = {
						name : res.menu_items[i].name,
						short_name : res.menu_items[i].short_name,
						description : res.menu_items[i].description
					};
					service.found.push(list);
				}
			}
			return service.found;
	}

	service.remove = function(index){
		service.found.splice(index,1);
		return service.found;
	}
	}
})();