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
		var districtName = "";
		switch(districtID){
			case 'LK-71': 
				$scope.districtName = "Anuradhapura"; 
				districtName = "Anuradhapura";
				break;
			case 'LK-61': 
				$scope.districtName = "Kurunegala";  				
				districtName = "Kurunegala";
				break;
			case 'LK-11': 
				$scope.districtName = "Colombo";  				
				districtName = "Colombo";
				break;
			case 'LK-12': 
				$scope.districtName = "Gampaha";  				
				districtName = "Colombo";
				break;
			case 'LK-13': 
				$scope.districtName = "Kalutara";  				
				districtName = "Colombo";
				break;
			case 'LK-21': 
				$scope.districtName = "Mahanuvara";  				
				districtName = "Katugastota";
				break;
			case 'LK-22': 
				$scope.districtName = "Matale";  				
				districtName = "Katugastota";
				break;
			case 'LK-31': 
				$scope.districtName = "Galle";  				
				districtName = "Galle";
				break;
			case 'LK-32': 
				$scope.districtName = "Matara";  				
				districtName = "Hambantota";
				break;
			case 'LK-33': 
				$scope.districtName = "Hambantota";  				
				districtName = "Hambantota";
				break;
			case 'LK-41': 
				$scope.districtName = "Jaffna";  				
				districtName = "Jaffna";
				break;
			case 'LK-42': 
				$scope.districtName = "Kilinochchi";  				
				districtName = "Jaffna";
				break;
			case 'LK-43': 
				$scope.districtName = "Mannar";  				
				districtName = "Mannar";
				break;
			case 'LK-44': 
				$scope.districtName = "Vavuniya";  				
				districtName = "Vavuniya";
				break;
			case 'LK-45': 
				$scope.districtName = "Mullaitivu";  				
				districtName = "Vavuniya";
				break;
			case 'LK-51': 
				$scope.districtName = "Batticaloa";  				
				districtName = "Batticaloa";
				break;
			case 'LK-52': 
				$scope.districtName = "Ampara";  				
				districtName = "Monaragala";
				break;
			case 'LK-82': 
				$scope.districtName = "Batticaloa";  				
				districtName = "Monaragala";
				break;
			case 'LK-53': 
				$scope.districtName = "Trincomalee";  				
				districtName = "Trincomalee";
				break; 
			case 'LK-62': 
				$scope.districtName = "Puttalama";  				
				districtName = "Puttalama";
				break;
			case 'LK-72': 
				$scope.districtName = "Polonnaruwa";  				
				districtName = "Polonnaruwa";
				break;
			case 'LK-81': 
				$scope.districtName = "Badulla";  				
				districtName = "Badulla";
				break;
			case 'LK-91': 
				$scope.districtName = "Ratnapura";  				
				districtName = "Ratnapura";
				break;
			case 'LK-92': 
				$scope.districtName = "Kegalle";  				
				districtName = "Ratnapura";
				break;
			case 'LK-23': 
				$scope.districtName = "Nuwara Eliya";  				
				districtName = "NuwaraEliya";
				break;
			default :
				console.log("invalid district Name ")

		}
		if(!$scope.$$phase) {
		 $scope.$apply()
		}
		getAll($scope.searchYear,$scope.searchMonth,districtName)
	}
	

	$scope.searchMonth = $stateParams.month;
	$scope.searchYear = $stateParams.year;
	getDistrictByID($stateParams.districtID)

	$scope.filterCondition = function(){
		getDistrictByID($scope.districtID)
	}
	
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
		$scope.districtID = event.mapObject.id
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
		        	calculateConditions();	        	
		        } 
		        console.log($scope.allData)
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
	function calculateConditions(){
		var rainfallValue,tempValue,windValue,humidityVal;

		for(i=0; i<= $scope.allData.length -1; i++){
			if ($scope.allData[i].type == "Rainfall") {
				if ($scope.allData[i].Value == "")
					rainfallValue = 0;
				else
					rainfallValue = parseFloat($scope.allData[i].Value)
			}
			else if ($scope.allData[i].type == "Temparature") {
				if ($scope.allData[i].Value == "")
					tempValue = 0;
				else
					tempValue = parseFloat($scope.allData[i].Value)
			}
			else if ($scope.allData[i].type == "Wind") {
				if ($scope.allData[i].Value == "")
					windValue = 0;
				else
					windValue = parseFloat($scope.allData[i].Value) 
			}
			else if ($scope.allData[i].type == "Humidity") {
				if ($scope.allData[i].Value == "")
					humidityVal = 0;
				else
					humidityVal = parseFloat($scope.allData[i].Value) 
			}
		}

		if (rainfallValue > 300) {
			$scope.CurrentWeather =[{          	
	          	icon: "rain",
	            iconSize: 100,
	            color: "#7A7A7A"
		    }];
		    $scope.weatherCondition = rainfallValue.toFixed(2) + " mm"
		    $scope.weatherType = "Rainy"
		    $scope.accuracyLevel = 68;
		}else if(tempValue > 33){			
			$scope.CurrentWeather =[{          	
	          	icon: "clear-day",
	            iconSize: 100,
	            color: "#7A7A7A"
		    }];
		    $scope.weatherCondition = tempValue.toFixed(2) + " C"
		    $scope.weatherType = "Hot"
		    $scope.accuracyLevel = 78;
		}else if(humidityVal > 85){			
			$scope.CurrentWeather =[{          	
	          	icon: "cloudy",
	            iconSize: 100,
	            color: "#7A7A7A"
		    }];
		    $scope.weatherCondition = humidityVal.toFixed(2) + " gm/ml 3"
		    $scope.weatherType = "Cool"
		    $scope.accuracyLevel = 75;
		}else if(windValue > 10){			
			$scope.CurrentWeather =[{          	
	          	icon: "wind",
	            iconSize: 100,
	            color: "#7A7A7A"
		    }];
		    $scope.weatherCondition = windValue.toFixed(2) + " mph"
		    $scope.weatherType = "Windy"
		    $scope.accuracyLevel = 77;
		}else if (rainfallValue > 200) {
			$scope.CurrentWeather =[{          	
	          	icon: "rain",
	            iconSize: 100,
	            color: "#7A7A7A"
		    }];
		    $scope.weatherCondition = rainfallValue.toFixed(2) + "mm"
		    $scope.weatherType = "Rainy"
		    $scope.accuracyLevel = 68;
		}else if(tempValue > 29){			
			$scope.CurrentWeather =[{          	
	          	icon: "clear-day",
	            iconSize: 100,
	            color: "#7A7A7A"
		    }];
		    $scope.weatherCondition = tempValue.toFixed(2) + " C"
		    $scope.weatherType = "Hot"
		    $scope.accuracyLevel = 78;
		}else if(humidityVal > 75){			
			$scope.CurrentWeather =[{          	
	          	icon: "cloudy",
	            iconSize: 100,
	            color: "#7A7A7A"
		    }];
		    $scope.weatherCondition = humidityVal.toFixed(2) + " gm/ml 3"
		    $scope.weatherType = "Cool"
		    $scope.accuracyLevel = 75;
		}else if(windValue > 8){			
			$scope.CurrentWeather =[{          	
	          	icon: "wind",
	            iconSize: 100,
	            color: "#7A7A7A"
		    }];
		    $scope.weatherCondition = windValue.toFixed(2) + " mph"
		    $scope.weatherType = "Windy"
		    $scope.accuracyLevel = 77;
		}else if (rainfallValue > 100) {
			$scope.CurrentWeather =[{          	
	          	icon: "rain",
	            iconSize: 100,
	            color: "#7A7A7A"
		    }];
		    $scope.weatherCondition = rainfallValue.toFixed(2) + " mm"
		    $scope.weatherType = "Rainy"
		    $scope.accuracyLevel = 68;
		}else if(tempValue > 26){			
			$scope.CurrentWeather =[{          	
	          	icon: "clear-day",
	            iconSize: 100,
	            color: "#7A7A7A"
		    }];
		    $scope.weatherCondition = tempValue.toFixed(2) + " C"
		    $scope.weatherType = "Hot"
		    $scope.accuracyLevel = 78;
		}else if(humidityVal > 70){			
			$scope.CurrentWeather =[{          	
	          	icon: "cloudy",
	            iconSize: 100,
	            color: "#7A7A7A"
		    }];
		    $scope.weatherCondition = humidityVal.toFixed(2) + " gm/ml 3"
		    $scope.weatherType = "Cool"
		    $scope.accuracyLevel = 75;
		}else if(windValue > 5){			
			$scope.CurrentWeather =[{          	
	          	icon: "wind",
	            iconSize: 100,
	            color: "#7A7A7A"
		    }];
		    $scope.weatherCondition = windValue.toFixed(2) + " mph"
		    $scope.weatherType = "Windy"
		    $scope.accuracyLevel = 77;
		}else if (rainfallValue < 100) {
			$scope.CurrentWeather =[{          	
	          	icon: "rain",
	            iconSize: 100,
	            color: "#7A7A7A"
		    }];
		    $scope.weatherCondition = rainfallValue.toFixed(2) + " mm"
		    $scope.weatherType = "Rainy"
		    $scope.accuracyLevel = 68;
		}else if(tempValue < 26){			
			$scope.CurrentWeather =[{          	
	          	icon: "clear-day",
	            iconSize: 100,
	            color: "#7A7A7A"
		    }];
		    $scope.weatherCondition = tempValue.toFixed(2) + " C"
		    $scope.weatherType = "Hot"
		    $scope.accuracyLevel = 78;
		}else if(humidityVal < 70){			
			$scope.CurrentWeather =[{          	
	          	icon: "cloudy",
	            iconSize: 100,
	            color: "#7A7A7A"
		    }];
		    $scope.weatherCondition = humidityVal.toFixed(2) + " gm/ml 3"
		    $scope.weatherType = "Cool"
		    $scope.accuracyLevel = 75;
		}else if(windValue < 5){			
			$scope.CurrentWeather =[{          	
	          	icon: "wind",
	            iconSize: 100,
	            color: "#7A7A7A"
		    }];
		    $scope.weatherCondition = windValue.toFixed(2) + " mph"
		    $scope.weatherType = "Windy"
		    $scope.accuracyLevel = 77;
		}

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
        if(!$scope.$$phase) {
		 	$scope.$apply()
		}
	}

	
}])