sdApp.controller('ShowMyPlaneController', function ($scope, $rootScope, $routeParams, OpenDatabaseFactory, $location) {

    myPlaneId = parseInt($routeParams.myPlaneId);

    $scope.reset = function () {
        $scope.myPlane.landings = Array();
    };

    $scope.deleteThisPlane = function () {

        answer = confirm("Do you really want to delete this plane?");

        if (answer == true) {
            OpenDatabaseFactory.openDatabase(function (db) {

                var transaction = db.transaction(["myPlanes"], "readwrite");

                var objectStore = transaction.objectStore("myPlanes");
                //objectStore.put(myPlaneId, $scope.myPlane);
                objectStore.delete(myPlaneId);

                transaction.oncomplete = function (event) {
                    $location.path('/addPlane');
                    $scope.$apply();
                };

                transaction.onerror = function (event) {
                    console.error('transaction.onerror (in startPerformanceTest_onlyOne)');
                    $scope.testInProgress = false;
                };

            });
        }

    };

    $scope.save = function () {

        OpenDatabaseFactory.openDatabase(function (db) {

            var transaction = db.transaction(["myPlanes"], "readwrite");

            var objectStore = transaction.objectStore("myPlanes");
            objectStore.put($scope.myPlane);

            transaction.oncomplete = function (event) {

                alert("Änderungen wurden gespeichert");

            };

            transaction.onerror = function (event) {
                console.error('transaction.onerror (in startPerformanceTest_onlyOne)');
                $scope.testInProgress = false;
            };
        });

    };

    $scope.addLanding = function () {

        console.dir($scope.myPlane);
        $scope.myPlane.landings.push({airport: $scope.airport.toUpperCase(), spd: $scope.landingSpeed});

        console.dir($scope.myPlane);

        $scope.save();

    };

    $scope.planeModels = $rootScope.planeModels;

    console.log("$routeParams.myPlaneId" + myPlaneId);
    OpenDatabaseFactory.getMyPlanesById(function (plane) {


        $scope.myPlane = plane;
        $scope.$apply();

    }, myPlaneId);

});