rasm.controller('loadChart',['$scope','$mdDialog','$dashboardChart',function($scope,$mdDialog,$dashboardChart){
	$scope.closeDialog = function(){
		$mdDialog.hide()
	}

	var param = {}

	var xmlhttp = new XMLHttpRequest();
	var url = "http://localhost:3000/getAllDashboards";
 
	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {   
	        console.log(xmlhttp.responseText)
	        $scope.allData = JSON.parse(xmlhttp.responseText);
	        if(!$scope.$$phase) {
			 	$scope.$apply()
			}

	    } 
	  
	};
	xmlhttp.open("POST", url); 
	xmlhttp.setRequestHeader("content-type", "application/json;charset=UTF-8"); 
	xmlhttp.send(JSON.stringify(param));

	$scope.loadDashboard = function(){
		console.log(JSON.parse($scope.chartIDs))
		var xmlhttp = new XMLHttpRequest();
		var url = "http://localhost:3000/getAllCharts";	 	
		var param = {
			chartIDs : JSON.parse($scope.chartIDs)
		}
		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {   
		        var resultArr = JSON.parse(xmlhttp.responseText); 
		        var i=0,
		           	l=resultArr.length-1,
		           	fullArr = [];
		        for(i;i<=l;i++){
		        	var chart = JSON.parse(resultArr[i])

		        	var item = {
		        		"showChart" : true,
		        		"showBtn" : false,
		        		"chartTitle" : chart.chartTitle,
		        		"highchartsNG" :chart.highchartsNG
		        	};
		        	fullArr.push(item)
		        } 
		        $dashboardChart.setDashboard(fullArr);

		        if(!$scope.$$phase) {
				 	$scope.$apply()
				}
		    } 
		    $mdDialog.hide();
		  
		};
		xmlhttp.open("POST", url); 
		xmlhttp.setRequestHeader("content-type", "application/json;charset=UTF-8"); 
		xmlhttp.send(JSON.stringify(param));
	}

 
	
}])