(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];

    function UserService($http) {
        var service = {
            login: login,
            getUserList: getUserList,
            addUser: addUser
        };

        return service;

        // User login function
        function login(username, password) {
            return $http.post('/Account/Login', {
                username: username,
                password: password
            }).then(function (response) {
                return response.data;
            }).catch(function (error) {
                console.error("Error during login:", error);
                return Promise.reject("Login failed.");
            });
        }
        function getUserList(pageNumber, pageSize) {
            return $http.get('/UserList/UserList', {
                params: { pageNumber: pageNumber, pageSize: pageSize }
            }).then(function (response) {
                if (response.data.success) {
                    return response.data; // Return the full response (data and pageInfo)
                } else {
                    return Promise.reject(response.data.message || "Failed to load user list.");
                }
            }).catch(function (error) {
                console.error("Error fetching user list:", error);
                return Promise.reject("Failed to load user list.");
            });
        }



        // Add user function
        function addUser(formData) {
            return $http.post('/UserList/AddUser', formData, {
                headers: { 'Content-Type': undefined } // Let Angular handle the Content-Type for FormData
            }).then(function (response) {
                return response.data; // Return response data from the backend
            }).catch(function (error) {
                console.error('Error adding user:', error);
                return Promise.reject({ message: "Error occurred while adding the user." });
            });
        }
    }
})();
