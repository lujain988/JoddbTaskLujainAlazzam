(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserListController', UserListController);

    UserListController.$inject = ['UserService'];

    function UserListController(UserService) {
        var vm = this;

        vm.users = [];                // Holds the list of users
        vm.errorMessage = '';         // Holds any error messages
        vm.pageNumber = 1;            // Current page number
        vm.pageSize = 100;            // Number of users per page
        vm.totalPages = 0;            // Total number of pages
        vm.hasMoreData = true;        // Flag to check if more data can be loaded
        vm.loadMore = loadMore;       // Function to load more users
        vm.goToPage = goToPage;       // Function to navigate to a specific page
        vm.visiblePages = [];         // Visible page numbers for pagination

        activate();

        function activate() {
            loadMore();  // Load the initial set of users
        }

        // Function to go to a specific page
        function goToPage(page) {
            if (page > vm.totalPages || page < 1) return; // Prevent out-of-bounds navigation
            vm.pageNumber = page;
            vm.users = []; // Clear existing users
            loadMore();
        }

        // Update the visible pages based on the current page number
        function updateVisiblePages() {
            const startPage = Math.max(1, vm.pageNumber - 5); // 5 pages before
            const endPage = Math.min(vm.totalPages, vm.pageNumber + 6); // 6 pages after

            vm.visiblePages = [];
            for (let i = startPage; i <= endPage; i++) {
                vm.visiblePages.push(i);
            }
        }

        // Function to load users for the current page
        function loadMore() {
            if (vm.pageNumber > vm.totalPages && vm.totalPages > 0) return; // Stop if out of range

            vm.loading = true; // Show loading indicator

            // Call the service to get the specified page of users
            UserService.getUserList(vm.pageNumber, vm.pageSize).then(function (response) {
                if (response && response.data && response.data.length > 0) {
                    vm.users = vm.users.concat(response.data); // Append new users to the list

                    // Update total pages and current page information
                    vm.totalPages = response.pageInfo.totalPages;

                    // Update visible pages based on current page
                    updateVisiblePages();

                    console.log("Loading page:", vm.pageNumber);
                    console.log("Total pages:", vm.totalPages);
                    console.log("Current users loaded:", vm.users.length);
                } else {
                    vm.hasMoreData = false; // No more data available
                }
                vm.loading = false; // Hide loading indicator
            }, function (error) {
                vm.errorMessage = 'Failed to load user list.';
                console.error(error);
                vm.hasMoreData = false;
                vm.loading = false;
            });
        }
    }
})();
