(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserImportController', UserImportController);

    UserImportController.$inject = ['UserImportService', '$scope'];

    function UserImportController(UserImportService, $scope) {
        var vm = this;

        vm.file = null;

        vm.onFileChange = function (event) {
            $scope.$apply(function () {
                vm.file = event.target.files[0] || null;
                if (vm.file) {
                    vm.uploadFile(); 
                }
            });
        };

        vm.uploadFile = function () {
            if (!vm.file) {
                Swal.fire({
                    icon: 'error',
                    title: 'No File Selected',
                    text: 'Please select a file to upload.',
                    toast: true,
                    position: 'top-end',
                    timer: 3500,
                    showConfirmButton: false
                });
                return;
            }

            // Show loading SweetAlert notification
            Swal.fire({
                title: 'Uploading...',
                text: 'Please wait while we upload your file.',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            UserImportService.uploadFile(vm.file).then(function (response) {
                Swal.close();  

                if (response.data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Upload Successful!',
                        text: 'File imported successfully!',
                        toast: true,
                        position: 'top-end',
                        timer: 3500,
                        showConfirmButton: false
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Upload Failed',
                        text: 'The users in this file are alrady uploaded',
                        toast: true,
                        position: 'top-end',
                        timer: 3500,
                        showConfirmButton: false
                    });
                }
            }, function (error) {
                Swal.close();  // Close the loading notification
                Swal.fire({
                    icon: 'error',
                    title: 'Upload Error',
                    text: error.data && error.data.message ? error.data.message : 'An error occurred during the upload process.',
                    toast: true,
                    position: 'top-end',
                    timer: 3500,
                    showConfirmButton: false
                });
            });
        };

        // Function to trigger file input programmatically
        vm.triggerFileInput = function () {
            document.getElementById('excelFile').click();
        };
    }
})();
