(function(){
	angular.module('Lunch',[])
	.controller('Count',Count);
	Count.$inject = ['$scope'];
	function Count($scope){
		$scope.foods = "";
		$scope.msg = "";
		$scope.mesColor = "";
		$scope.Check = function (){
			var num = count_num($scope.foods);
			if($scope.foods === ""){
				$scope.msg = "Please enter data first!"
				$scope.mesColor = 'red';
			}
			else if (num<=3){
				$scope.msg = "Enjoy!";
				$scope.mesColor = 'green';
			}
			else {
				$scope.msg = "Too Much!";
				$scope.mesColor = 'green';
			}
		}
		function count_num(string){
			var num = string.split(',');
			
			var count = 0;
			for (var i=0;i<num.length;i++){
				if(num[i].trim() === ""){
					console.log(num[i].trim())
					continue;
				}
				count += 1;
			}
			return count;
		}
	};
})();