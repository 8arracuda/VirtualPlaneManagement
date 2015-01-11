sdApp.controller('ShowMyPlaneController', function ($scope, $rootScope, $routeParams, OpenDatabaseFactory) {


    $scope.reset = function() {
        $scope.myPlane.landings = Array();
    };

    $scope.addLanding = function() {

        //$scope.landingSpeed
        //$scope.airport
        console.dir($scope.myPlane);
        $scope.myPlane.landings.push({airport: $scope.airport, spd: $scope.landingSpeed});

    };

    $scope.planeModels = $rootScope.planeModels;

        //$routeParams.myPlaneId;

    console.log("$routeParams.myPlaneId" + $routeParams.myPlaneId);
    OpenDatabaseFactory.getMyPlanesById(function(plane) {


        $scope.myPlane = plane;
        $scope.$apply();

    }, $routeParams.myPlaneId);

});