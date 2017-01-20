/**
 * Created by Abimbola on 1/19/2017.
 */

angular.module('RFQ')
    .controller('addManuDetailsController', ['$scope','$modalInstance', 'DataService', 'CommonServices',
        function ($scope, $modalInstance,DataService,CommonServices)  {
            var vm = this;
            //This helps to populate remote dropdowns
            vm.container = {};
            vm.allowEdit = false;

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

            vm.close = function(rslt){
                $modalInstance.close(rslt);
            }
            vm.savemanu = function(){
                var changes = {};

                (vm.party.name) ? changes['name'] = vm.party.name : '';
                (vm.party.addressline1) ? changes['addressline1'] = vm.party.addressline1 : '';
                (vm.party.addressline2) ? changes['addressline2'] = vm.party.addressline2 : '';
                (vm.party.addresscity) ? changes['addresscity'] = vm.party.addresscity : '';
                (vm.party.emailaddress) ? changes['emailaddress'] = vm.party.emailaddress : '';
                (vm.party.country.country_id) ? changes['party_country_id'] = vm.party.country.country_id : '';
                (vm.party.state.state_id) ? changes['party_state_id'] = vm.party.state.state_id : '';

                if( !angular.equals({}, changes) ) { //If anything changed?
                    changes['party_partytype_id'] =201607132;
                    changes['partystatus_partystatus_id'] =1011;
                    changes['isactive'] =1;
                    var data=angular.copy(CommonServices.postData);
                    data.factName = 'Party';
                    data.transactionEventType = "PUT"
                    //console.log(vm.party);return;

                    data.factObjects=[changes];
                    DataService.post('inboundService', data).then(function (response) {
                        vm.close({party_partytype_id:response.data.data.insertId, name:vm.party.name});

                        //vm.manufacturers.push({party_partytype_id:response.data.data.insertId, name:vm.newManu});
                        //vm.selectedManufacturers.push({party_partytype_id:response.data.data.insertId, name:vm.newManu});
                        //vm.insertingManu = false;
                        //vm.newManu = '';
                    });
                }
            }
        }
    ]);