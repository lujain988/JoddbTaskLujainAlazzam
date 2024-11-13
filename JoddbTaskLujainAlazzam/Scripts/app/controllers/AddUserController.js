(function () {
    'use strict';

    angular
        .module('app')
        .controller('AddUserController', AddUserController);

    AddUserController.$inject = ['UserService'];

    function AddUserController(UserService) {
        var vm = this;

        vm.user = {};  
        vm.errorMessage = '';  
        vm.successMessage = ''; 

        vm.submitForm = function () {
            var formData = new FormData();

            formData.append('Name', vm.user.Name);
            formData.append('Email', vm.user.Email);
            formData.append('MobileNumber', vm.user.MobileNumber);
            formData.append('Password', vm.user.Password);

            var photoFile = document.getElementById("photo").files[0];
            if (photoFile) {
                formData.append('PhotoPath', photoFile);
            }

            UserService.addUser(formData).then(function (response) {
                vm.successMessage = response.message;

                vm.user = {};  
                document.getElementById("addUserForm").reset(); 

            }, function (error) {
                vm.errorMessage = error.message;
            });
        };
    }
})();
