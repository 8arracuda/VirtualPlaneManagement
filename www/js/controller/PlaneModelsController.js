sdApp.controller('PlaneModelsController', function ($scope, $rootScope, OpenDatabaseFactory) {

    //$rootScope.planeModels = Array();
    //$scope.loadInProgress = true;
    //OpenDatabaseFactory.openDatabase(function (db) {
    //    $scope.loadInProgress = false;
    //    var db = db;
    //
    //    var transaction = db.transaction("planeModels", "readonly");
    //    var objectStore = transaction.objectStore("planeModels");
    //
    //    objectStore.openCursor().onsuccess = function (event) {
    //        var cursor = event.target.result;
    //        if (cursor) {
    //            $rootScope.planeModels.push(cursor.value);
    //            cursor.continue();
    //        }
    //    };
    //
    //    transaction.oncomplete = function (event) {
    //
    //        $scope.$apply();
    //
    //    };
    //
    //    transaction.onerror = function (event) {
    //        console.error('transaction.onerror');
    //    };
    //});

    loadPlaneModels = function () {

        OpenDatabaseFactory.planeModels(function (planeModels) {
            $scope.loadInProgress = false;
            $scope.planeModels = planeModels;
            console.log("planeModels");
            $scope.$apply();
        });
    };

    console.log("1");
    $scope.loadInProgress = true;
    loadPlaneModels();


    $scope.createPlaneModel = function () {

    newPlaneModel = {manufacturer: "", model: ""}

        OpenDatabaseFactory.openDatabase(function (db) {

            var transaction = db.transaction("planeModels", "readwrite");
            var objectStore = transaction.objectStore("planeModels");

            var idbRequest = objectStore.add(newPlaneModel);

            idbRequest.onsuccess = function (event) {
                //callback(event.target.result);
                loadPlaneModels();
            };

            transaction.oncomplete = function (event) {
            };

            transaction.onerror = function (event) {
                console.error('transaction.onerror');
            };
        });

    };


    $scope.selectPlaneModel = function (id) {
        //$scope.selectedPlaneModel = $scope.planeModels[parseInt(id)];
        $scope.selectedPlaneModelId = id;
        OpenDatabaseFactory.getPlanemodelById(id, function(planemodel) {
            $scope.selectedPlaneModel = planemodel;
            $scope.$apply();
        });
        //alert("$scope.planeModels[parseInt(id)]:" + JSON.stringify($scope.planeModels[parseInt(id)]));
    };

    $scope.savePlaneModel = function() {
        OpenDatabaseFactory.openDatabase(function (db) {

            var transaction = db.transaction("planeModels", "readwrite");
            var objectStore = transaction.objectStore("planeModels");

            var idbRequest = objectStore.put($scope.selectedPlaneModel);

            idbRequest.onsuccess = function (event) {
                //callback(event.target.result);
                loadPlaneModels();
            };

            transaction.oncomplete = function (event) {
            };

            transaction.onerror = function (event) {
                console.error('transaction.onerror');
            };
        });
    }

});
