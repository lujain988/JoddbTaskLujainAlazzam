(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];

    function UserService($http) {
        var service = {
            login: login,
            logout: logout,
            getUserList: getUserList,
            addUser: addUser
        };

        return service;

        function login(username, password) {
            return $http.post('/Account/Login', {
                username: username,
                password: password
            }).then(function (response) {
                return response; 
            }).catch(function (error) {
                return Promise.reject("Login failed.");
            });
        }
        function logout() {
            return $http.get('/Account/Logout');
        }
        function getUserList(pageNumber, pageSize) {
            return $http.get('/UserList/UserList', {
                params: { pageNumber: pageNumber, pageSize: pageSize }
            }).then(function (response) {
                if (response.data.success) {
                    return response.data;
                } else {
                    return Promise.reject(response.data.message || "Failed to load user list.");
                }
            }).catch(function (error) {
                return Promise.reject("Failed to load user list.");
            });
        }

        function addUser(formData) {
            return $http.post('/UserList/AddUser', formData, {
                headers: { 'Content-Type': undefined } 
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                return Promise.reject({ message: "Error occurred while adding the user." });
            });
        }
    }
})();
