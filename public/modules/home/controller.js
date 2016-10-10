angular.module('Home')
    .controller('HomeController', ['$scope', '$location', '$rootScope', '$state',
        function ($scope, $location, $rootScope, $state) {
            var vm = this;
            // reset login status
            vm.pages = $rootScope.globals.currentUser.userDetails.authViews;
        }])
    .controller('ProfileController', ['$scope', '$location', '$rootScope',
        function ($scope, $location, $rootScope) {
            var vm = this;

            vm.container = [];
            vm.container['unitofmeasures'] = [{name:'Each'}, {name:'Set'}];

        }])