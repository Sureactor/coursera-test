(function(){
	angular.module('MenuApp')
	.config(RoutesConfig);

	RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];
	function RoutesConfig($stateProvider,$urlRouterProvider){
		$urlRouterProvider.otherwise('/');
		$stateProvider
		.state('home',{
			url:'/',
			templateUrl:'/src/MenuApp/templates/home.html'
		})
		.state('Menu',
		{
			url:'/categories',
			templateUrl:'/src/MenuApp/templates/menu.html',
			controller:'MenuController as menu',
			resolve:{
				list:['MenuService',function(MenuService){
					return MenuService.getList();
				}]
			}
		})
		.state('items',
		{
			url:'/items/{ind}',
			templateUrl:'/src/MenuApp/templates/items.html',
			controller:'itemController as item',
			resolve:{
				list_item:['itemService','$stateParams','MenuService',function(itemService,$stateParams,MenuService){
					return MenuService.get()
					.then(function(items){
						return itemService.getList(items.data[$stateParams.ind].short_name);
					})
				}]
			}
		});
	}
})();