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
                    if(response.data.token) {
                        AuthenticationService.SetCredentials(response.data);

                        $scope.user.fname = $localStorage.globals.currentUser.userDetails.authDetails.firstname;
                        $scope.user.mname = $localStorage.globals.currentUser.userDetails.authDetails.middlename;
                        $scope.user.lname = $localStorage.globals.currentUser.userDetails.authDetails.lastname;
                        $scope.user.email = $localStorage.globals.currentUser.userDetails.authDetails.email;
                        $scope.user.avatar = 'uploads/user/avatar.jpg';

                        $scope.app.pages = $localStorage.pages;

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