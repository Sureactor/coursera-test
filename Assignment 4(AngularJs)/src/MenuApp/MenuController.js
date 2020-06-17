(function(){
	angular.module('MenuApp')
	.controller('MenuController',MenuController);

	MenuController.$inject = ['MenuService','list'];
	function MenuController(MenuService,list){
		var menu = this;

		menu.list = list.data;
		console.log(menu.list[0]);
	}
})();