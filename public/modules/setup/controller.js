angular.module('Setup')
    .controller('SetupController', ['$location', '$rootScope', '$uibModal',
        function ($location, $rootScope, $uibModal) {
            var vm = this;
            // reset login status
            vm.open = function (options) {
                switch(options.url) {
                    case 'user':
                        options.controller = 'UserController';
                        options.controllerAs = 'UsrCtrl';
                        break;
                    default:
                        options.controller = 'PartyController';
                        options.controllerAs = 'PartyCtrl';
                }
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'modules/setup/views/templates/'+options.url+'.html',
                    controller: options.controller,
                    controllerAs: options.controllerAs,
                    size: options.modalSize
                });

                modalInstance.result.then(function (selectedItem) {
                    console.log(selectedItem);
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
            };
        }])
    .controller('PartyController', ['$rootScope','$uibModalInstance','DataService','CommonServices',
        function ($rootScope, $uibModalInstance,DataService,CommonServices) {
            var vm = this;

            vm.edit=false;

            vm.users = []; //declare an empty array
            vm.pageno = 1; // initialize page no to 1
            vm.total_count = 0;
            vm.itemsPerPage = 5; //this could be a dynamic value from a drop down

            CommonServices.postData.token = $rootScope.globals.currentUser.userDetails.token;
            vm.getData = function(pageno) {
                data=angular.copy(CommonServices.postData);
                data.transactionMetaData.responseDataProperties = 'party_id&party_partytype_id&addressline1&addressline2&addresscity&name'
                data.transactionMetaData.pageno = pageno-1;
                data.transactionMetaData.itemsPerPage = vm.itemsPerPage;
                data.transactionMetaData.queryMetaData.queryClause.andExpression = [];

                DataService.post('inboundService', data).then(function (response) {
                    vm.parties = response.data;
                    vm.total_count = response.data.total_count;
                })
            }
            vm.getData(vm.pageno);

            vm.goBack = function () {
                vm.edit=false;
                vm.getData(vm.pageno);
            };
            vm.editParty = function (partyId) {
                vm.edit=true;
                var data=angular.copy(CommonServices.postData);
                if(partyId) {
                    data.transactionMetaData.responseDataProperties = 'party_id&party_partytype_id&addressline1&addressline2&addresscity&name&party_country_id&party_state_id&contactpersontitle&contactlastname&contactfirstname&contactmiddlename&contactphonenumber';
                    data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                        {
                            "propertyName": "party_id",
                            "propertyValue": partyId,
                            "propertyDataType": "BIGINT",
                            "operatorType": "="
                        }
                    ];
                    DataService.post('inboundService', data).then(function (response) {
                        vm.party = response.data.data[0];
                        vm.originalPartyData = angular.copy(vm.party);
                        vm.total_count = response.data.total_count;
                    })
                }else{
                    vm.party.party_id = null;
                    vm.party.party_partytype_id = null;
                    vm.party.addressline1 = null;
                    vm.party.addressline2 = null;
                    vm.party.addresscity = null;
                    vm.party.name = null;
                    vm.party.party_country_id = null;
                    vm.party.state_id = null;
                }
            };

            data=angular.copy(CommonServices.postData);
            data.factName = 'Country';
            data.transactionMetaData.responseDataProperties = "country_id&name";
            data.transactionMetaData.pageno = null;
            data.transactionMetaData.itemsPerPage = null;
            CommonServices.getLOVs(data).then(function(response){
                vm.countries = response.data.data;
            });

            data=angular.copy(CommonServices.postData);
            data.factName = 'PartyType';
            data.transactionMetaData.responseDataProperties = "partytype_id&name";
            CommonServices.getLOVs(data).then(function(response){
                vm.partyTypes = response.data.data;
            });
            vm.getCountryStates = function(id){
                if(vm.party.party_country_id){
                    data=angular.copy(CommonServices.postData);
                    data.factName = 'State';
                    data.transactionMetaData.responseDataProperties = "state_id&name";
                    data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                        {
                            "propertyName": "state_country_id",
                            "propertyValue": id || '%',
                            "propertyDataType": "BIGINT",
                            "operatorType": "LIKE"
                        }
                    ];
                    console.log(data);
                    CommonServices.getLOVs(data).then(function(response){
                        vm.states = response.data.data;
                    });
                }
            }

            vm.saveParty = function(){
                vm.dataLoading = true;
                var data=angular.copy(CommonServices.postData);
                vm.changedObjs = CommonServices.GetFormChanges(vm.originalPartyData, vm.party);

                if( !angular.equals({}, vm.changedObjs) && vm.party.party_id ) { //If anything changed?
                    vm.changedObjs['id'] = vm.party.party_id;

                    data.transactionEventType = "Update"
                    data.factObjects = [vm.changedObjs];

                    DataService.post('inboundService', data).then(function (response) {
                        vm.result = response.data.response;
                        vm.message = response.data.message;
                    })
                }else if( !vm.party.party_id ) { //A new insert
                    data.transactionEventType = "PUT"
                    data.factObjects = [vm.party];

                    DataService.post('inboundService', data).then(function (response) {
                        vm.result = response.data.response;
                        vm.message = response.data.message;
                    })
                }
            }


            //console.log()
            vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            //vm.ok = function () {
            //    $uibModalInstance.close('Ok');
            //};
        }])
    .controller('UserController', ['$rootScope','$uibModalInstance','DataService','CommonServices',
        function ($rootScope, $uibModalInstance,DataService,CommonServices) {
            var vm = this;

            vm.edit=false;

            vm.users = []; //declare an empty array
            vm.pageno = 1; // initialize page no to 1
            vm.total_count = 0;
            vm.itemsPerPage = 5; //this could be a dynamic value from a drop down

            CommonServices.postData.token = $rootScope.globals.currentUser.userDetails.token;
            vm.getData = function(pageno) {
                data=angular.copy(CommonServices.postData);
                data.factName = 'Users';
                data.transactionMetaData.responseDataProperties = 'user_id&firstname&middlename&lastname&workphonenumber&contactphonenumber&user_party_id(Party=>party_id&name)&isauthorizedperson&username&email&enabled'
                data.transactionMetaData.pageno = pageno-1;
                data.transactionMetaData.itemsPerPage = vm.itemsPerPage;
                data.transactionMetaData.queryMetaData.queryClause.andExpression = [];

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

            vm.editParty = function (partyId) {

            }

            vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }]);