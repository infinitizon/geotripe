angular.module('Home')
    .controller('HomeController', ['$location', '$rootScope',
        function ($location, $rootScope) {
            var vm = this;
            // reset login status
            vm.pages = $rootScope.globals.currentUser.userDetails.authViews;
        }])