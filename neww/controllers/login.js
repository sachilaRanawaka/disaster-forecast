rasm.controller("loginCtrl",["$scope","$state","$mdDialog",function($scope,$state,$mdDialog){

	$scope.login = function(){
		if ($scope.txtUname == "sachila" && $scope.txtPwd == "123") {
			$state.go('loader')
		}else{
			$mdDialog.show($mdDialog.alert().parent(angular.element(document.body)).title('Invalid User Name').content('Please enter valid user name or password').ariaLabel('').ok('OK').targetEvent());
       	}
	}

	$scope.onClickSignUp = function(){
		$state.go("signUp")
	}
}])