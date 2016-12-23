/**
 * Created by ahassan on 12/23/16.
 */

angular.module('Setup')
    .controller('ClientDetailController', ['$localStorage', '$state', 'DataService','CommonServices',
        function ($localStorage, $state, DataService,CommonServices) {
            var vm = this;

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
                    data.transactionEventType = "PUT";
                    vm.party.partystatus_partystatus_id = 1011;
                    data.factObjects = [vm.party];

                    DataService.post('inboundService', data).then(function (response) {
                        vm.result = response.data.response;
                        vm.message = response.data.message;
                    })
                }
            }
        }
    ]);