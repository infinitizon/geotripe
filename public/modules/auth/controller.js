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
    .controller('RequestResetController', ['$scope', 'DataService', 'WEB_ROOTS'
        , function ($scope, DataService, WEB_ROOTS) {
            var vm = this;
            vm.reset = function(){
                vm.dataLoading = true;
                var data = {username:vm.username,preURL : WEB_ROOTS.PROTOCOL + "://"+ WEB_ROOTS.MAIN + ":" + WEB_ROOTS.PORT + "/#/login"};
                //console.log(data); return;
                DataService.post('password/changeRequest', data, {})
                    .then(function (response) {
                        vm.dataLoading = false;
                        vm.msg = response.data;
                    });
            }
            vm.closeAlert = function () {
                vm.msg = null;
            };
        }
    ])
    .controller('NewPasswordController', ['$scope', 'Base64', 'DataService', 'validate'
        , function ($scope, Base64, DataService, validate) {
            var vm = this;

            vm.reset = function(){
                if(!vm.password || vm.password==''){
                    vm.msg = {response:'Failure', message:'You need to enter a new password'};
                    return;
                }
                if(!vm.cpassword || vm.cpassword==''){
                    vm.msg = {response:'Failure', message:'You need to verify your new password'};
                    return;
                }
                if(vm.password != vm.cpassword){
                    vm.msg = {response:'Failure', message:'The entered preferred passwords does not match'};
                    return;
                }
                var data = {usr:validate.email, pwd : Base64.encode(vm.password)};
                //console.log(data); return;
                vm.dataLoading = true;
                DataService.post('password/reset', data, {})
                    .then(function (response) {
                        vm.dataLoading = false;
                        vm.msg = response.data;
                    });
            }
            vm.closeAlert = function () {
                vm.msg = null;
            };
        }
    ])