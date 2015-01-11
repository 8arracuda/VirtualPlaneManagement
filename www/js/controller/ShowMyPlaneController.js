sdApp.controller('ShowMyPlaneController', function ($scope, $rootScope, $routeParams, OpenDatabaseFactory) {

    myPlaneId = parseInt($routeParams.myPlaneId);

    $scope.reset = function () {
        $scope.myPlane.landings = Array();
    };

    $scope.addLanding = function () {

        //$scope.landingSpeed
        //$scope.airport
        console.dir($scope.myPlane);
        $scope.myPlane.landings.push({airport: $scope.airport, spd: $scope.landingSpeed});


        OpenDatabaseFactory.openDatabase(function (db) {

            var transaction = db.transaction(["myPlanes"], "readwrite");

            var objectStore = transaction.objectStore("myPlanes");
            objectStore.put(myPlaneId, $scope.myPlane);

            transaction.oncomplete = function (event) {

                $scope.registration = "";
                $scope.airline = "";
                $scope.startAirport = "";

            };

            transaction.onerror = function (event) {
                console.error('transaction.onerror (in startPerformanceTest_onlyOne)');
                $scope.testInProgress = false;
            };

        });


    };

    $scope.planeModels = $rootScope.planeModels;

    //$routeParams.myPlaneId;

    console.log("$routeParams.myPlaneId" + myPlaneId);
    OpenDatabaseFactory.getMyPlanesById(function (plane) {


        $scope.myPlane = plane;
        $scope.$apply();

    }, myPlaneId);

});