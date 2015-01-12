sdApp.controller('ShowMyPlaneController', function ($scope, $rootScope, $routeParams, OpenDatabaseFactory, $location) {

    myPlaneId = parseInt($routeParams.myPlaneId);

    $scope.reset = function () {
        $scope.myPlane.landings = Array();
    };

    $scope.deleteThisPlane = function () {

        answer = confirm("Do you really want to delete this plane?");

        if (answer == true) {
            OpenDatabaseFactory.openDatabase(function (db) {

                var transaction = db.transaction(["myPlanes"], "readwrite");

                var objectStore = transaction.objectStore("myPlanes");
                //objectStore.put(myPlaneId, $scope.myPlane);
                objectStore.delete(myPlaneId);

                transaction.oncomplete = function (event) {
                    $location.path('/addPlane');
                    $scope.$apply();
                };

                transaction.onerror = function (event) {
                    console.error('transaction.onerror (in startPerformanceTest_onlyOne)');
                    $scope.testInProgress = false;
                };

            });
        }

    };

    $scope.save = function () {

        OpenDatabaseFactory.openDatabase(function (db) {

            var transaction = db.transaction(["myPlanes"], "readwrite");

            var objectStore = transaction.objectStore("myPlanes");
            objectStore.put($scope.myPlane);

            transaction.oncomplete = function (event) {

                // alert("Änderungen wurden gespeichert");

            };

            transaction.onerror = function (event) {
                console.error('transaction.onerror (in startPerformanceTest_onlyOne)');
                $scope.testInProgress = false;
            };
        });
    };

    airportFieldToUpper = function () {
        console.log("AirportFieldToUpper");
        $scope.airport = $scope.airport.toUpperCase();
    };

    $scope.addLanding = function () {

        console.dir($scope.myPlane);
        $scope.myPlane.landings.push({airport: $scope.airport.toUpperCase(), spd: $scope.landingSpeed});

        console.dir($scope.myPlane);
        $scope.airport = "";
        $scope.landingSpeed = "";

        $scope.save();

    };

    $scope.planeModels = $rootScope.planeModels;

    console.log("$routeParams.myPlaneId" + myPlaneId);
    OpenDatabaseFactory.getMyPlanesById(function (plane) {


        $scope.myPlane = plane;
        $scope.$apply();

    }, myPlaneId);


    $scope.camera = navigator.camera;

    cameraSuccess = function (imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;

    };

    cameraError = function (message) {
        alert('Failed because: ' + message);
    };

    $scope.startCamera = function () {
        console.log('start camera');

        navigator.camera.getPicture(cameraSuccess, cameraError, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });

    };

    $scope.stopCamera = function () {
        console.log('stop camera');

    };

    //call newFileSelected when something changes
    document.getElementById('files').addEventListener('change', newFileSelected, false);
    document.getElementById('filesCapture').addEventListener('change', newFileSelected, false);
    document.getElementById('myImage').addEventListener('change', newFileSelected, false);

    function newFileSelected(evt) {
        var fileList = evt.target.files; // FileList object
        console.dir(fileList);
        var f = fileList[0];

        //Code teilweise von http://wiki.selfhtml.org/wiki/JavaScript/API/File_Upload
        var reader = new FileReader(); //Lege neues Filereader-Objekt an

        // Dateiinformationen auslesen.
        reader.onload = (function (theFile) {
            return function (e) {
                var span = document.createElement('span');
                span.innerHTML = ['<img width="100" src="', e.target.result,
                    '" title="', theFile.name, '"/>'].join('');
                document.getElementById('list').insertBefore(span, null);

                var ctx = document.getElementById('canvas').getContext('2d');
                ;

                var img = new Image;
                img.src = URL.createObjectURL(f);
                img.onload = function () {
                    ctx.scale(50, 50);
                    ctx.drawImage(img, 0, 0, 60, 60);
                    console.log('the image is drawn');
                }
            };
        })(f);

        // Dateipfad aus Datei erzeugen.
        //reads the image and shows it
        reader.readAsDataURL(f);

        var dataurl = canvas.toDataURL("image/png");
        console.log(dataurl.length);

    }

    $scope.saveImageWithFileAPI = function () {
        window.requestFileSystem(window.PERSISTENT, 1024 * 1024,
            function (fs) {

                //address-id is filename
                var filename = myPlaneId + '_img.png';
                console.log('fs.root in writeFile');
                fs.root.getFile(filename, {create: true}, function (fileEntry) {

                    fileEntry.createWriter(function (fileWriter) {

                        fileWriter.onwriteend = function (e) {

                            //after one file has been successfully written the next file can be written
                            i++;
                            writeFile();
                        };

                        fileWriter.onerror = function (e) {
                            console.log('Write failed: ' + e.toString());
                            console.dir(e);
                        };

                        //overwrites the file from the beginning
                        fileWriter.seek(0);
                        fileWriter.write(JSON.stringify(data[i]));

                    }, errorHandler);

                }, errorHandler);

            },
            errorHandler
        );
    }

});