(function () {
	angular.module('MenuApp')
	.controller('itemController',itemController);

	itemController.$inject = ['list_item']
	function itemController(list_item){
		var item = this;
		item.list = list_item.data.menu_items;
		console.log(item.list);
	}
})();