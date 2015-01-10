sdApp.controller('ShowPlanesController', function ($scope, $rootScope, OpenDatabaseFactory) {

    $rootScope.planes = Array();

    $scope.addPlane = function () {
        console.log("showPlanes");
        $rootScope.planes.push({reg: "D-AIDG", plane: "A380"});


    };

});