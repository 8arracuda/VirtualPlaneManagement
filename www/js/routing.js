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
        when('/airlines', {
            templateUrl: 'airlines.html',
            controller: 'AirlinesController'
        }).
        when('/importExport', {
            templateUrl: 'importExport.html',
            controller: 'ImportExportController'
        }).
        when('/showMyPlane/:myPlaneId', {
            templateUrl: 'showMyPlane.html',
            controller: 'ShowMyPlaneController'
        }).
        when('/addPlane', {
            templateUrl: 'addPlane.html',
            controller: 'AddPlaneController'
        }).
        when('/planePhoto', {
            templateUrl: 'planePhoto.html',
            controller: 'PlanePhotoController'
        }).
        otherwise({
            redirectTo: '/addPlane'
        });
});
