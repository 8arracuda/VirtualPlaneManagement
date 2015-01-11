angular.module('OpenDatabaseFactory', [])
    .factory('OpenDatabaseFactory', function () {
        return {

            openDatabase: function (callback) {

                var db;

                if (db == null) {

                    //Quelle:
                    // https://developer.mozilla.org/de/docs/IndexedDB/IndexedDB_verwenden
                    if (!window.indexedDB) {
                        window.alert("Ihr Browser unterstützt keine stabile Version von IndexedDB. Dieses und jenes Feature wird Ihnen nicht zur Verfügung stehen.");
                    } else {

                        var request = window.indexedDB.open("VirtualPlaneManagement", 6);

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

                            /*
                             db.deleteObjectStore("planes");
                             db.deleteObjectStore("planeModels");
                             db.deleteObjectStore("landings");
                             db.deleteObjectStore("myPlanes");
                             */

                            var objectStorePlanes = db.createObjectStore("planes", {
                                keyPath: "id",
                                autoIncrement: true
                            });
                            objectStorePlanes.createIndex("key", "key", {unique: true});

                            var objectStorePlaneModels = db.createObjectStore("planeModels", {
                                keyPath: "id",
                                autoIncrement: true
                            });
                            objectStorePlaneModels.createIndex("key", "key", {unique: true});

                            var objectStoreLandings = db.createObjectStore("landings", {
                                keyPath: "id",
                                autoIncrement: true
                            });
                            objectStoreLandings.createIndex("key", "key", {unique: true});

                            var objectStoreMyPlanes = db.createObjectStore("myPlanes", {
                                keyPath: "id",
                                autoIncrement: true
                            });
                            objectStoreMyPlanes.createIndex("key", "key", {unique: true});

                        }
                    }


                } else {
                    callback(db);
                }
            },
            planeModels: function (callback) {
                console.log('in planeModels');
                this.openDatabase(function (db) {
                    //$scope.loadInProgress = false;
                    var db = db;

                    planeModels = Array();

                    var transaction = db.transaction("planeModels", "readonly");
                    var objectStore = transaction.objectStore("planeModels");

                    objectStore.openCursor().onsuccess = function (event) {
                        var cursor = event.target.result;
                        if (cursor) {
                            planeModels.push(cursor.value);
                            cursor.continue();
                        }
                    };

                    transaction.oncomplete = function (event) {
                        callback(planeModels);
                        //$scope.$apply();

                    };

                    transaction.onerror = function (event) {
                        console.error('transaction.onerror');
                    };
                });

            },
            myPlanes: function (callback) {
                console.log('in planeModels');
                this.openDatabase(function (db) {
                    //$scope.loadInProgress = false;
                    var db = db;

                    myPlanes = Array();

                    var transaction = db.transaction("myPlanes", "readonly");
                    var objectStore = transaction.objectStore("myPlanes");

                    objectStore.openCursor().onsuccess = function (event) {
                        var cursor = event.target.result;
                        if (cursor) {
                            myPlanes.push(cursor.value);
                            cursor.continue();
                        }
                    };

                    transaction.oncomplete = function (event) {
                        callback(myPlanes);
                        //$scope.$apply();

                    };

                    transaction.onerror = function (event) {
                        console.error('transaction.onerror');
                    };
                });

            },
            getMyPlanesById: function (callback, myPlaneId) {

                console.log('in planeModels');
                this.openDatabase(function (db) {

                    var transaction = db.transaction("myPlanes", "readonly");
                    var objectStore = transaction.objectStore("myPlanes");

                    var idbRequest = objectStore.get(parseInt(myPlaneId));

                    idbRequest.onsuccess = function (event) {
                        callback(event.target.result);
                    };

                    transaction.oncomplete = function (event) {
                    };

                    transaction.onerror = function (event) {
                        console.error('transaction.onerror');
                    };
                });

            },
            getPlanemodelById: function (planeModelId, callback) {

                this.openDatabase(function (db) {

                    var transaction = db.transaction("planeModels", "readonly");
                    var objectStore = transaction.objectStore("planeModels");

                    var idbRequest = objectStore.get(parseInt(planeModelId));

                    idbRequest.onsuccess = function (event) {
                        callback(event.target.result);
                    };

                    transaction.oncomplete = function (event) {
                    };

                    transaction.onerror = function (event) {
                        console.error('transaction.onerror');
                    };
                });

            }


        }
    });