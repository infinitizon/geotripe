angular.module('Auth')
    .controller('LoginController', ['$location', '$rootScope', 'AuthenticationService',
        function ($location, $rootScope, AuthenticationService) {
            var vm = this;
            // reset login status
            AuthenticationService.ClearCredentials(function(response){
                console.log(response.data.response);
                if(response.data.response==="Failure"){
                    $location.path('/home');
                }
            });
            //With this part, I'm able to hide and show pages based on the ROLE assigned to a user
            $rootScope.container = [];
            $rootScope.show = function(roles, authId){
                angular.forEach($rootScope.globals.currentUser.userDetails.authRoles  , function(authRole, key) {
                    if (roles.indexOf(authRole.Name) >= 0){
                        $rootScope.container[authId] = true;
                    } else {
                        $rootScope.container[authId] = false;
                    }
                });
            }
            //End: Hide and show pages based on roles

            vm.login = function () {
                vm.dataLoading = true;
                AuthenticationService.Login(vm.username, vm.password, function(response) {
                    if(response.data.token) {
                        AuthenticationService.SetCredentials(response.data);


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