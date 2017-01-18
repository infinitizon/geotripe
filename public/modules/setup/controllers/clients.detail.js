/**
 * Created by ahassan on 12/23/16.
 */
angular.module('Setup')
    .controller('ClientDetailController', ['$localStorage', '$state', '$modalInstance', 'DataService', 'CommonServices', 'client'
        , function ($localStorage, $state, $modalInstance, DataService, CommonServices, client) {
            var vm = this;
            vm.container = {};

            vm.close = function(takeAlong){
                client.type = takeAlong.type;
                client.country = takeAlong.country;
                client.state = takeAlong.state;
                $modalInstance.close(takeAlong);
            }
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
                        data.transactionMetaData.queryMetaData.queryClause.andExpression = options.and;
                    }
                    angular.isDefined(options.pageno)? data.transactionMetaData.pageno=options.pageno:'';
                    DataService.post('inboundService', data).then( function (response) {
                        vm.container[selectScope] = response.data.data;
                        if(options.placeholder) vm.container[options.placeholder] = null;
                    });
                }
            };
            vm.getCountryStates = function(id){
                if(id){
                    data=angular.copy(CommonServices.postData);
                    data.factName = 'State';
                    data.transactionMetaData.responseDataProperties = "state_id&name";
                    data.transactionMetaData.pageno=null;
                    data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                        {
                            "propertyName": "state_country_id",
                            "propertyValue": id || '%',
                            "propertyDataType": "BIGINT",
                            "operatorType": "LIKE"
                        }
                    ];
                    CommonServices.getLOVs(data).then(function(response){
                        vm.container['states'] = response.data.data;
                        vm.party.state = JSON.parse(client.state);
                    });
                }else{
                    vm.party.state = JSON.parse(client.state);
                }
            }

            if( angular.equals({}, client) ){
                vm.allowEdit = true;
                client = {
                    "name": null,
                    "addressline1": null,
                    "addressline2": null,
                    "addresscity": null,
                    "emailaddress": null,
                    "type": {"partytype_id": null},
                    "country": {"country_id": null},
                    "state": {"state_id": null},
                    "contactpersontitle": null,
                    "contactlastname": null,
                    "contactfirstname": null,
                    "contactmiddlename": null,
                    "contactphonenumber": null
                };
            }else{
                vm.nvrEdit = true;
console.log(client);
                if(angular.isDefined(client.state) && client.state == null) client.state = {};
                if(angular.isDefined(client.country) && client.country != null){
                    vm.getCountryStates(client.country.country_id);
                }else{
                    client.country= {};
                }
                vm.party = angular.copy(client);
            }


            vm.originalClient = angular.copy(vm.party);
            vm.saveParty = function(){

                console.log(client);
                console.log(vm.party);
                vm.dataLoading = true;
                var data=angular.copy(CommonServices.postData);
                var newPartyData = angular.copy(vm.party);

                (client.type.partytype_id != vm.party.type.partytype_id)? vm.party.party_partytype_id = vm.party.type.partytype_id : '';
                (client.country.country_id != vm.party.country.country_id) ? vm.party.party_country_id = vm.party.country.country_id : '';
                (client.state.state_id != vm.party.state.state_id) ? vm.party.party_state_id = vm.party.state.state_id : '';
                delete vm.party.type;
                delete vm.party.country;
                delete vm.party.state;

                vm.changedObjs = CommonServices.GetFormChanges(client, vm.party);
                if( !angular.equals({}, vm.changedObjs) && vm.party.party_id ) { //If anything changed?
                    vm.changedObjs['id'] = vm.party.party_id;

                    data.transactionEventType = "Update"
                    data.factObjects = [vm.changedObjs];

                    DataService.post('inboundService', data).then(function (response) {
                        if(response.data.response == 'Success'){
                            vm.close(newPartyData)
                        }else {
                            vm.result = response.data.response;
                            vm.message = response.data.message;
                        }
                    })
                }else if( !vm.party.party_id ) { //A new insert
                    data.transactionEventType = "PUT";
                    vm.party.partystatus_partystatus_id = 1011;
                    data.factObjects = [vm.party];

                    DataService.post('inboundService', data).then(function (response) {
                        if(response.data.response == 'Success'){
                            vm.close(response.data)
                        }else {
                            vm.result = response.data.response;
                            vm.message = response.data.message;
                        }
                    })
                }
                vm.party = newPartyData;
            }
        }
    ]);