'use strict';

/**
 * @ngdoc function
 * @name angularMultipartSmallerChunksApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularMultipartSmallerChunksApp
 */
angular.module('angularMultipartSmallerChunksApp')
    .controller('MainCtrl', ['$scope', 'fileUpload', 'Webworker', function ($scope, fileUpload, Webworker) {

        $scope.uploadFile = function () {
            var file = $scope.myFile;
            console.log('file is ');
            console.dir(file);
            var fr = new FileReader();
            fr.onload = function (e) {
                backgroundtask(new Blob([new Uint8Array(e.target.result)]));
                splitAndSendFile(new Uint8Array(e.target.result), file);
            };
            fr.readAsArrayBuffer(file);

            console.dir(file);

        }

        function backgroundtask(blob) {
            //If we need the worker to continously send data without auto termination after first message, then use below
            // function that will become a worker
            function async(first, csv) {
                // api to send a promise notification
                notify(first);
                var allTextLines = csv.split(/\r\n|\n/);
                var lines = [];
                for (var i = 0; i < allTextLines.length; i++) {
                    var data = allTextLines[i].split(';');
                    var tarr = [];
                    for (var j = 0; j < data.length; j++) {
                        tarr.push(data[j]);
                    }
                    lines.push(tarr);
                }
                console.log(lines);
                // api to resolve the promise. Note: according to the $q spec, 
                // a promise cannot be used once it has been resolved or rejected.
                complete(allTextLines.length + " processed ");
            }
            if (window.FileReader) {
                // FileReader are supported.
                var reader = new FileReader();
                // Handle errors load
                reader.onload = function (loadedEvent) {
                    var csvFile = loadedEvent.target.result;
                    // mark this worker as one that supports async notifications
                    var myWorker = Webworker.create(async, { async: true });

                    // uses the native $q style notification: https://docs.angularjs.org/api/ng/service/$q
                    myWorker.run(1, csvFile).then(function (result) {
                        // promise is resolved.
                        alert(result);
                    }, null, function (progress) {
                        // promise has a notification
                        console.log(progress);
                    });

                };
                reader.onerror = function errorHandler(evt) {
                    if (evt.target.error.name == "NotReadableError") {
                        notify("Canno't read file !");
                    }
                };
                // Read file into memory as UTF-8      
                reader.readAsText(blob);
            } else {
                notify('FileReader are not supported in this browser.');
            }

        }


        function splitAndSendFile(dataArray, file) {
            var i = 0, formData, blob;
            for (; i < dataArray.length; i += 1e6) {
                blob = new Blob([dataArray.subarray(i, i + 1e6)]);
                formData = new FormData();
                formData.append("fileUpload", blob, file.name + ".part" + (i / 1e6));

                var uploadUrl = "/fileUpload";
                fileUpload.uploadFileToUrl(uploadUrl, formData);

            }
        }

    }]);
