sdApp.controller('AddPlaneController', function ($scope, $rootScope, OpenDatabaseFactory) {

    $scope.addPlane = function () {
        console.log("showPlanes");
        $rootScope.planes.push({reg: $scope.registration, model: $scope.planeModel, airline: $scope.airline});
    };

});
