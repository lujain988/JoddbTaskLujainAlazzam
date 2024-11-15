(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = [];

    function HomeController() {
        var vm = this;
        vm.title = 'This is the home page content!';
        vm.message = 'Welcome to Dashboard';
    }
})();
