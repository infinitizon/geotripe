angular.module('RFQ')
    .controller('QuoteController', ['$scope', '$location', '$rootScope','DataService','CommonServices','$http',
        function ($scope, $location, $rootScope,DataService,CommonServices,$http) {
            $rootScope.pageTitle = "Quotes";
            $rootScope.pageHeader = "Quotes";

            var vm = this;
            vm.container = [];

            CommonServices.postData.token = $rootScope.globals.currentUser.userDetails.token;
            $scope.getFileDetails = function (e) {
                vm.files = [];
                $scope.$apply(function () {
                    // STORE THE FILE OBJECT IN AN ARRAY.
                    for (var i = 0; i < e.files.length; i++) {
                        vm.files.push(e.files[i]);
                    }
                });

                console.dir(vm.files);
            };
            vm.getLOVs = function(factName, selectScope, options) {
                if (vm.container[selectScope] == null) {
                    var data = angular.copy(CommonServices.postData);
                    data.factName = factName;
                    data.transactionMetaData.responseDataProperties = options.response;
                    DataService.post('inboundService', data).then( function (response) {
                        vm.container[selectScope] = response.data.data;
                    });
                }
            }
            vm.uploadFile = function () {
                //FILL FormData WITH FILE DETAILS.
                var data = new FormData();
                var andExpression = [
                    {
                        "propertyName": "user_id",
                        "propertyValue": "test",
                        "propertyDataType": "BIGINT",
                        "operatorType": "="
                    }
                ];
                data.append("transactionEventType", "PUT");
                data.append("factName", "Quote");
                data.append("transactionMetaData[currentLocale]", "NG");
                data.append("transactionMetaData[queryStore]", "MySql");
                data.append("transactionMetaData[queryMetaData]", "MySql");
                data.append("factObjects[Quote]", "Quote");
                data.append("factObjects[Note]", "Note");
                data.append("transactionMetaData[queryMetaData][queryClause]", "sic");
                data.append("transactionMetaData[queryMetaData][queryClause][andExpression]", JSON.stringify(andExpression));

                for (var i in vm.files) {
                    data.append("file[]", vm.files[i]);
                }
                DataService.post("inboundService", data, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined, 'Process-Data': false}
                    })
            }
        }])