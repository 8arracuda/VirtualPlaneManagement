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

    console.log("1");
    $scope.loadInProgress=true;
    OpenDatabaseFactory.planeModels(function (planeModels) {
        $scope.loadInProgress=false;
        $scope.planeModels=planeModels;
        console.log("planeModels");
        $scope.$apply();
    });
});
