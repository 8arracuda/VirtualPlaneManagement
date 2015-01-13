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

    $scope.planeModelsToClipboard = function() {
        cordova.plugins.clipboard.copy(JSON.stringify($scope.planeModels));
        alert('copied export-string for planeModels to clipboard.');
    };

    $scope.airlinesToClipboard = function() {
        cordova.plugins.clipboard.copy(JSON.stringify($scope.airlines));
        alert('copied export-string for airlines to clipboard.');
    };

    $scope.myPlanesToClipboard = function() {
        cordova.plugins.clipboard.copy(JSON.stringify($scope.myPlanes));
        alert('copied export-string for myPlanes to clipboard.');
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

    $scope.saveAirlines = function () {
        console.log("saveAirlines");
        OpenDatabaseFactory.openDatabase(function (db) {

            var transaction = db.transaction("airlines", "readwrite");

            var objectStore = transaction.objectStore("airlines");

            for (var i = 0; i < $scope.airlines.length; i++) {
                objectStore.put($scope.airlines[i]);
            }

            transaction.oncomplete = function (event) {
                console.log('saved to database!');
                console.log('transaction.oncomplete (' + $scope.airlines.length + " airlines saved)");
            };

            transaction.onerror = function (event) {
                console.error('transaction.onerror');
            };

        });
    };



    $scope.loadPlaneModelsFromDatabase = function () {
        console.log("loadPlaneModels start");
        OpenDatabaseFactory.planeModels(function (planeModels) {

            console.dir(planeModels);
            console.log(planeModels);

            $scope.loadInProgress = false;
            $scope.planeModels = planeModels;
            console.log("planeModels");

            $scope.updateExportStringPlaneModels();
        });
    };

    $scope.loadMyPlanesFromDatabase = function () {
        console.log("loadMyPlanes start");

        OpenDatabaseFactory.myPlanes(function (myPlanes) {


            $scope.loadInProgress = false;
            $scope.myPlanes = myPlanes;
            console.log("myPlanes");

            $scope.updateExportStringMyPlanes();

        });
    };

    $scope.loadAirlinesFromDatabase = function () {
        console.log("loadAirlinesFromDatabase start");
        OpenDatabaseFactory.airlines(function (airlines) {

            $scope.loadInProgress = false;
            $scope.airlines = airlines;
            console.log("airlines");

            $scope.updateExportStringAirlines();

        });
    };





    $scope.updateExportStringMyPlanes = function() {

        $scope.exportStringMyPlanes = JSON.stringify($scope.myPlanes);
        $scope.$apply();

    };

    $scope.updateExportStringPlaneModels = function() {

        $scope.exportStringPlaneModels = JSON.stringify($scope.planeModels);
        $scope.$apply();

    };

    $scope.updateExportStringAirlines = function() {

        $scope.exportStringAirlines = JSON.stringify($scope.airlines);
        $scope.$apply();

    };






    $scope.loadPlaneModelsFromFile = function () {

        var filename = 'res/data/planeModels.json';
        console.log(FileHelper.readStringFromFileAtPath(filename));

        $scope.planeModels = JSON.parse(FileHelper.readStringFromFileAtPath(filename));

        $scope.$apply()
    };

    $scope.loadAirlinesFromFile = function () {

        var filename = 'res/data/airlines.json';
        console.log(FileHelper.readStringFromFileAtPath(filename));

        $scope.airlines = JSON.parse(FileHelper.readStringFromFileAtPath(filename));

        $scope.$apply()
    };

    $scope.loadMyPlanesFromFile = function () {

        var filename = 'res/data/myPlanes.json';
        console.log(FileHelper.readStringFromFileAtPath(filename));

        $scope.myPlanes = JSON.parse(FileHelper.readStringFromFileAtPath(filename));

        $scope.$apply()
    };


    $scope.loadMyPlanesFromDatabase();
    $scope.loadPlaneModelsFromDatabase();
    $scope.loadAirlinesFromDatabase();

});
