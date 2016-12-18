/**
 * Created by ahassan on 10/31/16.
 */
angular.module('Logistics')
    .controller('LogisticsList', ['$scope', '$localStorage', '$stateParams', 'DataService','CommonServices'
        , function ($scope, $localStorage, $stateParams, DataService, CommonServices) {
            var vm = this;

            /*
             * This part gets all the quotes available in a tabular format
             */
            vm.edit = false;
            vm.quotes = []; //declare an empty array so as to show the "loading data" notice!
            vm.pageno = 1; // initialize page no to 1
            vm.total_count = 0;
            vm.itemsPerPage = 15; //this could be a dynamic value from a drop down
            CommonServices.postData.token = $localStorage.globals.currentUser.userDetails.token;
            vm.getData = function(pageno, filters) {
                vm.quotes = []; // Initially make list empty so as to show the "loading data" notice!
                var data=angular.copy(CommonServices.postData);
                data.factName = 'Quote q, Party p, QuoteStatus qs, Users u, QuoteDetail qd';
                /** We could exclude weekends in datediff using the following
                 * SELECT (5 * (DATEDIFF('2016-08-31', '2016-08-01') DIV 7) + MID('0123444401233334012222340111123400012345001234550', 7 * WEEKDAY('2016-08-01') + WEEKDAY('2016-08-31') + 2, 1))
                 */
                data.transactionMetaData.responseDataProperties = 'q.quote_id&q.rfq_no&p.name&CONCAT(LEFT(q.subject , 30),IF(LENGTH(q.subject)>30, "…", "")) subject&CONCAT(u.lastname,", ",u.middlename," ",u.firstname)enteredBy&qs.name status&COUNT(qd.Quote_quote_Id) totalQuotes&DATEDIFF(q.duedate,NOW())remDays&q.entrydate';
                data.transactionMetaData.pageno = pageno-1;
                data.transactionMetaData.itemsPerPage = vm.itemsPerPage;
                data.transactionMetaData.queryMetaData.queryClause.andExpression = [{
                    "propertyName": "q.po_no",
                    "propertyValue": 'NULL',
                    "propertyDataType": "VARCHAR",
                    "operatorType": "IS"
                }];
                if(angular.isDefined(filters)){
                    if(angular.isDefined(filters.andExpre)){
                        angular.forEach(filters.andExpre, function(andExpr){
                            data.transactionMetaData.queryMetaData.queryClause.andExpression.push(andExpr)
                        })
                    }
                }
                data.transactionMetaData.queryMetaData.joinClause = {
                    'joinType':['JOIN','JOIN','JOIN','LEFT JOIN'],'joinKeys':['q.Party_Party_Id=p.Party_Id','q.Quote_Status_Id=qs.QuoteStatus_Id','q.quote_enteredBy_id=u.user_id','q.quote_Id=qd.Quote_quote_Id']
                };
                data.transactionMetaData.groupingProperties.by = 'q.quote_Id';
                DataService.post('inboundService', data).then(function (response) {
                    vm.quotes = response.data.data;
                    vm.total_count = response.data.total_count;
                    if(vm.total_count <= 0){
                        vm.quotesLoading = "No quotes found!";
                    }
                })
            };
            vm.getData(vm.pageno);

            //Apply filters was clicked
            $scope.filters={}; vm.filterOpts={};
            vm.applyFilters = function(){
                vm.filterOpts.andExpre = [];
                if(angular.isDefined($scope.filters.rfqno)){
                    vm.filterOpts.andExpre.push({
                        "propertyName": "q.rfq_no",
                        "propertyValue": $scope.filters.rfqno,
                        "propertyDataType": "VARCHAR",
                        "operatorType": "LIKE"
                    })
                }
                vm.getData(vm.pageno, vm.filterOpts);
            }
        }])