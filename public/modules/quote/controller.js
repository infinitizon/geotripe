angular.module('RFQ')
    .controller('QuoteController', ['$scope', '$location', '$rootScope','DataService','CommonServices','$http',
        function ($scope, $location, $rootScope,DataService,CommonServices,$http) {
            $rootScope.pageTitle = "Quotes";
            $rootScope.pageHeader = "Quotes";

            var vm = this;
            /*
             * This part gets all the quotes available
             */
            vm.edit = false;
            vm.quotes = []; //declare an empty array so as to show the "loading data" notice!
            vm.pageno = 1; // initialize page no to 1
            vm.total_count = 0;
            vm.itemsPerPage = 15; //this could be a dynamic value from a drop down

            CommonServices.postData.token = $rootScope.globals.currentUser.userDetails.token;
            vm.getData = function(pageno) {
                vm.quotes = []; // Initially make list empty so as to show the "loading data" notice!
                var data=angular.copy(CommonServices.postData);
                data.factName = 'Quote q, Party p, QuoteStatus qs';
                data.transactionMetaData.responseDataProperties = 'q.quote_id&p.name&CONCAT(LEFT(q.subject , 30),IF(LENGTH(q.subject)>30, "…", "")) subject&qs.name status'
                data.transactionMetaData.pageno = pageno-1;
                data.transactionMetaData.itemsPerPage = vm.itemsPerPage;
                data.transactionMetaData.queryMetaData.queryClause.andExpression = [];
                data.transactionMetaData.queryMetaData.joinClause = {
                    'joinType':['JOIN','JOIN'],'joinKeys':['q.Party_Party_Id=p.Party_Id','q.Quote_Status_Id=qs.QuoteStatus_Id']
                }
                DataService.post('inboundService', data).then(function (response) {
                    vm.quotes = response.data.data;
                    vm.total_count = response.data.total_count;
                })
            }
            vm.getData(vm.pageno);

            vm.goBack = function () {
                vm.edit=false;
                vm.getData(vm.pageno);
            };
            vm.editQuote = function (quoteId) {
                vm.isDisabled = false;
                vm.edit=true;
                if(quoteId) {
                    var data=angular.copy(CommonServices.postData);
                    data.factName = 'Quote q, Party p, Product pr, QuoteStatus qs, QuoteDirection qd, Currency c, Users u';
                    data.transactionMetaData.responseDataProperties = 'q.quote_id&q.subject&p.name partyname&qs.name quotestatus&qd.name quotedirection&q.quoteamount&c.code currency&q.entrydate&q.approvedate&u.firstname&q.bidPrice&q.askPrice&q.quote_purchaseorder_id&q.strike&q.description&q.quantity&pr.name product&q.expirydate&q.quote_approvedby_id&q.specificationandrequirement';
                    data.transactionMetaData.queryMetaData.joinClause = {
                        'joinType':['JOIN','JOIN','JOIN','JOIN','JOIN','JOIN'],'joinKeys':['q.Party_Party_Id=p.Party_Id','q.quote_product_id=pr.product_id','q.Quote_Status_Id=qs.QuoteStatus_Id','q.quote_quoteDirection_id=qd.quoteDirection_id','q.quote_currency_id=c.currency_id','q.quote_enteredBy_id=u.user_id']
                    }
                    data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                        {
                            "propertyName": "quote_id",
                            "propertyValue": quoteId,
                            "propertyDataType": "BIGINT",
                            "operatorType": "="
                        }
                    ];
                    DataService.post('inboundService', data).then(function (response) {
                        vm.quote = response.data.data[0];
                        vm.quote.quoteAmount = parseFloat(vm.quote.quoteAmount);
                        vm.quote.quantity = parseFloat(vm.quote.quantity);

                        vm.originalUserData = angular.copy(vm.quote);
                        vm.total_count = response.data.total_count;
                    })

                }else{
                    vm.quote = null;
                }
            }
            vm.container = [];

            vm.getLOVs = function(factName, selectScope, options) {
                if (vm.container[selectScope] == null) {
                    var data = angular.copy(CommonServices.postData);
                    data.factName = factName;
                    data.transactionMetaData.responseDataProperties = options.response;
                    if(options.and){
                        data.transactionMetaData.queryMetaData.queryClause.andExpression = options.and;
                    }
                    DataService.post('inboundService', data).then( function (response) {
                        vm.container[selectScope] = response.data.data;
                    });
                }
            }
            CommonServices.postData.token = $rootScope.globals.currentUser.userDetails.token;
            $scope.getFileDetails = function (e) {
                vm.files = [];
                $scope.$apply(function () {
                    // STORE THE FILE OBJECT IN AN ARRAY.
                    for (var i = 0; i < e.files.length; i++) {
                        vm.files.push(e.files[i]);
                    }
                });
            };
            vm.postData = function () {
                vm.isDisabled = true; //Disable submit button
                vm.dataLoading = true; //Disable submit button
                //FILL FormData WITH FILE DETAILS.
                var data = new FormData();
                data.append("factName", "Quote");
                data.append("token", $rootScope.globals.currentUser.userDetails.token);
                data.append("transactionMetaData[currentLocale]", "NG");
                data.append("transactionMetaData[queryStore]", "MySql");
                if(vm.quote.quote_id){
                    data.append("transactionEventType", "Update");
                    var andExpression = [
                        {
                            "propertyName": "user_id",
                            "propertyValue": "test",
                            "propertyDataType": "BIGINT",
                            "operatorType": "="
                        }
                    ];
                    data.append("transactionMetaData[queryMetaData][queryClause][andExpression]", JSON.stringify(andExpression));
                    console.log('editing');
                }else if(vm.quote.quote_id == null) { //A new insert
                    data.append("transactionEventType", "PUT");
                    vm.quote.quote_enteredby_id = $rootScope.globals.currentUser.userDetails.authDetails.user_id;
                    data.append("factObjects", [JSON.stringify(vm.quote)]);

                    for (var i in vm.files) {
                        data.append("file[]", vm.files[i]);
                    }
                    DataService.post("inboundService", data, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined, 'Process-Data': false}
                    }).then( function (response) {
                        if(response.data.response == 'Failure'){
                            vm.error=response.data.message;
                            vm.isDisabled = false;
                            vm.dataLoading = false;
                        }else{
                            vm.error="Record submitted successfully";
                            //vm.goBack()
                        }
                        //vm.container[selectScope] = response.data.data;
                    });
                }
            }
        }])