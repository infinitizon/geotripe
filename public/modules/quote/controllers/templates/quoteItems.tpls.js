/**
 * Created by Abimbola on 1/19/2017.
 */
angular.module('RFQ')
.controller('quoteItemsController', ['$scope', '$modal', '$modalInstance', 'data', 'DataService', 'CommonServices',
    function ($scope, $modal, $modalInstance,data,DataService,CommonServices)  {
        var vm = this;
        vm.insertingManu = false;
        vm.showNewManu = true;
        vm.showNewUOM = true;
        vm.container = [];

        vm.getLOVs = function(factName, selectScope, options) {
            if (vm.container[selectScope] == null) {
                vm.container[options.placeholder] = 'Loading...';
                var data = angular.copy(CommonServices.postData);
                data.factName = factName;
                data.transactionMetaData.responseDataProperties = options.response;
                if(options.and){
                    data.transactionMetaData.queryMetaData.queryClause.andExpression = options.and;
                }
                DataService.post('inboundService', data).then( function (response) {
                    vm.container[selectScope] = response.data.data;
                    vm.container[options.placeholder] = null;
                });
            }//6234299983
        }

        vm.allowUpdate = function(){
            var i = 0;
            angular.forEach($localStorage.globals.currentUser.userDetails.authRoles  , function(authRole, key) {
                if (quoteId && "RFQ_SUPERVISOR,RFQ_ADMIN,SUPPORT_ADMIN".indexOf(authRole.Name) >= 0){
                    i++;
                }
            });
            return (i>0)?true:false;
        }

        vm.data = data;
        vm.indexSelected = null;
        if(vm.data.item){
            vm.indexSelected = vm.data.index;
            vm.id = vm.data.item.id;
            vm.partno_modelno = vm.data.item.partno_modelno;
            vm.matdesc = vm.data.item.matDesc;
            vm.oem_description = vm.data.item.oem_description;
            vm.detail_notes = vm.data.item.detail_notes;
            vm.qty = vm.data.item.qty;
            vm.unitprice = vm.data.item.unitprice;
            vm.oem_unitprice = vm.data.item.oem_unitprice;
            vm.selectedManufacturers = vm.data.item.manus;
            if(vm.data.item.unitofmeasure) {
                vm.getLOVs('UnitOfMeasure', 'unitofmeasures', {
                    'response': 'unitofmeasure_id&name',
                    'placeholder': 'UOMPlaceholder'
                });
                vm.unitofmeasure = vm.data.item.unitofmeasure;
            }
        }
        vm.publishdate = false;
        vm.dueDate = false;
        var data=angular.copy(CommonServices.postData);
        data.factName = 'Party p';
        data.transactionMetaData.responseDataProperties = 'p.party_id,p.name';
        data.transactionMetaData.queryMetaData.queryClause.andExpression = [
            {
                "propertyName": "party_partytype_id",
                "propertyValue": 201607132,
                "propertyDataType": "BIGINT",
                "operatorType": "="
            }
        ];
        DataService.post('inboundService', data).then(function (response) {
            vm.manufacturers = response.data.data || [];
        });
        vm.addNewManu = function(){
            var modalInstance = $modal.open({
                templateUrl: 'modules/quote/views/templates/add.manu.details.html',
                controller: 'addManuDetailsController',
                controllerAs: 'amdCtrl',animation: true,
                resolve:{
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['modules/quote/controllers/templates/add.manu.details.js']);
                    }]
                }
            });
            modalInstance.result.then(function (selectedItem) {
                if( !angular.equals({}, selectedItem) ) {
                    vm.manufacturers.push(selectedItem);
                    vm.selectedManufacturers.push(selectedItem);
                }
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        }
        vm.addNewUOM = function(){
            if(vm.newUOM){
                vm.errorMsg = false;
                vm.insertingUOM = true;
                var data=angular.copy(CommonServices.postData);
                data.factName = 'UnitOfMeasure';
                data.transactionEventType = "PUT"
                data.factObjects = [{name:vm.newUOM}];
                DataService.post('inboundService', data).then(function (response) {
                    vm.container['unitofmeasures'].push({unitofmeasure_id:response.data.data.insertId, name:vm.newUOM});
                    vm.unitofmeasure={unitofmeasure_id:response.data.data.insertId, name:vm.newUOM};
                    vm.insertingUOM = false;
                    vm.newUOM = '';
                    vm.showNewUOM = true;
                });
            }else{
                vm.errorMsg = true;
            }
        }
        vm.cancel = function(){
            $modalInstance.close();
        }
        vm.addLineItems = function () {
            vm.lineItemsAdded={
                "index":vm.indexSelected,
                "id":vm.id,
                "partno_modelno":vm.partno_modelno,
                "matDesc":vm.matdesc,
                "oem_description":vm.oem_description,
                "detail_notes":vm.detail_notes,
                "qty":vm.qty,
                "manus":vm.selectedManufacturers,
                "unitofmeasure":vm.unitofmeasure,
                "unitprice":parseFloat(vm.unitprice),
                "oem_unitprice":parseFloat(vm.oem_unitprice),
                "crossrrate":vm.crossrrate,
                "certOfOrigin":vm.certOfOrigin,
                "weight":vm.weight,
                "g_f":vm.g_f,
                "packaging":vm.packaging,
                "nafdac_soncap":vm.nafdac_soncap,
                "clearing":vm.clearing,
                "lt_onne":vm.lt_onne,
                "f_r":vm.f_r,
                "nlcf":vm.nlcf
            }
            $modalInstance.close(vm.lineItemsAdded);
        }
    }])