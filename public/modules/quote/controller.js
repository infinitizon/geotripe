angular.module('RFQ')
    .controller('QuoteController', ['$scope', '$location', '$rootScope','DataService','$http',
        function ($scope, $location, $rootScope,DataService,$http) {
            $rootScope.pageTitle = "Quotes";
            $rootScope.pageHeader = "Quotes";

            var vm = this;
            $scope.getFileDetails = function (e) {
                vm.files = [];
                $scope.$apply(function () {
                    // STORE THE FILE OBJECT IN AN ARRAY.
                    for (var i = 0; i < e.files.length; i++) {
                        vm.files.push(e.files[i]);
                    }
                });
            };
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