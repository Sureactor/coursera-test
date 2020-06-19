(function () {
	angular.module('MenuApp')
	.controller('itemController',itemController);

	itemController.$inject = ['list_item','name']
	function itemController(list_item,name){
		var item = this;
		item.name = name;
		console.log(name);
		item.list = list_item.data.menu_items;
		console.log(item.list);
	}
})();