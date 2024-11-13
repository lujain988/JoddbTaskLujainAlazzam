(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserImportController', UserImportController);

    UserImportController.$inject = ['UserImportService', '$scope'];

    function UserImportController(UserImportService, $scope) {
        var vm = this;

        vm.file = null;
        vm.successMessage = '';
        vm.errorMessage = '';
        vm.isLoading = false;

        // Function to handle file selection
        vm.onFileChange = function (event) {
            $scope.$apply(function () {
                vm.file = event.target.files[0] || null;  // Assign the selected file
                if (vm.file) {
                    vm.errorMessage = '';  // Clear any previous error message
                }
            });
        };

        // Function to upload the file
        vm.uploadFile = function () {
            if (!vm.file) {
                vm.errorMessage = 'Please select a file to upload.';
                return;
            }

            vm.isLoading = true;

            UserImportService.uploadFile(vm.file).then(function (response) {
                vm.isLoading = false;

                if (response.data.success) {
                    vm.successMessage = response.data.message;
                    vm.errorMessage = '';
                } else {
                    vm.errorMessage = response.data.message;
                    vm.successMessage = '';
                }
            }, function (error) {
                vm.isLoading = false;
                vm.errorMessage = 'An error occurred during the upload process.';
                vm.successMessage = '';
            });
        };
    }
})();
