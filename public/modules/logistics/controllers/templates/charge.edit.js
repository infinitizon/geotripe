/**
 * Created by ahassan on 10/31/16.
 */
angular.module('Logistics')
    .controller('chargeEditController', ['$modalInstance', '$localStorage', 'charge', 'DataService','CommonServices', '$modalInstance'
        , function ($modalInstance, $localStorage, charge, DataService, CommonServices, $modalInstance) {
            var vm = this;

            vm.container={};
            CommonServices.postData.token = $localStorage.globals.currentUser.userDetails.token;
            vm.getLOVs = function(factName, selectScope, options) {
                if (vm.container[selectScope] == null) {
                    if(options.placeholder) vm.container[selectScope] = [options.placeholder];
                    var data = angular.copy(CommonServices.postData);
                    data.factName = factName;
                    data.transactionMetaData.responseDataProperties = options.response;
                    if(options.and){
                        data.transactionMetaData.queryMetaData.queryClause.andExpression = options.and;
                    }
                    DataService.post('inboundService', data).then( function (response) {
                        vm.container[selectScope] = response.data.data;
                        if(options.placeholder) vm.container[options.placeholder] = null;
                    });
                }
            }
            vm.charge = angular.copy(charge.charge);
            vm.index = angular.copy(charge.index);
            vm.updtCharges = function(){
                $modalInstance.close({index:vm.index,charge:vm.charge})
            }
        }
    ])