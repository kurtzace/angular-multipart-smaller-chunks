'use strict';

/**
 * @ngdoc function
 * @name angularMultipartSmallerChunksApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularMultipartSmallerChunksApp
 */
angular.module('angularMultipartSmallerChunksApp')
  .controller('MainCtrl',['$scope', 'fileUpload',  function ($scope, fileUpload) {
     
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);
        var fr = new FileReader();
          fr.onload = function(e) {
              splitAndSendFile(new Uint8Array(e.target.result), file);
          };
          fr.readAsArrayBuffer(file);

        console.dir(file);
        
    }

    function splitAndSendFile(dataArray, file) {
    var i = 0, formData, blob;
    for (; i < dataArray.length; i += 1e6) {
        blob = new Blob([dataArray.subarray(i, i + 1e6)]);
        formData = new FormData();
        formData.append("fileUpload", blob, file.name + ".part" + (i / 1e6));
        
        var uploadUrl = "/fileUpload";
         fileUpload.uploadFileToUrl( uploadUrl, formData);
       
    }
}
        
}]);
