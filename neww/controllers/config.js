rasm.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('main');
    $stateProvider
    .state('loader', {
        url: '/loader',
        controller: 'loaderCtrl',
        templateUrl: 'partials/ViewPreloader.html'
    }).state('main', {
        url: '/main',
        controller: 'mainCtrl',
        templateUrl: 'partials/mainPage.html'
    }).state('home', {
        url: '/home',
        controller: 'homeCtrl',
        templateUrl: 'partials/main.html'
    }).state('home.dashboard', {
        url: '/dashboard',
        controller: 'homeCtrl',
        templateUrl: 'partials/dashboard.html'
    }).state('home.maps', {
        url: '/maps',
        controller: 'homeCtrl',
        templateUrl: 'partials/maps.html'
    }).state('home.aboutUs', {
        url: '/aboutUs',
        controller: 'homeCtrl',
        templateUrl: 'partials/aboutUs.html'
    }).state("login", {
        url: "/login",
        controller: "loginCtrl",
        templateUrl: "partials/login.html"
    }).state("signUp", {
        url: "/signUp",
        controller: "loginCtrl",
        templateUrl: "partials/signup.html"
    }).state("district",{
        url: "/district/districtID=:districtID&year=:year&month=:month",
        controller: "districtCtrl",
        templateUrl: "partials/district.html"
    })
});
rasm.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('datePickerTheme').primaryPalette('teal');
})