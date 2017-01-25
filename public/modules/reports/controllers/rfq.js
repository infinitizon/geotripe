/**
 * Created by Abimbola on 1/21/2017.
 */

angular.module('Reports')
    .controller('rfqReportsController', ['$scope', '$rootScope', '$localStorage', '$state', '$modal', 'DataService','CommonServices','$stateParams','$filter'
        , function ($scope, $rootScope, $localStorage, $state, $modal, DataService, CommonServices, $stateParams, $filter) {

            var vm =this;
            vm.container = {};
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
                        if(selectScope == 'quoteStatuses'){
                            vm.container[selectScope].push({'quotestatus_id':1,'name':'Partially Submitted'});
                            vm.container[selectScope].push({'quotestatus_id':2,'name':'TQ on line Item(s)'});
                        }
                    });
                }
            }

            vm.printRFQ =function(){
                var changes = {};
                console.log(vm.quote);
            }
        }
    ]);