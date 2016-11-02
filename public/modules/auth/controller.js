angular.module('Auth', [])
    .controller('LoginController', ['$scope', '$localStorage', '$location', 'AuthenticationService'
        , function ($scope, $localStorage, $location, AuthenticationService) {
            var vm = this;
            // reset login status
            AuthenticationService.ClearCredentials(function(response){
                if(response.data.response==="Failure"){
                    $location.path('/home');
                }
            });

            //End: Hide and show pages based on roles

            vm.login = function () {
                vm.dataLoading = true;
                AuthenticationService.Login(vm.username, vm.password, function(response) {
                    if(response.data.token) {
                        AuthenticationService.SetCredentials(response.data);
                        $scope.user = {
                            fname: $localStorage.globals.currentUser.userDetails.authDetails.firstname,
                            mname: $localStorage.globals.currentUser.userDetails.authDetails.middlename,
                            lname: $localStorage.globals.currentUser.userDetails.authDetails.lastname,
                            email: $localStorage.globals.currentUser.userDetails.authDetails.email,
                            avatar: 'images/avatar.jpg',
                        };

                        $location.path('/home');
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