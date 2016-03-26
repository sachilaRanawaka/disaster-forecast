rasm.controller('homeCtrl',['$scope', '$state','$http', function($scope,$state,$http){

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
                type: 'bar'
            }
        },
        series: [{
            data: [10, 15, 12, 8, 7]
        }],
        title: {
            text: 'Hello'
        },
        loading: false
    }
}])