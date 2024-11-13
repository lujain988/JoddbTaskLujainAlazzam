(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'UserService'];

    function LoginController($location, UserService) {
        var vm = this;
        vm.username = '';
        vm.password = '';
        vm.errorMessage = ''; // To display any error messages

        // Function to handle login on form submission
        vm.login = function () {
            console.log('Attempting to log in with username:', vm.username);

            // Call the UserService to login
            UserService.login(vm.username, vm.password)
                .then(function (response) {
                    console.log('Login response in LoginController:', response); // Log the full response

                    if (response && response.data && response.data.success) { // Access response.data.success
                        console.log('Login successful, redirecting to home...');
                        $location.path('/home');
                    } else {
                        console.log('Login failed:', response && response.data ? response.data.message : 'Unknown error');
                        vm.errorMessage = response && response.data ? response.data.message : 'Invalid username or password';
                    }
                })
                .catch(function (error) {
                    console.error('An error occurred during login:', error);
                    vm.errorMessage = 'An error occurred during login. Please try again.';
                });
        };
    }
})();
