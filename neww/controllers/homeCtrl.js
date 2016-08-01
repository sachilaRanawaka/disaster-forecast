rasm.controller('homeCtrl',['$scope', '$state','$http','$mdDialog','$dashboardChart', function($scope,$state,$http,$mdDialog,$dashboardChart){

	$scope.showSearch = false;
	$scope.dashboardChrts =  $dashboardChart.loadDashboard();
	 
	$scope.menuItems = [{
		name : "dashboard",
		icon : "img/dashboard_1.svg",
		state : 'home.dashboard'
	},{
		name : "maps",
		icon : "img/maps_3.svg",
		state : 'home.maps'
	},{
		name : "About Us",
		icon : "img/about_us_2.svg",
		state : 'home.aboutUs'
	}]

	$scope.redirectToMain = function(){
		$state.go('main')
	}

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

    $scope.toggleRightSidebar = function(){
    	$mdDialog.show({
            templateUrl: 'partials/chartTypeDIalog.html',
            controller: 'chartCategory'
        }).then(function(obj) { 
        	console.log(obj)
        	requestToDashboard(obj)
        }, function() { 
        });
    }
    $scope.dashboardChrtsVisibe = true; 
    function requestToDashboard(obj){
    	
		var xmlhttp = new XMLHttpRequest();
    	if (obj.type == "pie") {
    		var url = "http://localhost:3000/filterChartsPie";
			var param = {
				year: obj.XAxsis,
				district : obj.district,
				condition : obj.pieScale
			}
			xmlhttp.onreadystatechange = function() {
			    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			        console.log(xmlhttp.responseText) 
			        addToDashboardPie(JSON.parse(xmlhttp.responseText),obj)
		    		$scope.$apply();
			    }
			};
			xmlhttp.open("POST", url); 
			xmlhttp.setRequestHeader("content-type", "application/json;charset=UTF-8"); 
			xmlhttp.send(JSON.stringify(param));
    	}else if(obj.type == "bar"){
    		var url = "http://localhost:3000/filterChartsBar";
			var param = {
				XAxsis: obj.XAxsis, 
				XAxsisAddition : obj.XAxsisAddition,
				district : obj.district,
				scale1 : obj.scale1,
				scale2 : obj.scale2,
				scale3 : obj.scale3,
				scaleNum : obj.scaleNum
			}
			xmlhttp.onreadystatechange = function() {
			    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			        console.log(xmlhttp.responseText) 
			        addToDashboardBar(JSON.parse(xmlhttp.responseText),obj)
		    		$scope.$apply();
			    }
			};
			xmlhttp.open("POST", url); 
			xmlhttp.setRequestHeader("content-type", "application/json;charset=UTF-8"); 
			xmlhttp.send(JSON.stringify(param));
    	}else if(obj.type == "line"){
    		var url = "http://localhost:3000/filterChartsBar";
			var param = {
				XAxsis: obj.XAxsis, 
				XAxsisAddition : obj.XAxsisAddition,
				district : obj.district,
				scale1 : obj.scale1,
				scale2 : obj.scale2,
				scale3 : obj.scale3,
				scaleNum : obj.scaleNum
			}
			xmlhttp.onreadystatechange = function() {
			    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			        console.log(xmlhttp.responseText) 
			        addToDashboardLine(JSON.parse(xmlhttp.responseText),obj)
		    		$scope.$apply();
			    }
			};
			xmlhttp.open("POST", url); 
			xmlhttp.setRequestHeader("content-type", "application/json;charset=UTF-8"); 
			xmlhttp.send(JSON.stringify(param));
    	}
    }

    function addToDashboardLine(dataObj,obj){
    	if ($scope.dashboardChrtsVisibe) {	
            $scope.dashboardChrts[0].highchartsNG = {
            	options: {
                    chart: {
                        type: obj.type,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false

                    },
                    title: {
                        text: obj.XAxsisAddition + " " + obj.district 
                    },
                    plotOptions: {
                        line: {
			                dataLabels: {
			                    enabled: true
			                },
			                enableMouseTracking: false
			            }
                    }
                },
                series: [],
                xAxis: {
                	 categories:[]
                },
                loading: false
            } 
            if (dataObj.barData.length >0) {
            	for(i=0; i<=dataObj.barData.length-1; i++){
            		 $scope.dashboardChrts[0].highchartsNG.series.push({
            		 	data : dataObj.barData[i].data,
            		 	name : dataObj.barData[i].id 
            		 })
            		 for(k=0; k<=dataObj.barData[0].data.length-1; k++){
            		 	$scope.dashboardChrts[0].highchartsNG.xAxis.categories.push(dataObj.barData[0].data[k].name)
            		 }
            	}
            };
            $scope.dashboardChrts[0].showChart = true
		    $scope.dashboardChrts[0].showBtn =  false
		    $scope.dashboardChrtsVisibe = false;
		    console.log($scope.dashboardChrts[0])
		    $dashboardChart.saveFirstChart($scope.dashboardChrts[0]);

		}else{
			$scope.dashboardChrts = $scope.dashboardChrts.sort(function(a,b){
				return b.item - a.item
			})
			$scope.num =  $scope.dashboardChrts[0].item + 1;
			var barSeries = []
			var barXaxis = [];

			if (dataObj.barData.length >0) {
            	for(i=0; i<=dataObj.barData.length-1; i++){
            		barSeries.push({
            		 	data : dataObj.barData[i].data,
            		 	name : dataObj.barData[i].id 
            		})
            		for(k=0; k<=dataObj.barData[0].data.length-1; k++){
            		 	barXaxis.push(dataObj.barData[0].data[k].name)
            		}
            	}
            };
			$dashboardChart.saveChart({
				highchartsNG : {
	            	options: {
	                    chart: {
	                        type: obj.type,
	                        plotBackgroundColor: null,
	                        plotBorderWidth: null,
	                        plotShadow: false

	                    },
	                    title: {
	                        text: obj.XAxsisAddition + " " + obj.district 
	                    },
	                    plotOptions: {
	                        line: {
				                dataLabels: {
				                    enabled: true
				                },
				                enableMouseTracking: false
				            }
	                    }
	                },
	                series:barSeries,
	                xAxis: {
	                	 categories:barXaxis
	                },
	                loading: false
	            }  ,
	            item : $scope.num,
	            showChart : true,
	            showBtn : false
			})
			$scope.dashboardChrts = $dashboardChart.loadDashboard();
		}
    }

    function addToDashboardBar(dataObj,obj){
    	if ($scope.dashboardChrtsVisibe) {	
            $scope.dashboardChrts[0].highchartsNG = {
            	options: {
                    chart: {
                        type: obj.type,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false

                    },
                    title: {
                        text: obj.XAxsisAddition + " " + obj.district 
                    },
                    plotOptions: {
                        
                    }
                },
                series: [],
                xAxis: {
                	 categories:[]
                },
                loading: false
            } 
            if (dataObj.barData.length >0) {
            	for(i=0; i<=dataObj.barData.length-1; i++){
            		 $scope.dashboardChrts[0].highchartsNG.series.push({
            		 	data : dataObj.barData[i].data,
            		 	name : dataObj.barData[i].id 
            		 })
            		 for(k=0; k<=dataObj.barData[0].data.length-1; k++){
            		 	$scope.dashboardChrts[0].highchartsNG.xAxis.categories.push(dataObj.barData[0].data[k].name)
            		 }
            	}
            };
            $scope.dashboardChrts[0].showChart = true
		    $scope.dashboardChrts[0].showBtn =  false
		    $scope.dashboardChrtsVisibe = false;
		    console.log($scope.dashboardChrts[0])
		    $dashboardChart.saveFirstChart($scope.dashboardChrts[0]);

		}else{
			$scope.dashboardChrts = $scope.dashboardChrts.sort(function(a,b){
				return b.item - a.item
			})
			$scope.num =  $scope.dashboardChrts[0].item + 1;
			var barSeries = []
			var barXaxis = [];

			if (dataObj.barData.length >0) {
            	for(i=0; i<=dataObj.barData.length-1; i++){
            		barSeries.push({
            		 	data : dataObj.barData[i].data,
            		 	name : dataObj.barData[i].id 
            		})
            		for(k=0; k<=dataObj.barData[0].data.length-1; k++){
            		 	barXaxis.push(dataObj.barData[0].data[k].name)
            		}
            	}
            };
			$dashboardChart.saveChart({
				highchartsNG : {
	            	options: {
	                    chart: {
	                        type: obj.type,
	                        plotBackgroundColor: null,
	                        plotBorderWidth: null,
	                        plotShadow: false

	                    },
	                    title: {
	                        text: obj.XAxsisAddition + " " + obj.district 
	                    },
	                    plotOptions: {
	                        
	                    }
	                },
	                series:barSeries,
	                xAxis: {
	                	 categories:barXaxis
	                },
	                loading: false
	            }  ,
	            item : $scope.num,
	            showChart : true,
	            showBtn : false
			})
			$scope.dashboardChrts = $dashboardChart.loadDashboard();
		}
    }

 
    function addToDashboardPie(dataObj,obj){
    	if ($scope.dashboardChrtsVisibe) {	
            $scope.dashboardChrts[0].highchartsNG = {
            	options: {
                    chart: {
                        type: obj.type,
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false

                    },
                    title: {
                        text: obj.XAxsis + " " + obj.district +" "+ obj.pieScale
                    },
                    plotOptions: {
                        pie: {
			                allowPointSelect: true,
			                cursor: 'pointer',
			                dataLabels: {
			                    enabled: true,
			                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
			                    style: {
			                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
			                    }
			                }
			            }
                    }
                },
                series: [{       
                   data: dataObj
                }],
                loading: false
            } 
            $scope.dashboardChrts[0].showChart = true
		    $scope.dashboardChrts[0].showBtn =  false
		    $scope.dashboardChrtsVisibe = false;
		    $dashboardChart.saveFirstChart($scope.dashboardChrts[0]);

		}else{
			$scope.dashboardChrts = $scope.dashboardChrts.sort(function(a,b){
				return b.item - a.item
			})
			$scope.num =  $scope.dashboardChrts[0].item + 1;
			$dashboardChart.saveChart({
				highchartsNG : {
	            	options: {
	                    chart: {
	                        type: obj.type,
	                        plotBackgroundColor: null,
	                        plotBorderWidth: null,
	                        plotShadow: false

	                    },
	                    title: {
	                        text: obj.XAxsis + " " + obj.district +" "+ obj.pieScale
	                    },
	                    plotOptions: {
	                        pie: {
				                allowPointSelect: true,
				                cursor: 'pointer',
				                dataLabels: {
				                    enabled: true,
				                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
				                    style: {
				                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
				                    }
				                }
				            }
	                    }
	                },
	                series: [{       
	                   data: dataObj
	                }],
	                loading: false
	            } ,
	            item : $scope.num,
	            showChart : true,
	            showBtn : false
			})
			$scope.dashboardChrts = $dashboardChart.loadDashboard();
		}
    }

    $scope.removeChart = function(index){
    	if ($scope.dashboardChrts.length == 1) {
    		$dashboardChart.deleteFirstChart(index);
    		$scope.dashboardChrts = $dashboardChart.loadDashboard();
			$scope.dashboardChrtsVisibe = true

    	}else if ($scope.dashboardChrts.length > 1) {
    		$dashboardChart.deleteChart(index);
	    	$scope.dashboardChrts = $dashboardChart.loadDashboard();
    	}
    	
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
		console.log(event)
	}

}])

