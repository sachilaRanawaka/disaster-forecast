rasm.controller('mainCtrl',['$scope', '$state','$http','$mdSidenav', function($scope,$state,$http,$mdSidenav){
	
	$scope.isSidenavOpen = false;
	$scope.wetherConditions = [{
		name : 'Rainfall',
		checkbox : false,
		icon : 'img/rain.svg' // only 24px works
	},{
		name : 'Temparature',
		checkbox : false,
		icon : 'img/temperature.svg'
	},{
		name : 'Wind',
		checkbox : false,
		icon : 'img/wind.svg'
	},{
		name : 'Humidity',
		checkbox : false,
		icon : 'img/humidity.svg'
	},{
		name : 'All',
		checkbox : true,
		icon : 'img/rain.svg'
	}]

	$scope.openLeftMenu = function() {
	    $mdSidenav('left').toggle();
	};

	$scope.moveToDashboard = function(){
		$state.go('loader')
	}

}])