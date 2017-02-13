/**
 * Created by ahassan on 2/13/17.
 */
angular.module('Notification')
    .controller('NotificationListController', ['$scope', '$stateParams', '$localStorage', '$filter', '$modal', 'DataService','CommonServices'
        , function ($scope, $stateParams, $localStorage, $filter, $modal, DataService, CommonServices){
            var vm = this;
            CommonServices.postData.token = $localStorage.globals.currentUser.userDetails.token;

            vm.notifications = []; //declare an empty array so as to show the "loading data" notice!
            vm.pageno = 1; // initialize page no to 1
            vm.total_count = 0;
            vm.itemsPerPage = 15; //this could be a dynamic value from a drop down
            vm.alerts = function(roles, token){
                vm.notifications = []; // Initially make list empty so as to show the "loading data" notice!
                DataService.get('notification',{params:{not_cnt:1,'roles':roles,'token':token}})
                    .then( function (response) {
                        if(response.data.success==true){
                            vm.notifications = response.data.data;
                            vm.total_count = response.data.total_count;
                            if(vm.total_count <= 0){
                                vm.dataLoading = "No Notifications yet!";
                            }
                        }
                    });
            }

            var roles = [];
            angular.forEach($localStorage.globals.currentUser.userDetails.authRoles, function(role){
                roles.push(role.AuthRoles_Id);
            })
            vm.alerts(roles.join(','), CommonServices.postData.token);
        }
    ])
