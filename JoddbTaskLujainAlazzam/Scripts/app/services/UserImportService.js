(function () {
    'use strict';

    angular
        .module('app') 
        .factory('UserImportService', UserImportService);  

    UserImportService.$inject = ['$http'];

    function UserImportService($http) {
        var service = {
            uploadFile: uploadFile
        };

        return service;

        function uploadFile(file) {
            var formData = new FormData();
            formData.append('excelFile', file);

            return $http.post('/UserImport/ImportUsers', formData, {
                headers: { 'Content-Type': undefined }
            });
        }
    }
})();
