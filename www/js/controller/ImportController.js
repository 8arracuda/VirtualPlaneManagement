sdApp.controller('ImportController', function ($scope, $rootScope, OpenDatabaseFactory) {

    OpenDatabaseFactory.openDatabase(function (db) {

        $scope.planeModels = JSON.parse(FileHelper.readStringFromFileAtPath("/res/data/planeModels.csv"));

        $scope.savePlaneModels = function () {

            var transaction = db.transaction("planeModels", "readwrite");

            var objectStore = transaction.objectStore("planeModels");

            for (var i = 0; i < $scope.planeModels.length; i++) {
                objectStore.put($scope.planeModels[i]);
            }

            transaction.oncomplete = function (event) {
                console.log('transaction.oncomplete');
            };

            transaction.onerror = function (event) {
                console.error('transaction.onerror');
            };

        };

    });


});
