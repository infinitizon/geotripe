angular.module('Auth', [])
    .controller('LoginController', ['$scope', '$localStorage', '$state', 'AuthenticationService'
        , function ($scope, $localStorage, $state, AuthenticationService) {
            var vm = this;
            // reset login status
            AuthenticationService.ClearCredentials(function(response){
                if(response.data.response==="Failure"){
                    $state.go('app.home');
                }
            });

            //End: Hide and show pages based on roles

            vm.login = function () {
                vm.dataLoading = true;
                AuthenticationService.Login(vm.username, vm.password, function(response) {
                    console.log('Currently in auth/controller.js');
                    console.log($localStorage);
                    if(response.data.token) {
                        AuthenticationService.SetCredentials(response.data);
                        $scope.user = {
                            fname :$localStorage.globals.currentUser.userDetails.authDetails.firstname,
                            mname: $localStorage.globals.currentUser.userDetails.authDetails.middlename,
                            lname: $localStorage.globals.currentUser.userDetails.authDetails.lastname,
                            email: $localStorage.globals.currentUser.userDetails.authDetails.email,
                            avatar: 'images/avatar.jpg'
                        };
                        $scope.app.pages = $localStorage.pages;
                        console.log($scope.user);
                        $state.go('app.home');
                    } else {
                        vm.error = response.data.message;
                        vm.dataLoading = false;
                    }
                });
            };

            vm.closeNotification = function () {
                vm.error = null;
            };
        }])