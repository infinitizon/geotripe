angular.module('Home')
    .controller('HomeController', ['$scope', '$location', '$rootScope',
        function ($scope, $location, $rootScope) {
            var vm = this;
            // reset login status
            vm.pages = $rootScope.globals.currentUser.userDetails.authViews;

            $scope.parent = {};
            $scope.parent.hideParent = true;
        }])
    .controller('ProfileController', ['$scope', '$location', '$rootScope',
        function ($scope, $location, $rootScope) {
            var vm = this;

            $scope.$parent.parent.hideParent = false;
        }])