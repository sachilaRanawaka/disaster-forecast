rasm.controller('chartCategory',['$scope','$mdDialog',function($scope,$mdDialog){
	$scope.closeDialog = function(){
		$mdDialog.hide()
	}
	$scope.showBar = false;
	$scope.showPie = false;
	$scope.showType = true;
	$scope.barAdditional = false;

	$scope.next = function(){
		$scope.showAxsis = false;
	}
	$scope.changeChartTypes = function(chartType){
		switch(chartType){
			case 'barCharts':
				$scope.showBar = true;
				$scope.showPie = false;
				$scope.showType = false;
				break;
			case 'pieCharts':				
				$scope.showBar = false;
				$scope.showPie = true;
				$scope.showType = false;
				break;
			default :
				console.log('invalid type')
		}
	}

	$scope.barAddition = function(){
		$scope.showBar = false;
		$scope.showPie = false;
		$scope.showType = false;
		$scope.barAdditional = true;
	}
}])