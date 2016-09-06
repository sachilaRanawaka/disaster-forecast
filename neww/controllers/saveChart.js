rasm.controller('saveChart',['$scope','$mdDialog','$dashboardChart',function($scope,$mdDialog,$dashboardChart){
	$scope.closeDialog = function(){
		$mdDialog.hide()
	}

	$scope.saveDashbord = function(){
		var details = $dashboardChart.loadDashboard()
		var param = {
			details : JSON.stringify(details),
			chartName : $scope.dashboardName
		}

		var xmlhttp = new XMLHttpRequest();
		var url = "http://localhost:3000/saveDashboard";
	 
		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {  
		        $scope.allData = JSON.parse(xmlhttp.responseText) 
		        console.log(xmlhttp.responseText)	
		        $mdDialog.hide();	       
		    }
		  
		};
		xmlhttp.open("POST", url); 
		xmlhttp.setRequestHeader("content-type", "application/json;charset=UTF-8"); 
		xmlhttp.send(JSON.stringify(param));
	}
	
}])