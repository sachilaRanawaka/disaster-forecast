rasm.controller('loaderCtrl',['$scope', '$state', function($scope,$state){

	setTimeout(function(){
		$state.go("home.dashboard")
	},5000)

}]);