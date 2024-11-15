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
                })
                .when('/userList', {
                    templateUrl: '/Content/templates/userList.html',
                    controller: 'UserListController',
                    controllerAs: 'vm'
                })
                .when('/addUser', {
                    templateUrl: '/Content/templates/addUser.html',
                    controller: 'AddUserController',
                    controllerAs: 'vm'
                })
                .when('/import', {
                    templateUrl: '/Content/templates/UserImport.html',
                    controller: 'UserImportController',
                    controllerAs: 'vm'
                })
                .otherwise({
                    redirectTo: '/login'
                });

            $locationProvider.html5Mode(false);
            $locationProvider.hashPrefix('');
        }])
        .run(['$rootScope', '$http', '$location', '$window', function ($rootScope, $http, $location, $window) {
            $rootScope.isLoggedIn = false;

            $http.get('/Account/CheckLogin').then(function (response) {
                $rootScope.isLoggedIn = response.data.isLoggedIn;

                const lastPath = sessionStorage.getItem('lastPath');

                if ($rootScope.isLoggedIn) {
                    if (lastPath && lastPath !== '/login') {
                        $location.path(lastPath);
                    } else {
                        $location.path('/home'); 
                    }
                } else {
                    $location.path('/login'); 
                }
            }).catch(function () {
                $rootScope.isLoggedIn = false;
                $location.path('/login');
            });

            $window.addEventListener('beforeunload', function () {
                sessionStorage.setItem('lastPath', $location.path());
            });

            // Prevent unauthorized access
            $rootScope.$on('$routeChangeStart', function (event, next) {
                if (!$rootScope.isLoggedIn && next.$$route.originalPath !== '/login') {
                    event.preventDefault();
                    $location.path('/login');
                }
            });
        }]);
})();
