angular.module('OpenDatabaseFactory', [])
    .factory('OpenDatabaseFactory', function () {
        return {

            openDatabase: function (callback) {

                var db;
                console.log('openDatabase start');

                callback(db);

                if (db==null) {

                } else {



                    //Quelle:
                    // https://developer.mozilla.org/de/docs/IndexedDB/IndexedDB_verwenden
                    if (!window.indexedDB) {
                        window.alert("Ihr Browser unterstützt keine stabile Version von IndexedDB. Dieses und jenes Feature wird Ihnen nicht zur Verfügung stehen.");
                    } else {

                        var request = window.indexedDB.open("VirtualPlaneManagement", 2);

                        request.onerror = function (event) {
                            console.error('request.onerror (in openDatabase)');
                            alert("Database error: " + event.target.errorCode);
                            // Machen Sie etwas mit request.errorCode!
                        };
                        request.onsuccess = function (event) {
                            console.log('request.onsuccess (in openDatabase)');
                            db = request.result;
                            callback(db);

                        };

                        request.onupgradeneeded = function (event) {

                            console.log('onupgradeneeded');
                            db = event.target.result;

                            if (event.oldVersion < 2) {
                                db.deleteObjectStore("planes");
                                db.deleteObjectStore("planeModels");
                                db.deleteObjectStore("landings");
                            }

                            var objectStorePlanes = db.createObjectStore("planes", {keyPath: "id"});
                            objectStorePlanes.createIndex("key", "key", {unique: true});

                            var objectStorePlaneModels = db.createObjectStore("planeModels", {keyPath: "id"});
                            objectStorePlaneModels.createIndex("key", "key", {unique: true});

                            var objectStoreLandings = db.createObjectStore("landings", {keyPath: "id"});
                            objectStoreLandings.createIndex("key", "key", {unique: true});

                        }
                    }

                }
                //return db;
            }


        }
    });