rasm.controller("districtCtrl",["$scope","$state","$stateParams",function($scope,$state,$stateParams){ 


	switch($stateParams.districtID){
		case 'Anuradhapura':
			$scope.showSrilankaMap = false;
			$scope.showDistrict = true;
			$scope.districtName = $stateParams.districtID + '.svg';
			break;
		default :
			console.log("invalid district Name ")

	}

	$scope.searchMonth = $stateParams.month;
	$scope.searchYear = $stateParams.year;
}])