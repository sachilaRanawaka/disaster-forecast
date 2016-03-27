rasm.controller('mainCtrl',['$scope', '$state','$http','$mdSidenav', function($scope,$state,$http,$mdSidenav){
	
	$scope.isSidenavOpen = false;
	$scope.showSrilankaMap = true;


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


	AmCharts.makeChart( "mapdiv", {
	  "type": "map",
	  "dataProvider": {
	    "map": "sriLankaLow",
	    "getAreasFromMap": true
	  },
	  "listeners": [{
	      "event": "clickMapObject",
	      "method": districtClick
	  }],
	   "areasSettings": {
			"autoZoom": false,
			"selectedColor": "#CC0000",
	        "selectable": true
		},
	  "smallMap": {}
	} );

	function districtClick(event){
		console.log(event.mapObject.title)
		$scope.redirectToDistrict(event.mapObject.title)
	}

	$scope.redirectToDistrict = function(title){
		switch(title){
			case 'Anuradhapura':
				$scope.showSrilankaMap = false;
				$scope.showDistrict = true;
				$scope.districtName = title + '.svg';
				break;
			default :
				console.log("invalid district Name ")

		}
		$scope.$apply()
	}

}])