rasm.controller('chartCategory',['$scope','$mdDialog',function($scope,$mdDialog){
	$scope.closeDialog = function(){
		$mdDialog.hide()
	}

	$scope.chartDetails = {};

	$scope.showBar = false;
	$scope.showPie = false;
	$scope.showType = true;
	$scope.barAdditional = false; 
	$scope.XAxsis = "Years"
    $scope.chngeBtn = true;

	$scope.next = function(){
		$scope.showAxsis = false;
	}
	$scope.changeBtn = function(){
		$scope.showAxsis = false;
	}
	$scope.changeChartTypes = function(chartType){
		switch(chartType){
			case 'barCharts':
				$scope.showBar = true;
				$scope.showPie = false;
				$scope.showType = false;
				$scope.chartDetails.type = "bar";
				break;
			case 'pieCharts':				
				$scope.showBar = false;
				$scope.showPie = true;
				$scope.showType = false;
				$scope.chartDetails.type = "pie";
				break;
			case 'lineCharts':
				$scope.showBar = true;
				$scope.showPie = false;
				$scope.showType = false;
				$scope.chartDetails.type = "line";
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
		$scope.chartDetails.scaleNum = $scope.yAxsis;
		$scope.chartDetails.XAxsis = $scope.XAxsis;
		$scope.chartDetails.XAxsisAddition = $scope.XAxsisAddition;
		console.log($scope.chartDetails)

	}

	$scope.barAll = function(){
		$scope.chartDetails.scale1 = $scope.Scale1
		$scope.chartDetails.scale2 = $scope.Scale2
		$scope.chartDetails.scale3 = $scope.Scale3
		$scope.chartDetails.district = $scope.District  
		$mdDialog.hide($scope.chartDetails);
	}
	$scope.pieAll = function(){        
		$scope.chartDetails.district = $scope.District 
		$scope.chartDetails.XAxsis = $scope.pieYear 
		$scope.chartDetails.pieScale = $scope.group1
		$mdDialog.hide($scope.chartDetails);
	}
	
}])