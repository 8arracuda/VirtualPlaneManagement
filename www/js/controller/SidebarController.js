sdApp.controller('SidebarController', function ($scope) {

    $scope.sidebar_main = [
        {
            labelText: 'Start',
            linkURL: 'start'
        },
        {
            labelText: 'Add Landing',
            linkURL: 'addLanding'
        },
        {
            labelText: 'Plane Models',
            linkURL: 'planeModels'
        },
        {
            labelText: 'Planes',
            linkURL: 'planes'
        },
        {
            labelText: 'Import',
            linkURL: 'import'
        },
        {
            labelText: 'Show Planes',
            linkURL: 'showPlanes'
        }
    ];



});