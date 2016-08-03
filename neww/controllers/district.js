rasm.controller("districtCtrl",["$scope","$state","$stateParams",function($scope,$state,$stateParams){ 

	$scope.area = [];
	$scope.area.push({
		 "id": $stateParams.districtID,
		 "color": "#264F7F" 
	})
	$scope.query = {
	    order: 'name',
	    limit: 5,
	    page: 1
	};

	$scope.CurrentWeather =[{          	
          	icon: "rain",
            iconSize: 100,
            color: "#7A7A7A"
    }];
    $scope.weatherCondition;
	function getDistrictByID(districtID){
		switch(districtID){
			case 'LK-71': 
				$scope.districtName = "Anuradhapura"; 
				break;
			case 'LK-61': 
				$scope.districtName = "Kurunegala";  
				break;
			default :
				console.log("invalid district Name ")

		}
		if(!$scope.$$phase) {
		 $scope.$apply()
		}
		getAll($scope.searchYear,$scope.searchMonth,$scope.districtName)
	}
	

	$scope.searchMonth = $stateParams.month;
	$scope.searchYear = $stateParams.year;
	getDistrictByID($stateParams.districtID)
	
	function loadMap(){
		AmCharts.makeChart( "mapdiv", {
		  "type": "map",
		  "dataProvider": {
		    "map": "sriLankaLow",
		    "getAreasFromMap": true,
		  	"areas" : $scope.area
		  },
		  "listeners": [{
		      "event": "clickMapObject",
		      "method": districtClick
		  }],
		   "areasSettings": {
				"autoZoom": false,
				"selectedColor": "#264F7F",
		        "selectable": true,
		        "color" : "#049b4d"
			},
		  "smallMap": {}
		} );
	}
	loadMap();

	function districtClick(event){

		getDistrictByID(event.mapObject.id)
		$scope.area = [];
		$scope.area.push({
			"id" : event.mapObject.id,
			"color": "#264F7F" 
		});
		loadMap();
	}
	function getAll(year,month,district){
		var xmlhttp = new XMLHttpRequest();
		var url = "http://localhost:3000/getAll";
		var param = {
			year: year,
			month : month, 
			district : district
		 }
		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { 
		    	$scope.allData = []
		    	$scope.weatherPieArr = [];
		        $scope.allData = JSON.parse(xmlhttp.responseText) 
		        console.log(xmlhttp.responseText)
		        if ($scope.allData && $scope.allData.length > 0) {			         
			        $scope.allData.forEach(x => $scope.weatherPieArr.push([x.type, parseFloat(x.Value)]))		        	
		        } 
		        $scope.weatherCondition =  $scope.allData[0].Value + "mm"
		        loadWeatherChart()
		    }
		    if(!$scope.$$phase) {
			 	$scope.$apply()
			}
		};
		xmlhttp.open("POST", url); 
		xmlhttp.setRequestHeader("content-type", "application/json;charset=UTF-8"); 
		xmlhttp.send(JSON.stringify(param));
	}
	$scope.weatherPieChrt = {
		"highchartsNG" : {}
	}
	$scope.disasterPieChrt = {
		"highchartsNG" : {}
	}
	function loadWeatherChart(){
		 $scope.weatherPieChrt.highchartsNG = {
        	options: {
                chart: { 
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false

                },
                title: {
                    text: "Weather Summary"
                },
                plotOptions: {
                    pie: {
		                dataLabels: {
		                    enabled: true,
		                    distance: -50,
		                    style: {
		                        fontWeight: 'bold',
		                        color: 'white',
		                        textShadow: '0px 1px 2px black'
		                    }
		                },
		                startAngle: -90,
		                endAngle: 90,
		                center: ['50%', '75%']
		            }
                }
            },
            series: [{
	            type: 'pie',
	            name: 'Weather Summary',
	            innerSize: '50%',
	            data:  $scope.weatherPieArr 
	        }], 
            loading: false
        } 


		 // $scope.weatherPieChrt.highchartsNG = {
   //      	options: {
   //              chart:  {
		 //            type: 'pie',
		 //            options3d: {
		 //                enabled: true,
		 //                alpha: 45
		 //            }
		 //        },
   //              title: {
   //                  text: "Weather Summary"
   //              },
   //              plotOptions: {
   //                  pie: {
		 //                innerSize: 100,
		 //                depth: 45
		 //            }
   //              }
   //          },
   //          series: [{ 
	  //           name: 'Weather Summary', 
	  //           data:  $scope.weatherPieArr 
	  //       }], 
   //          loading: false
   //      } 

        if(!$scope.$$phase) {
		 	$scope.$apply()
		}
	}

	
}])