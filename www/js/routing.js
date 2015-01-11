sdApp.config(function ($routeProvider) {

    $routeProvider.
        //when('/overview', {
        //    templateUrl: 'overview.html',
        //    controller: 'OverviewCtrl'
        //}).
        when('/start', {
            templateUrl: 'start.html',
            controller: 'StartController'
        }).
        when('/addLanding', {
            templateUrl: 'addLanding.html',
            controller: 'AddLandingController'
        }).
        when('/planeModels', {
            templateUrl: 'planeModels.html',
            controller: 'PlaneModelsController'
        }).
        when('/import', {
            templateUrl: 'import.html',
            controller: 'ImportController'
        }).
        when('/showMyPlane/:myPlaneId', {
            templateUrl: 'showMyPlane.html',
            controller: 'ShowMyPlaneController'
        }).
        when('/addPlane', {
            templateUrl: 'addPlane.html',
            controller: 'AddPlaneController'
        }).
        otherwise({
            redirectTo: '/start'
        });
});
