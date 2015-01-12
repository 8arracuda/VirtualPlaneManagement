sdApp.controller('AddPlaneController', function ($scope, $rootScope, OpenDatabaseFactory) {

    //  OpenDatabaseFactory.openDatabase(function (db) {
//        var db = db;

    //$scope.planeModels =$rootScope.planeModels;

    //$rootScope.planes = Array();

    console.log("1");
    $scope.loadInProgress = true;
    OpenDatabaseFactory.planeModels(function (planeModels) {
        $scope.loadInProgress = false;
        $scope.planeModels = planeModels;
        console.log("planeModels");
        $scope.$apply();
    });


    loadMyPlanes = function() {

        OpenDatabaseFactory.myPlanes(function (myPlanes) {
            $scope.loadInProgress = false;
            $scope.myPlanes = myPlanes;
            console.log("myPlanes");
            $scope.$apply();
        });

    };

    loadMyPlanes();


    $scope.addMyPlane = function () {
        console.log("addMyPlane");

        var newPlane = {
            reg: $scope.registration,
            model: $scope.planeModel,
            airline: $scope.airline,
            landings: [{airport: $scope.startAirport, spd: 0}]
        };
        //$rootScope.planes.push(newPlane);

        OpenDatabaseFactory.openDatabase(function (db) {

            var transaction = db.transaction(["myPlanes"], "readwrite");

            var objectStore = transaction.objectStore("myPlanes");
            objectStore.add(newPlane);

            transaction.oncomplete = function (event) {

                $scope.registration = "";
                $scope.airline = "";
                $scope.startAirport = "";
                $scope.$apply();
                loadMyPlanes();

            };

            transaction.onerror = function (event) {
                console.error('transaction.onerror (in startPerformanceTest_onlyOne)');
                $scope.testInProgress = false;
            };

        });

    };


});
