sdApp.controller('ImportExportController', function ($scope, $rootScope, OpenDatabaseFactory) {

    $scope.savePlaneModels = function () {
        console.log("savePlaneModels");
        OpenDatabaseFactory.openDatabase(function (db) {

            var transaction = db.transaction("planeModels", "readwrite");

            var objectStore = transaction.objectStore("planeModels");

            for (var i = 0; i < $scope.planeModels.length; i++) {
                objectStore.put($scope.planeModels[i]);
            }

            transaction.oncomplete = function (event) {
                console.log('transaction.oncomplete (' + $scope.planeModels.length + " planeModels saved)");
            };

            transaction.onerror = function (event) {
                console.error('transaction.onerror');
            };
        });
    };

    loadMyPlanes = function () {
        console.log("loadMyPlanes start");
        OpenDatabaseFactory.myPlanes(function (myPlanes) {
            $scope.loadInProgress = false;
            $scope.myPlanes = myPlanes;
            console.log("myPlanes");
            $scope.exportString1 = JSON.stringify($scope.myPlanes);
            $scope.$apply();
        });
    };

    loadPlaneModels = function () {
        console.log("loadPlaneModels start");
        OpenDatabaseFactory.planeModels(function (planeModels) {
            $scope.loadInProgress = false;
            $scope.planeModels = planeModels;
            console.log("planeModels");
            $scope.exportString2 = JSON.stringify($scope.planeModels);
            $scope.$apply();
        });
    };

    loadMyPlanes();
    loadPlaneModels();

    $scope.loadPlaneModelsFromFile = function () {

        var filename = 'res/data/planeModels.json';
        console.log(FileHelper.readStringFromFileAtPath(filename));

        $scope.planeModels = JSON.parse(FileHelper.readStringFromFileAtPath(filename));

        $scope.$apply()
    };

})
