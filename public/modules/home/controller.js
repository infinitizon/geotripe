angular.module('Home',[])
    .controller('HomeController', ['$scope', '$localStorage', '$rootScope', 'CommonServices','DataService'
        , function ($scope, $localStorage, $rootScope, CommonServices, DataService) {
            var vm = this;
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
                };
            })

            console.log($scope.user);

            if (!angular.isDefined($scope.user) ) {
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
    .controller('ProfileController', ['$scope', '$location', '$localStorage', 'CommonServices'
        , function ($scope, $location, $localStorage, CommonServices) {
            var vm = this;

            vm.profile = angular.copy($localStorage.globals.currentUser.userDetails.authDetails);
        }])