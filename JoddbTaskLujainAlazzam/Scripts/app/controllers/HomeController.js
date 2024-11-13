(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = [];

    function HomeController() {
        var vm = this;
        vm.title = 'Welcome to the Home Page';
        vm.message = 'This is the home page content!';
    }
})();
