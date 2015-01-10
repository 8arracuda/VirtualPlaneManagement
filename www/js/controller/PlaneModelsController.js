sdApp.controller('PlaneModelsController', function ($scope, $rootScope, OpenDatabaseFactory) {

    $rootScope.planeModels = Array();

    OpenDatabaseFactory.openDatabase(function (db) {

        var transaction = db.transaction("planeModels", "readonly");
        var objectStore = transaction.objectStore("planeModels");

        objectStore.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
            if (cursor) {
                $rootScope.planeModels.push(cursor.value);
                cursor.continue();
            }
        };

        transaction.oncomplete = function (event) {

            $scope.$apply();

        };

        transaction.onerror = function (event) {
            console.error('transaction.onerror');
        };
    });

});
