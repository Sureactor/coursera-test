(function(){
	angular.module('ShoppingApp',[])
	.controller('ToBuyController',ListController)
	.controller('AlreadyBoughtController',Bought)
	.service('ShoppingListCheckOffService',AddItems);

	Bought.$inject = ['ShoppingListCheckOffService'];
	function Bought(ShoppingListCheckOffService){
		var b = this;
		b.list = [];
		b.show = function(){
			b.list = ShoppingListCheckOffService.bou();
		}
		b.check = function(){
			b.list = ShoppingListCheckOffService.bou();
			if(b.list.length === 0){
				return true;
			}
			else {
				return false;
			}
		}
	}


	ListController.$inject = ['ShoppingListCheckOffService'];
	function ListController(ShoppingListCheckOffService){
		console.log("hi");
		var shop = this;
		shop.item = "";
		shop.quantity = "";
		shop.list = [{
			name:'cookie',
			quantity:'5'
		},{
			name:'biscuit',
			quantity:'6'
		},{
			name:'sandwitch',
			quantity:'2'
		},{
			name:'noodles',
			quantity:'2'
		},{
			name:'soup',
			quantity:'2'
		}];
		shop.add = function(){
			ShoppingListCheckOffService.add(shop.item,shop.quantity);
			shop.list = ShoppingListCheckOffService.show();
		}
		shop.bought = function(index){
			ShoppingListCheckOffService.bought(index);
		}
		shop.check = function(){
			shop.list = ShoppingListCheckOffService.show();
			if(shop.list.length === 0){
				return true;
			}
			else{
				return false;
			}
		}
	}

	function AddItems(){
		var service = this;
		var items = [{
			name:'cookie',
			quantity:'5'
		},{
			name:'biscuit',
			quantity:'6'
		},{
			name:'sandwitch',
			quantity:'2'
		},{
			name:'noodles',
			quantity:'2'
		},{
			name:'soup',
			quantity:'2'
		}];
		var boughtItems = [];
		service.add = function(item,quantity){
			var lis = {
				name : item,
				quantity : quantity
			};
			items.push(lis);
		}

		service.show = function(){
			return items;
		}
		service.bought = function(index){
			boughtItems.push(items[index]);
			console.log(boughtItems[0].name+" "+boughtItems[0].quantity);
			items.splice(index,1);

		}
		service.bou = function(){
			return boughtItems;
		}
	}
})();