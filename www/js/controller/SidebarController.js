sdApp.controller('SidebarController', function ($scope) {

    $scope.sidebar_main = [
        //{
        //    labelText: 'Start',
        //    linkURL: 'start'
        //},
        {
            labelText: 'Add Landing',
            linkURL: 'addLanding'
        },
        {
            labelText: 'Plane Models',
            linkURL: 'planeModels'
        },
        {
            labelText: 'Plane Photo',
            linkURL: 'planePhoto'
        },
        //{
        //    labelText: 'Planes',
        //    linkURL: 'planes'
        //},

        {
            labelText: 'Airlines',
            linkURL: 'airlines'
        },
        //{
          //  labelText: 'Show My Plane',
            //linkURL: 'showMyPlane'
        //},
        {
            labelText: 'Add Planes',
            linkURL: 'addPlane'
        },
        {
            labelText: 'Import / Export',
            linkURL: 'importExport'
        },
    ];

});