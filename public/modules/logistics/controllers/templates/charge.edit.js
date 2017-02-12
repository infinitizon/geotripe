/**
 * Created by ahassan on 10/31/16.
 */
angular.module('Logistics')
    .controller('chargeEditController', ['$modalInstance', '$localStorage', '$modalInstance', '$log', 'charge', 'DataService','CommonServices'
        , function ($modalInstance, $localStorage, $modalInstance, $log, charge, DataService, CommonServices) {
            var vm = this;

            vm.preventUpdate=false;
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
            if(angular.isDefined(charge.preventUpdate)){
                vm.preventUpdate = charge.preventUpdate;
            }
            vm.installs=[]
            if(vm.charge.noofinstallments>1){
                vm.installments=true;
                var fromInstall = vm.charge.installments.split(',')
                for(var i=0; i<fromInstall.length; i++){
                    vm.installs.push({installment:fromInstall[i]});
                }
            }else{
                false;
            }

            vm.createInstalls =function(){
                if(confirm('Cnanging this value would clear existing installments.\n\nContnue?')){
                    vm.installs=[]
                    for(var i=0; i<vm.charge.noofinstallments; i++){
                        vm.installs.push({installment:null});
                    }
                }
            }
            vm.updtCharges = function(){
                var installment=[],installments='',total=0;
                if(vm.installs.length > 0 && vm.installments){
                    angular.forEach(vm.installs,function(install){
                        var digits = +install.installment.replace(/\D/g,'');
                        total = total + digits;
                        installment.push(digits);
                    })
                }
                if(total == 100 || !vm.installments){
                    installments=installment.join(',');
                    vm.charge.installments=installments;
                    $modalInstance.close({index:vm.index,charge:vm.charge})
                }else{
                    alert("The installments must sum up to 100% - currently "+total);
                }
            }
        }
    ])