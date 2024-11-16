(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$location', 'UserService'];

    function LoginController($rootScope, $location, UserService) {
        var vm = this;
        vm.username = '';
        vm.password = '';
        vm.errorMessage = '';
        vm.activePath = $location.path();

        $rootScope.$on('$locationChangeSuccess', function () {
            vm.activePath = $location.path();
        });

        vm.login = function () {
            UserService.login(vm.username, vm.password)
                .then(function (response) {
                    if (response.data.success) {
                        $rootScope.isLoggedIn = true;
                        $location.path('/home');
                    } else {
                        vm.errorMessage = response.data.message;
                    }
                })
                .catch(function () {
                    vm.errorMessage = 'An error occurred. Please try again.';
                });
        };

        vm.logout = function () {
            UserService.logout()
                .then(function () {
                    $rootScope.isLoggedIn = false;
                    $location.path('/login');
                })
                .catch(function (error) {
                    console.error("Error during logout:", error);
                });
        };
    }
})();
