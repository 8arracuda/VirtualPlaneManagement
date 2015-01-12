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
                console.log('saved to database!');
                console.log('transaction.oncomplete (' + $scope.planeModels.length + " planeModels saved)");
            };

            transaction.onerror = function (event) {
                console.error('transaction.onerror');
            };
        });
    };

    $scope.saveMyPlanes = function () {
        console.log("saveMyPlanes");
        OpenDatabaseFactory.openDatabase(function (db) {

            var transaction = db.transaction("myPlanes", "readwrite");

            var objectStore = transaction.objectStore("myPlanes");

            for (var i = 0; i < $scope.myPlanes.length; i++) {
                objectStore.put($scope.myPlanes[i]);
            }

            transaction.oncomplete = function (event) {
                console.log('saved to database!');
                console.log('transaction.oncomplete (' + $scope.myPlanes.length + " myPlanes saved)");
            };

            transaction.onerror = function (event) {
                console.error('transaction.onerror');
            };

        });
    };

    $scope.loadMyPlanesFromDatabase = function () {
        console.log("loadMyPlanes start");
        OpenDatabaseFactory.myPlanes(function (myPlanes) {

            $scope.loadInProgress = false;
            $scope.myPlanes = myPlanes;
            console.log("myPlanes");

        });
    };

    $scope.updateExportString1 = function() {

        $scope.exportString1 = JSON.stringify($scope.myPlanes);
        $scope.$apply();

    };

    $scope.updateExportString2 = function() {

        $scope.exportString2 = JSON.stringify($scope.planeModels);
        $scope.$apply();

    };

    $scope.loadPlaneModelsFromDatabase = function () {
        console.log("loadPlaneModels start");
        OpenDatabaseFactory.planeModels(function (planeModels) {
            $scope.loadInProgress = false;
            $scope.planeModels = planeModels;
            console.log("planeModels");

            $scope.$apply();
        });
    };

    $scope.loadMyPlanesFromDatabase();
    $scope.loadPlaneModelsFromDatabase();

    $scope.loadPlaneModelsFromFile = function () {

        var filename = 'res/data/planeModels.json';
        console.log(FileHelper.readStringFromFileAtPath(filename));

        $scope.planeModels = JSON.parse(FileHelper.readStringFromFileAtPath(filename));

        $scope.$apply()
    };

    $scope.initMyPlanes = function() {
      $scope.myPlanes = JSON.parse('[{"reg":"N1199UA","model":"Airbus A350","airline":"United Airlines","landings":[{"airport":"KORD","spd":0},{"airport":"KBLV","spd":"119"}],"id":1},{"reg":"D-AIXA","model":"Airbus A350","airline":"Lufthansa","landings":[{"airport":"EDDF","spd":0},{"airport":"EDDL"},{"airport":"KKKK"},{"airport":"KKKK"},{"airport":"EDDF"},{"airport":"LSZH","spd":"110"},{"airport":"EDDS","spd":"151"},{"airport":"EDDF","spd":"199"},{"airport":"ELLX","spd":"378"}],"id":2},{"reg":"N9092T","airline":"private","landings":[{"airport":"LSZB","spd":0},{"airport":"LSGR"},{"airport":"LSGR","spd":"88"}],"id":3},{"reg":"?","model":"Boeing 737-200","airline":"Air France","landings":[{"airport":"LFPG","spd":0}],"id":4},{"reg":"HB-JFO","model":"Bombardier Challenger 300","airline":"private","landings":[{"airport":"LSGG","spd":0},{"airport":"KKKK"},{"airport":"KKKK"},{"airport":"LSZB"},{"airport":"LSGG"}],"id":5},{"reg":"HS-TUB","model":"Airbus A380","airline":"Thai Airways","landings":[{"airport":"VTBS","spd":0}],"id":6},{"reg":"?","model":"Airbus A350","airline":"Air France","landings":[{"airport":"LFPG","spd":0},{"airport":"LSGG"}],"id":7},{"reg":"EI-JPG","model":"Boeing 757-200","airline":"Alitalia","landings":[{"airport":"LIRF","spd":0},{"airport":"LIMF"}],"id":8},{"reg":"D-EDDR","model":"Airbus A350","airline":"Lufthansa","landings":[{"airport":"EDDF","spd":0},{"airport":"EDDK"},{"airport":"ETNG"}],"id":9},{"reg":"F-WZWB","model":"Airbus A350","airline":"Quatar (Launch Customer)","landings":[{"airport":"OTBD","spd":0},{"airport":"OBBI","spd":"368"},{"airport":"OEDF","spd":"257"},{"airport":"OERM","spd":"128"}],"id":10},{"reg":"LN-RKA","model":"Airbus A350","airline":"SAS","landings":[{"airport":"ESSA","spd":0},{"airport":"EFMA","spd":"275"},{"airport":"EFHK","spd":"89"},{"airport":"EFMI","spd":"606"},{"airport":"ULLI","spd":"293"}],"id":11},{"reg":"?","model":"Boeing 737-200","airline":"EgyptAir","landings":[{"airport":"HECA","spd":0}],"id":12},{"reg":"PH-PBA","model":"Douglas DC3","airline":"KLM","landings":[{"airport":"EHAM","spd":0},{"airport":"EDLV","spd":"82"},{"airport":"EDDL","spd":"175"},{"airport":"EDDK","spd":"123"}],"id":13},{"reg":"F-GELG","model":"Saab 340A (Passenger Variant)","airline":"Air France","landings":[{"airport":"LFPG","spd":0},{"airport":"ELLX","spd":"295"}],"id":14}]');
        //$scope.$apply();
    };

    $scope.initPlaneModels = function() {
        $scope.planeModels = JSON.parse('[{"manufacturer":"Airbus","model":"A320 neo","id":2},{"manufacturer":"Airbus","model":"A350","id":3},{"manufacturer":"Boeing","model":"737-200","id":4},{"manufacturer":"Bombardier","model":"Challenger 300","id":5},{"manufacturer":"Carenado","model":"Bonanza A36","id":6},{"manufacturer":"Douglas","model":"DC3","id":7},{"manufacturer":"Airbus","id":8,"model":"A380"},{"manufacturer":"Boeing","id":9,"model":"757-200"},{"manufacturer":"Saab","id":10,"model":"340A (Passenger Variant)"}]');
        //$scope.$apply();
    };

    //$scope.clearObjectStorePlaneModels =

})
