rasm.controller('homeCtrl',['$scope', '$state','$http','$mdDialog', function($scope,$state,$http,$mdDialog){

	$scope.showSearch = false;
	 
	$scope.menuItems = [{
		name : "dashboard",
		icon : "img/ic_dashboard_24px.svg",
		state : 'home.dashboard'
	},{
		name : "maps",
		icon : "img/ic_dashboard_24px.svg",
		state : 'home.maps'
	},{
		name : "About Us",
		icon : "img/ic_dashboard_24px.svg",
		state : 'home.aboutUs'
	}]

	$scope.callPython = function(){
	 	$http({
	 		url : "myPython.py",
	 		method : "POST",
	 		data: {foo: 'bar', bar: 'foo'}
	 	}).then(function(response){ 
	 		alert(response.data)
	 	},function(response){
	 		alert(response)
	 	})
	}

  	$scope.highchartsNG = {
        options: {
            chart: {
                type: 'line'
            }
        },
        series: [{
            data: [10, 15, 12, 8, 7]
        }],
        title: {
            text: 'Pie Chart'
        },
        loading: false
    }

    $scope.toggleRightSidebar = function(){
    	$mdDialog.show({
            templateUrl: 'partials/chartTypeDIalog.html',
            controller: 'chartCategory'
        })
    }

	AmCharts.makeChart( "mapdiv", {
	  /**
	   * this tells amCharts it's a map
	   */
	  "type": "map",

	  /**
	   * create data provider object
	   * map property is usually the same as the name of the map file.
	   * getAreasFromMap indicates that amMap should read all the areas available
	   * in the map data and treat them as they are included in your data provider.
	   * in case you don't set it to true, all the areas except listed in data
	   * provider will be treated as unlisted.
	   */
	  "dataProvider": {
	    "map": "sriLankaLow",
	    "getAreasFromMap": true
	  },
	  "listeners": [{
	      "event": "clickMapObject",
	      "method": districtClick
	  }],

	  /** 
	   * create areas settings
	   * autoZoom set to true means that the map will zoom-in when clicked on the area
	   * selectedColor indicates color of the clicked area.
	   */ 
	   "areasSettings": {
			"autoZoom": false,
			"selectedColor": "#CC0000",
	        "selectable": true
		},

	  /**
	   * let's say we want a small map to be displayed, so let's create it
	   */
	  "smallMap": {}
	} );

	function districtClick(event){
		console.log(event)
	}

}])