sdApp.controller('AirlinesController', function ($scope, $rootScope, OpenDatabaseFactory) {

    loadAirlines = function () {

        OpenDatabaseFactory.airlines(function (airlines) {
            $scope.loadInProgress = false;
            $scope.airlines = airlines;
            console.log("airlines");
            $scope.$apply();
        });
    };

    console.log("1");
    $scope.loadInProgress = true;
    loadAirlines();


    $scope.createAirline = function () {

        newAirline = {name: "", homeApt: "", cs: "", iata:""}

        OpenDatabaseFactory.openDatabase(function (db) {

            var transaction = db.transaction("airlines", "readwrite");
            var objectStore = transaction.objectStore("airlines");

            var idbRequest = objectStore.add(newAirline);

            idbRequest.onsuccess = function (event) {
                //callback(event.target.result);
                loadAirlines();
            };

            transaction.oncomplete = function (event) {
            };

            transaction.onerror = function (event) {
                console.error('transaction.onerror');
            };
        });

    };


    $scope.selectAirline= function (id) {
        $scope.selectedAirlineId = id;
        OpenDatabaseFactory.getAirlineById(id, function(airline) {
            $scope.selectedAirline = airline;
            $scope.$apply();
        });

    };

    $scope.saveAirline = function() {
        OpenDatabaseFactory.openDatabase(function (db) {

            var transaction = db.transaction("airlines", "readwrite");
            var objectStore = transaction.objectStore("airlines");


            var idbRequest = objectStore.put($scope.selectedAirline);

            idbRequest.onsuccess = function (event) {
                loadAirlines();
            };

            transaction.oncomplete = function (event) {
            };

            transaction.onerror = function (event) {
                console.error('transaction.onerror');
            };
        });
    };

    capitalizeHomeAptString = function() {
        $scope.selectedAirline.homeApt = $scope.selectedAirline.homeApt.toUpperCase();
    };

    capitalizeCallsignString = function() {
        $scope.selectedAirline.callsign = $scope.selectedAirline.callsign.toUpperCase();
    };

    capitalizeIataString= function() {
        $scope.selectedAirline.iata= $scope.selectedAirline.iata.toUpperCase();
    };

});
