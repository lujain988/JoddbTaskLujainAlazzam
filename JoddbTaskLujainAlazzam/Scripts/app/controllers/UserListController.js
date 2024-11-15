(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserListController', UserListController);

    UserListController.$inject = ['UserService'];

    function UserListController(UserService) {
        var vm = this;

        vm.users = [];
        vm.errorMessage = '';
        vm.pageNumber = 1;
        vm.pageSize = 100;
        vm.totalPages = 0;
        vm.hasMoreData = true;
        vm.loading = false;
        vm.loadMore = loadMore;
        vm.goToPage = goToPage;
        vm.visiblePages = [];

        activate();

        function activate() {
            loadMore();
        }

        function goToPage(page) {
            if (page > vm.totalPages || page < 1) return;
            vm.pageNumber = page;
            vm.users = [];
            loadMore();
        }

        function updateVisiblePages() {
            const startPage = Math.max(1, vm.pageNumber -5);
            const endPage = Math.min(vm.totalPages, vm.pageNumber + 5);

            vm.visiblePages = [];
            for (let i = startPage; i <= endPage; i++) {
                vm.visiblePages.push(i);
            }
        }

        function loadMore() {
            if (vm.loading) return;
            vm.loading = true;

            UserService.getUserList(vm.pageNumber, vm.pageSize).then(function (response) {

                if (response && response.data && response.data.length > 0) {
                    vm.users = vm.users.concat(response.data);
                    vm.totalPages = response.pageInfo.totalPages || 1;
                    updateVisiblePages();
                } else {
                    vm.hasMoreData = false;
                }
                vm.loading = false;
            }, function (error) {
                vm.errorMessage = 'Failed to load user list.';
                vm.hasMoreData = false;
                vm.loading = false;
            });
        }
    }
})();
