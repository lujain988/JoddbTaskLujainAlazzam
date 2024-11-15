(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserImportController', UserImportController);

    UserImportController.$inject = ['UserImportService', '$scope', '$window'];

    function UserImportController(UserImportService, $scope, $window) {
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
                    }).then(function () {
                        $window.location.reload(); 
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Upload Failed',
                        text: 'The users in this file are already uploaded.',
                        toast: true,
                        position: 'top-end',
                        timer: 3500,
                        showConfirmButton: false
                    }).then(function () {
                        $window.location.reload();
                    });
                }
            }, function (error) {
                Swal.close();
                Swal.fire({
                    icon: 'error',
                    title: 'Upload Error',
                    text: error.data && error.data.message ? error.data.message : 'An error occurred during the upload process.',
                    toast: true,
                    position: 'top-end',
                    timer: 3500,
                    showConfirmButton: false
                }).then(function () {
                    $window.location.reload();
                });
            });
        };

        vm.triggerFileInput = function () {
            document.getElementById('excelFile').click();
        };
    }
})();
