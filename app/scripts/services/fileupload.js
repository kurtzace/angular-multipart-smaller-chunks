'use strict';

/**
 * @ngdoc service
 * @name angularMultipartSmallerChunksApp.fileUpload
 * @description
 * # fileUpload
 * Service in the angularMultipartSmallerChunksApp.
 */
angular.module('angularMultipartSmallerChunksApp')
  .service('fileUpload',['$http', function ($http) {



    this.uploadFileToUrl = function(uploadUrl, fd){
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });
    }
}]);
