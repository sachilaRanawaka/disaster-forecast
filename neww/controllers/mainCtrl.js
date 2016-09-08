rasm.controller('mainCtrl',['$scope', '$state','$http','$mdSidenav', function($scope,$state,$http,$mdSidenav){
	
	$scope.isSidenavOpen = false;
	$scope.showSrilankaMap = true;
	$scope.searchYear = "2016";
	$scope.searchMonth = "November";
	$scope.selectedConditionID = "Rainfall"

	$scope.redirectToLogin = function(){
		$state.go("login")
	} 
	$scope.redirectToDashboard = function(){
		$state.go("loader")
	} 
	$scope.conditionArr = [{
		type : "Weather Forecast",
		conditions : [
			{
				name : 'Rainfall',
				checkbox : true,
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
			}
		]
	},{
		type : "Disaster Forecast",
		conditions : [
			{
				name : 'Flood',
				checkbox : true,
				icon : 'img/rain.svg' // only 24px works
			},{
				name : 'Landslides',
				checkbox : false,
				icon : 'img/temperature.svg'
			},{
				name : 'Draught',
				checkbox : false,
				icon : 'img/wind.svg'
			},{
				name : 'Cyclone',
				checkbox : false,
				icon : 'img/humidity.svg'
			}
		]
	}]

	$scope.expression1 = true;
	$scope.expression2 = false;
 
	$scope.openLeftMenu = function() {
	    $mdSidenav('left').toggle();
	};
	$scope.closeSideNav = function(name) {
		$scope.isSidenavOpen = false 	 
		$scope.selectedConditionID = name 
		$scope.filterCondition()
		if (name == "Rainfall") {
			$scope.colorObj = {
				item1:{
					backgroundColor:"#B2EBF2",
					label:"0.00 - 50.0 mm"
				},
				item2:{
					backgroundColor:"#00BCD4",
					label:"50.0 - 100 mm"
				},
				item3:{
					backgroundColor:"#448AFF",
					label:"100  - 150 mm"
				},
				item4:{
					backgroundColor:"#0288D1",
					label:"150  - 200 mm"
				},
				item5:{
					backgroundColor:"#3F51B5",
					label:"200  > mm"
				},
				item6:{
					backgroundColor:"#FFC107",
					label:"no rainfall Values"
				},
			}
		}else if (name == "Flood") {
			$scope.colorObj = {
				item1:{
					backgroundColor:"#B2EBF2",
					label:"0.00 - 50.0"
				},
				item2:{
					backgroundColor:"#00BCD4",
					label:"50.0 - 100"
				},
				item3:{
					backgroundColor:"#448AFF",
					label:"100  - 150"
				},
				item4:{
					backgroundColor:"#0288D1",
					label:"150  - 200"
				},
				item5:{
					backgroundColor:"#3F51B5",
					label:"200  > "
				},
				item6:{
					backgroundColor:"#FFC107",
					label:"No Flood"
				},
			}
		}else if (name == "Temparature") {
			$scope.colorObj = {
				item1:{
					backgroundColor:"#FF9800",
					label:"18.0 - 22.0 C"
				},
				item2:{
					backgroundColor:"#F57C00",
					label:"22.0 - 26.0 C"
				},
				item3:{
					backgroundColor:"#FF5722",
					label:"26.0 - 30.0 C"
				},
				item4:{
					backgroundColor:"#F44336",
					label:"30.0 - 34.0 C"
				},
				item5:{
					backgroundColor:"#D32F2F",
					label:"34.0 > C"
				},
				item6:{
					backgroundColor:"#FFC107",
					label:"no temparature Values"
				},
			}
		}else if (name == "Draught") {
			$scope.colorObj = {
				item1:{
					backgroundColor:"#FF9800",
					label:"18.0 - 22.0 "
				},
				item2:{
					backgroundColor:"#F57C00",
					label:"22.0 - 26.0 "
				},
				item3:{
					backgroundColor:"#FF5722",
					label:"26.0 - 30.0 "
				},
				item4:{
					backgroundColor:"#F44336",
					label:"30.0 - 34.0 "
				},
				item5:{
					backgroundColor:"#D32F2F",
					label:"34.0 > "
				},
				item6:{
					backgroundColor:"#FFC107",
					label:"No Draught"
				},
			}
		}else if (name == "Wind") {
			$scope.colorObj = {
				item1:{
					backgroundColor:"#CDDC39",
					label:"< 4Km/h"
				},
				item2:{
					backgroundColor:"#8BC34A",
					label:"4 - 8 Km/h"
				},
				item3:{
					backgroundColor:"#689F38",
					label:"8 - 12 Km/h"
				},
				item4:{
					backgroundColor:"#4CAF50",
					label:"12 - 16 Km/h"
				},
				item5:{
					backgroundColor:"#388E3C",
					label:"16 > Km/h"
				},
				item6:{
					backgroundColor:"#FFC107",
					label:"no wind values"
				},
			}
		}else if (name == "Landslides") {
			$scope.colorObj = {
				item1:{
					backgroundColor:"#FFA000",
					label:"60.0 - 65.0 "
				},
				item2:{
					backgroundColor:"#F57C00",
					label:"65.0 - 70.0"
				},
				item3:{
					backgroundColor:"#FF5722",
					label:"70.0 - 75.0"
				},
				item4:{
					backgroundColor:"#F44336",
					label:"75.0 - 85.0"
				},
				item5:{
					backgroundColor:"#D32F2F",
					label:"85.0 >"
				},
				item6:{
					backgroundColor:"#FFC107",
					label:"No Landslides"
				},
			}
		}else if (name == "Humidity") {
			$scope.colorObj = {
				item1:{
					backgroundColor:"#FFA000",
					label:"60.0 - 65.0 "
				},
				item2:{
					backgroundColor:"#F57C00",
					label:"65.0 - 70.0 "
				},
				item3:{
					backgroundColor:"#FF5722",
					label:"70.0 - 75.0 "
				},
				item4:{
					backgroundColor:"#F44336",
					label:"75.0 - 85.0 "
				},
				item5:{
					backgroundColor:"#D32F2F",
					label:"85.0 > "
				},
				item6:{
					backgroundColor:"#FFC107",
					label:"No Humidity values"
				},
			}
		}else if (name == "Cyclone") {
			$scope.colorObj = {
				item1:{
					backgroundColor:"#CDDC39",
					label:"60.0 - 65.0 "
				},
				item2:{
					backgroundColor:"#689F38",
					label:"65.0 - 70.0"
				},
				item3:{
					backgroundColor:"#689F38",
					label:"70.0 - 75.0"
				},
				item4:{
					backgroundColor:"#4CAF50",
					label:"75.0 - 85.0"
				},
				item5:{
					backgroundColor:"#388E3C",
					label:"85.0 >"
				},
				item6:{
					backgroundColor:"#FFC107",
					label:"No Cyclone"
				},
			}
		}
	};   
 
	$scope.moveToDashboard = function(){
		$state.go('login')
	}
	$scope.filterCondition = function(){
		if ($scope.searchYear != "" && $scope.searchMonth != "") {
			var xmlhttp = new XMLHttpRequest();
			var url = "http://localhost:3000/filterCondition";
			var param = {
				year: $scope.searchYear,
				month : $scope.searchMonth,
				condition : $scope.selectedConditionID
			 }
			xmlhttp.onreadystatechange = function() {
			    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { 
			        mapDistrict(JSON.parse(xmlhttp.responseText))
			        console.log(JSON.parse(xmlhttp.responseText))
			    }
			};
			xmlhttp.open("POST", url); 
			xmlhttp.setRequestHeader("content-type", "application/json;charset=UTF-8"); 
			xmlhttp.send(JSON.stringify(param));
		}
	}
	var areaObj = []; 

	function mapDistrict(obj){
		if (obj.length > 0) {
			areaObj = [];
			for(i=0; i<= obj.length-1; i++){
				switch(obj[i].District){
					case "Anuradhapura": 
						mapColorFunc("LK-71",obj[i])
						break;
					case "Anuradhapura ": 
						mapColorFunc("LK-71",obj[i])
						break;
					case "Colombo": //kalutara, gampaha
						mapColorFunc("LK-11",obj[i]) 
						mapColorFunc("LK-13",obj[i])
						mapColorFunc("LK-12",obj[i])
						break; 
					case "Colombo ": //kalutara, gampaha
						mapColorFunc("LK-11",obj[i]) 
						mapColorFunc("LK-13",obj[i])
						mapColorFunc("LK-12",obj[i])
						break; 
					case "Katugastota": // matale
						mapColorFunc("LK-21",obj[i])
						mapColorFunc("LK-22",obj[i])
						break;  
					case "Katugastota ": // matale
						mapColorFunc("LK-21",obj[i])
						mapColorFunc("LK-22",obj[i])
						break;  
					case "Katugastota": // matale
						mapColorFunc("LK-21",obj[i])
						mapColorFunc("LK-22",obj[i])
						break;  
					case "Katugastota ": // matale
						mapColorFunc("LK-21",obj[i])
						mapColorFunc("LK-22",obj[i])
						break; 
					case "Galle": 
						mapColorFunc("LK-31",obj[i])
						break;
					case "Galle ": 
						mapColorFunc("LK-31",obj[i])
						break;
					case "Hambantota": //matara
						mapColorFunc("LK-32",obj[i])
						mapColorFunc("LK-33",obj[i])
						break;
					case "Hambantota ": //matara
						mapColorFunc("LK-32",obj[i])
						mapColorFunc("LK-33",obj[i])
						break;
					case "Jaffna": // Kilinochchi
						mapColorFunc("LK-41",obj[i])
						mapColorFunc("LK-42",obj[i])
						break; 
					case "Jaffna ": // Kilinochchi
						mapColorFunc("LK-41",obj[i])
						mapColorFunc("LK-42",obj[i])
						break; 
					case "Mannar": 
						mapColorFunc("LK-43",obj[i])
						break;
					case "Mannar ": 
						mapColorFunc("LK-43",obj[i])
						break;
					case "Vavuniya": // Mullaitivu
						mapColorFunc("LK-44",obj[i])
						mapColorFunc("LK-45",obj[i])
						break; 
					case "Vavuniya ": // Mullaitivu
						mapColorFunc("LK-44",obj[i])
						mapColorFunc("LK-45",obj[i])
						break; 
					case "Batticaloa": 
						mapColorFunc("LK-51",obj[i])
						break;
					case "Batticaloa ": 
						mapColorFunc("LK-51",obj[i])
						break;
					case "Monaragala": //ampara
						mapColorFunc("LK-52",obj[i]) 
						mapColorFunc("LK-82",obj[i])
						break;
					case "Monaragala ": //ampara
						mapColorFunc("LK-52",obj[i]) 
						mapColorFunc("LK-82",obj[i])
						break;
					case "Trincomalee": 
						mapColorFunc("LK-53",obj[i])
						break;
					case "Trincomalee ": 
						mapColorFunc("LK-53",obj[i])
						break;
					case "Kurunegala": 
						mapColorFunc("LK-61",obj[i])
						break;
					case "Kurunegala ": 
						mapColorFunc("LK-61",obj[i])
						break;
					case "Puttalama": 
						mapColorFunc("LK-62",obj[i])
						break;
					case "Puttalama ": 
						mapColorFunc("LK-62",obj[i])
						break;
					case "Polonnaruwa": 
						mapColorFunc("LK-72",obj[i])
						break;
					case "Polonnaruwa ": 
						mapColorFunc("LK-72",obj[i])
						break;
					case "Badulla": 
						mapColorFunc("LK-81",obj[i])
						break; 
					case "Badulla ": 
						mapColorFunc("LK-81",obj[i])
						break; 
					case "Ratnapura":  // kagalle 
						mapColorFunc("LK-91",obj[i])
						mapColorFunc("LK-92",obj[i])
						break; 
					case "Ratnapura ":  // kagalle 
						mapColorFunc("LK-91",obj[i])
						mapColorFunc("LK-92",obj[i])
						break; 
					case "NuwaraEliya":  // kagalle 
						mapColorFunc("LK-23",obj[i]) 
						break; 
					case "NuwaraEliya ":  // kagalle 
						mapColorFunc("LK-23",obj[i]) 
						break; 
				}
			}
		}else{
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
				        "selectable": true,
		        		"color" :"#FFC107"
					},
				  "smallMap": {}
				} );
		}

	}
	$scope.colorObj = {
		item1:{
			backgroundColor:"#B2EBF2",
			label:"0.00 - 50.0 mm"
		},
		item2:{
			backgroundColor:"#00BCD4",
			label:"50.0 - 100 mm"
		},
		item3:{
			backgroundColor:"#448AFF",
			label:"100  - 150 mm"
		},
		item4:{
			backgroundColor:"#0288D1",
			label:"150  - 200 mm"
		},
		item5:{
			backgroundColor:"#3F51B5",
			label:"200  > mm"
		},
		item6:{
			backgroundColor:"#FFC107",
			label:"no rainfall values"
		},
	}
	function mapColorFunc(mapID,obj){
		var colorCode = ""
		var intValue = parseFloat(obj.Value)
		if (obj.type == "Rainfall") {
			if (intValue <= 50.0){
				areaObj.push({"id": mapID, "color": "#B2EBF2"}) 
			}
			else if (intValue > 50.0 && intValue <= 100.0) {
				areaObj.push({"id": mapID, "color": "#00BCD4"}) 
			}
			else if (intValue > 100.0 && intValue <= 150.0) {
				areaObj.push({"id": mapID, "color": "#448AFF"}) 
			}
			else if (intValue > 150.0 && intValue <= 200.0) {
				areaObj.push({"id": mapID, "color": "#0288D1"}) 
			}
			else if (intValue > 200.0 ) {
				areaObj.push({"id": mapID, "color": "#3F51B5"}) 
			}
			else if(obj.Value == ""){
				areaObj.push({"id": mapID, "color": "#B2EBF2"}) 
			}
		}else if(obj.type == "Humidity"){
			if (intValue > 60.0 && intValue <= 65.0)
				areaObj.push({"id": mapID, "color": "#FFA000"})
			else if (intValue > 65.0 && intValue <= 70.0) 
				areaObj.push({"id": mapID, "color": "#F57C00"})
			else if (intValue > 70.0 && intValue <= 75.0) 
				areaObj.push({"id": mapID, "color": "#FF5722"})
			else if (intValue > 75.0 && intValue <= 80.0) 
				areaObj.push({"id": mapID, "color": "#FFA000"})
			else if (intValue > 85.0 ) 
				areaObj.push({"id": mapID, "color": "#F44336"})
			else if(obj.Value == "")
				areaObj.push({"id": mapID, "color": "#D32F2F"})
 
		}else if(obj.type == "Wind"){
			if (intValue <= 4.0)
				areaObj.push({"id": mapID, "color": "#CDDC39"})
			else if (intValue > 4.0 && intValue <= 8.0) 
				areaObj.push({"id": mapID, "color": "#8BC34A"})
			else if (intValue > 8.0 && intValue <= 12.0) 
				areaObj.push({"id": mapID, "color": "#689F38"})
			else if (intValue > 12.0 && intValue <= 16.0) 
				areaObj.push({"id": mapID, "color": "#4CAF50"})
			else if (intValue > 16.0 ) 
				areaObj.push({"id": mapID, "color": "#388E3C"})
			else if(obj.Value == "")
				areaObj.push({"id": mapID, "color": "#CDDC39"})
		}else if(obj.type == "Temparature"){
			if (intValue > 18.0 && intValue <= 22.0)
				areaObj.push({"id": mapID, "color": "#FF9800"})
			else if (intValue > 22.0 && intValue <= 26.0) 
				areaObj.push({"id": mapID, "color": "#F57C00"})
			else if (intValue > 26.0 && intValue <= 30.0) 
				areaObj.push({"id": mapID, "color": "#FF5722"})
			else if (intValue > 30.0 && intValue <= 34.0) 
				areaObj.push({"id": mapID, "color": "#F44336"})
			else if (intValue > 34.0 ) 
				areaObj.push({"id": mapID, "color": "#D32F2F"})
			else if(obj.Value == "")
				areaObj.push({"id": mapID, "color": "#FF9800"})
		}else if (obj.type == "Flood") {
			if (intValue > 0 && intValue <= 50.0){
				areaObj.push({"id": mapID, "color": "#B2EBF2"}) 
			}
			else if (intValue > 50.0 && intValue <= 100.0) {
				areaObj.push({"id": mapID, "color": "#00BCD4"}) 
			}
			else if (intValue > 100.0 && intValue <= 150.0) {
				areaObj.push({"id": mapID, "color": "#448AFF"}) 
			}
			else if (intValue > 150.0 && intValue <= 200.0) {
				areaObj.push({"id": mapID, "color": "#0288D1"}) 
			}
			else if (intValue > 200.0 ) {
				areaObj.push({"id": mapID, "color": "#3F51B5"}) 
			}
			else if(obj.Value == "" ){
				areaObj.push({"id": mapID, "color": "#B2EBF2"}) 
			}
		}else if(obj.type == "Cyclone"){
			if (intValue > 60.0 && intValue <= 65.0)
				areaObj.push({"id": mapID, "color": "#CDDC39"})
			else if (intValue > 65.0 && intValue <= 70.0) 
				areaObj.push({"id": mapID, "color": "#8BC34A"})
			else if (intValue > 70.0 && intValue <= 75.0) 
				areaObj.push({"id": mapID, "color": "#689F38"})
			else if (intValue > 75.0 && intValue <= 80.0) 
				areaObj.push({"id": mapID, "color": "#4CAF50"})
			else if (intValue > 85.0 ) 
				areaObj.push({"id": mapID, "color": "#388E3C"})
			else if(obj.Value == "")
				areaObj.push({"id": mapID, "color": "#CDDC39"})
		}else if(obj.type == "Draught"){
			if (intValue > 18.0 && intValue <= 22.0)
				areaObj.push({"id": mapID, "color": "#FF9800"})
			else if (intValue > 22.0 && intValue <= 26.0) 
				areaObj.push({"id": mapID, "color": "#F57C00"})
			else if (intValue > 26.0 && intValue <= 30.0) 
				areaObj.push({"id": mapID, "color": "#FF5722"})
			else if (intValue > 30.0 && intValue <= 34.0) 
				areaObj.push({"id": mapID, "color": "#F44336"})
			else if (intValue > 34.0 ) 
				areaObj.push({"id": mapID, "color": "#D32F2F"})
			else if(obj.Value == "")
				areaObj.push({"id": mapID, "color": "#FF9800"})
		}else if(obj.type == "Landslides"){
			if (intValue > 60.0 && intValue <= 65.0)
				areaObj.push({"id": mapID, "color": "#FFA000"})
			else if (intValue > 65.0 && intValue <= 70.0) 
				areaObj.push({"id": mapID, "color": "#F57C00"})
			else if (intValue > 70.0 && intValue <= 75.0) 
				areaObj.push({"id": mapID, "color": "#FF5722"})
			else if (intValue > 75.0 && intValue <= 80.0) 
				areaObj.push({"id": mapID, "color": "#FFA000"})
			else if (intValue > 85.0 ) 
				areaObj.push({"id": mapID, "color": "#F44336"})
			else if(obj.Value == "")
				areaObj.push({"id": mapID, "color": "#D32F2F"})
 
		}
 
		AmCharts.makeChart( "mapdiv", {
		  "type": "map",
		  "dataProvider": {
		    "map": "sriLankaLow",
		    "getAreasFromMap": true,
		    "areas":areaObj
		  },
		  "listeners": [{
		      "event": "clickMapObject",
		      "method": districtClick
		  }],
		   "areasSettings": {
				"autoZoom": false,
				"selectedColor": "#CC0000",
		        "selectable": true,
		        "color" :"#FFC107"
			},
		  "smallMap": {}
		} );

	}

	$scope.filterCondition();

	

	function districtClick(event){  
    	$state.go('district',{'districtID': event.mapObject.id,'year':$scope.searchYear, 'month':$scope.searchMonth});
	}
	$scope.demo = {
	    topDirections: ['left', 'up'],
	    bottomDirections: ['down', 'right'],
	    isOpen: false,
	    availableModes: ['md-fling', 'md-scale'],
	    selectedMode: 'md-fling',
	    availableDirections: ['up', 'down', 'left', 'right'],
	    selectedDirection: 'up'
	};

}])