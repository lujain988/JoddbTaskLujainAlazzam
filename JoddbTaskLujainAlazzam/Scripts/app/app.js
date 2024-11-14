(function () {
    'use strict';

    angular.module('app', ['ngRoute'])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

            $routeProvider
                .when('/login', {
                    templateUrl: '/Content/templates/login.html',  
                    controller: 'LoginController',
                    controllerAs: 'vm'
                })

                .when('/home', {
                    templateUrl: '/Content/templates/home.html',  
                    controller: 'HomeController',
                    controllerAs: 'vm'
                }).when('/userList', {
                    templateUrl: '/Content/templates/userList.html',
                    controller: 'UserListController',
                    controllerAs: 'vm'
                }).when('/addUser', {
                    templateUrl: '/Content/templates/addUser.html',
                    controller: 'AddUserController',
                    controllerAs: 'vm'
                }).when('/import', {
                    templateUrl: '/Content/templates/UserImport.html',
                    controller: 'UserImportController',
                    controllerAs: 'vm'
                })


                .otherwise({
                    redirectTo: '/login'  
                });
            $locationProvider.html5Mode(false);
            $locationProvider.hashPrefix('');
        }]);
})();
