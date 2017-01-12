angular.module('Home',[])
    .controller('HomeController', ['$scope', '$localStorage', '$rootScope', 'CommonServices','DataService'
        , function ($scope, $localStorage, $rootScope, CommonServices, DataService) {
            var vm = this;
            console.log("Now in home/controller.js");

            // reset login status
            //vm.pages = $rootScope.globals.currentUser.userDetails.authViews;
            CommonServices.postData.token = $localStorage.globals.currentUser.userDetails.token;
            var data=angular.copy(CommonServices.postData);
            data.transactionEventType = 'QuoteStat';
            DataService.post('dashboard', data).then(function (response) {
                vm.QuotesDataset = response.data.data
                vm.QuotesOptions = {
                    series: {
                        pie: {
                            show: true,
                            innerRadius: 0.5,
                            stroke: {
                                width: 0
                            },
                            label: {
                                show: true,
                            }
                        }
                    },
                    legend: {
                        show: true
                    },
                    grid: {
                        hoverable: true,
                        clickable: true
                    }
                };
            })

            vm.flotClick=function(event, pos, item){
                console.log(event)
                console.log(pos)
                console.log(item)
            }

            console.log($scope.user);
            console.log($localStorage.globals.currentUser.userDetails.authDetails.firstname);
            $scope.fname = $localStorage.globals.currentUser.userDetails.authDetails.firstname;
            $scope.mname = $localStorage.globals.currentUser.userDetails.authDetails.middlename;
            $scope.lname = $localStorage.globals.currentUser.userDetails.authDetails.lastname;
            $scope.email = $localStorage.globals.currentUser.userDetails.authDetails.email;
            $scope.avatar = 'uploads/user/avatar.jpg';
            if (!angular.isDefined($scope.user) ) {
                $scope.user={};
                $scope.user = {
                    fname: $localStorage.globals.currentUser.userDetails.authDetails.firstname,
                    mname: $localStorage.globals.currentUser.userDetails.authDetails.middlename,
                    lname: $localStorage.globals.currentUser.userDetails.authDetails.lastname,
                    email: $localStorage.globals.currentUser.userDetails.authDetails.email,
                    avatar: 'uploads/user/avatar.jpg'
                };
            }

            console.log($scope.user);
            //$scope.today = function () {
            //    $scope.dt = new Date();
            //};
            //$scope.today();
            //$scope.clear = function () {
            //    $scope.dt = null;
            //};
            //// Disable weekend selection
            //$scope.disabled = function (date, mode) {
            //    return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
            //};
            //$scope.toggleMin = function () {
            //    $scope.minDate = $scope.minDate ? null : new Date();
            //};
            //$scope.toggleMin();
            //$scope.open = function ($event) {
            //    $event.preventDefault();
            //    $event.stopPropagation();
            //
            //    $scope.opened = true;
            //};
            //$scope.dateOptions = {
            //    formatYear: 'yy',
            //    startingDay: 1
            //};
            //$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            //$scope.format = $scope.formats[0];
        }])
    .controller('ProfileController', ['$scope', '$location', '$localStorage', 'DataService', 'CommonServices'
        , function ($scope, $location, $localStorage, DataService, CommonServices) {
            var vm = this;

            vm.profile = angular.copy($localStorage.globals.currentUser.userDetails.authDetails);
            console.log(vm.profile);
            vm.update = function(){
                var changes = {};
                var data = new FormData();
                data.append("factName", "Users");
                data.append("token", $localStorage.globals.currentUser.userDetails.token);
                data.append("transactionMetaData[currentLocale]", "NG");
                data.append("transactionMetaData[queryStore]", "MySql");
                data.append("transactionEventType", "Update");

                vm.profile.firstname != $localStorage.globals.currentUser.userDetails.authDetails.firstname ?changes['firstname']=vm.profile.firstname:'';
                vm.profile.middlename != $localStorage.globals.currentUser.userDetails.authDetails.middlename ?changes['middlename']=vm.profile.middlename:'';
                vm.profile.lastname != $localStorage.globals.currentUser.userDetails.authDetails.lastname ?changes['lastname']=vm.profile.lastname:'';
                vm.profile.username != $localStorage.globals.currentUser.userDetails.authDetails.username ?changes['username']=vm.profile.username:'';
                vm.profile.email != $localStorage.globals.currentUser.userDetails.authDetails.email ?changes['email']=vm.profile.email:'';
                vm.profile.workphonenumber != $localStorage.globals.currentUser.userDetails.authDetails.workphonenumber ?changes['workphonenumber']=vm.profile.workphonenumber:'';
                vm.profile.contactphonenumber != $localStorage.globals.currentUser.userDetails.authDetails.contactphonenumber ?changes['contactphonenumber']=vm.profile.contactphonenumber:'';
                vm.profile.contactphonenumber != $localStorage.globals.currentUser.userDetails.authDetails.contactphonenumber ?changes['contactphonenumber']=vm.profile.contactphonenumber:'';
                if( !angular.equals({}, changes) ){
                    changes['id'] = vm.profile.user_id;
                    data.append("factObjects", [JSON.stringify(changes)]);
                    if(vm.profile.pix){
                        var file = vm.profile.pix;
                        data.append("file[]", file);
                    }

                    DataService.post("inboundService", data, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined, 'Process-Data': false}
                    }).then( function (response) {
                        if(response.data.response == 'Failure'){
                            vm.error=response.data.message;
                            vm.isDisabled = false;
                            vm.dataLoading = false;
                        }else{
                            vm.error=response.data.message;
                            vm.isDisabled = false;
                            vm.dataLoading = false;
                            vm.lineItems = [];
                            vm.quoteFiles = null;
                        }
                        //vm.container[selectScope] = response.data.data;
                    });
                }else{
                    console.log('No changes');
                }
            }

        }])