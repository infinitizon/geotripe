/**
 * Created by ahassan on 1/19/17.
 */
angular.module('RFQ')
    .controller('QuoteController', ['$scope', '$location', '$localStorage','DataService', 'CommonServices', '$http',
        function ($scope, $location, $localStorage, DataService, CommonServices, $http) {
            var vm = this;
            vm.lineItems = [];
            /*
             * This part gets quotes summary by clients
             */
            CommonServices.postData.token = $localStorage.globals.currentUser.userDetails.token;
            vm.getQuoteSummary = function(pageno) {
                vm.showOverlay = true;
                vm.quotes = []; // Initially make list empty so as to show the "loading data" notice!
                var data=angular.copy(CommonServices.postData);
                data.transactionEventType = "QuoteDash";
                data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                    {
                        "propertyName": "p.Party_PartyType_Id",
                        "propertyValue": 201607131,
                        "propertyDataType": "BIGINT",
                        "operatorType": "="
                    }
                ];
                data.transactionMetaData.groupingProperties.by = 'p.Party_Id';
                DataService.post('quote', data).then(function (response) {
                    vm.showOverlay = false;
                    vm.quoteDash = response.data.data;
                    vm.total_count = response.data.total_count;
                    if(vm.total_count <= 0){
                        vm.quotesLoading = "No quotes found!";
                    }
                })
            }
            vm.getQuoteSummary();
        }])