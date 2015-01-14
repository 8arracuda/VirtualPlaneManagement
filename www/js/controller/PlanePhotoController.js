sdApp.controller('PlanePhotoController', function ($scope) {

    var ctx = document.getElementById('canvas').getContext('2d');

    document.getElementById('filesCapture_new').addEventListener('change', newFileSelected_new, false);


    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.fillRect(0, 0, 2, 2);

    $scope.increaseOffsetY = function() {
        $scope.canvasOffsetY = $scope.canvasOffsetY+5;
    };

    $scope.decreaseOffsetY = function() {
        $scope.canvasOffsetY = $scope.canvasOffsetY-5;
    };

    $scope.increaseOffsetX = function() {
        $scope.canvasOffsetX = $scope.canvasOffsetX+5;
    };

    $scope.decreaseOffsetX = function() {
        $scope.canvasOffsetX = $scope.canvasOffsetX-5;
    };

    $scope.decreaseScale = function() {

        $scope.canvasScale = $scope.canvasScale/2;
        ctx.scale($scope.canvasScale, $scope.canvasScale);
    };

    $scope.increaseScale = function() {
        $scope.canvasScale = $scope.canvasScale*2;
        ctx.scale($scope.canvasScale, $scope.canvasScale);
        var data=canvas.toDataURL();

        var img=new Image();
        img.onload=function(){
            ctx.drawImage(img,0,0,img.width,img.height,0,0,canvas.width,canvas.height);
        };
        img.src=data;
    };

    function newFileSelected_new(evt) {
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

                //var ctx = document.getElementById('canvas').getContext('2d');

                var img = new Image;
                img.src = URL.createObjectURL(f);
                img.onload = function () {
                    //ctx.scale(50, 50);
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



});