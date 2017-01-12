/**
 * Created by ahassan on 12/23/16.
 */

angular.module('Setup')
    .controller('UserController', ['$scope', '$state', '$localStorage', 'DataService', 'CommonServices', '$modal'
        , function ($scope, $state, $localStorage, DataService, CommonServices, $modal) {
            var vm = this;
            vm.container = {};
            CommonServices.postData.token = $localStorage.globals.currentUser.userDetails.token;

            vm.getLOVs = function(factName, selectScope, options) {
                if (vm.container[selectScope] == null) {
                    if(options.placeholder)
                        vm.container[selectScope] = [options.placeholder];
                    else
                        vm.container[selectScope] = [{'id':1,'name':'Loading please wait...'}];

                    var data = angular.copy(CommonServices.postData);
                    data.factName = factName;
                    data.transactionMetaData.responseDataProperties = options.response;
                    if(options.and){
                        data.transactionMetaData.queryMetaData.queryClause.andExpression.queryPropertyValues = options.and;
                    }
                    DataService.post('inboundService', data).then( function (response) {
                        vm.container[selectScope] = response.data.data;
                        if(options.placeholder) vm.container[options.placeholder] = null;
                    });
                }
            };
            vm.users = []; //declare an empty array
            vm.pageno = 1; // initialize page no to 1
            vm.total_count = 0;
            vm.itemsPerPage = 15; //this could be a dynamic value from a drop down

            vm.getData = function(pageno) {
                var data=angular.copy(CommonServices.postData);
                data.factName = 'Users u, Party p';
                data.transactionMetaData.responseDataProperties = 'u.user_id&u.firstname&u.middlename&u.lastname&u.workphonenumber&u.contactphonenumber&p.name&u.isauthorizedperson&u.username&u.email&u.enabled'
                data.transactionMetaData.pageno = pageno-1;
                data.transactionMetaData.itemsPerPage = vm.itemsPerPage;
                data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                    {
                        "propertyName": "u.enabled",
                        "propertyValue": 1,
                        "propertyDataType": "TINYINT",
                        "operatorType": "="
                    },{
                        "propertyName": "ifnull(u.accountlocked,0)",
                        "propertyValue": 1,
                        "propertyDataType": "TINYINT",
                        "operatorType": "<>"
                    },
                ];
                data.transactionMetaData.queryMetaData.joinClause = {
                    'joinType':['LEFT JOIN'],'joinKeys':['u.user_party_id=p.party_id']
                }

                DataService.post('inboundService', data).then(function (response) {
                    vm.users = response.data;
                    vm.total_count = response.data.total_count;
                })
            }
            vm.getData(vm.pageno);

            vm.goBack = function () {
                vm.edit=false;
                vm.getData(vm.pageno);
            };
            vm.editUser = function(client){
                //$state.go('app.patient.medication.detail', {id: med.id});
                var modalInstance = $modal.open({
                    templateUrl: 'modules/setup/views/user.detail.html'
                    , controller: 'UserDetailController'
                    , controllerAs: 'usrDtCtrl'
                    , resolve     : {
                        client: function () {
                            return client;
                        },
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['modules/setup/controllers/user.detail.js']);
                        }]
                    }
                    , backdrop  : 'static'
                    , keyboard  : false
                    , size: 'lg'
                });
                //We just closed the modal
                modalInstance.result.then(function (selectedItem) {
                    vm.getData(vm.pageno);
                    $scope.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }

        }
    ]);