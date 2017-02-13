/**
 * Created by ahassan on 10/31/16.
 */
angular.module('Logistics')
    .controller('LogisticsView', ['$scope', '$rootScope', '$localStorage', '$state', '$stateParams', 'DataService','CommonServices', 'WEB_ROOTS', '$window'
        , function ($scope, $rootScope, $localStorage, $state, $stateParams, DataService, CommonServices, WEB_ROOTS, $window) {
            var vm = this;

            /*
             * This part gets all the quotes available in a tabular format
             */
            //$scope.app.lgstcView = $state.current.name;
            $localStorage.lgstcView = $state.current.name;
            vm.edit = false;
            vm.quotes = []; //declare an empty array so as to show the "loading data" notice!
            vm.pageno = 1; // initialize page no to 1
            vm.total_count = 0;
            vm.itemsPerPage = 15; //this could be a dynamic value from a drop down
            CommonServices.postData.token = $localStorage.globals.currentUser.userDetails.token;
            vm.getData = function(pageno, filters) {
                vm.quotes = []; // Initially make list empty so as to show the "loading data" notice!
                var data=angular.copy(CommonServices.postData);
                data.factName = 'Quote q, QuoteCat qc, Party p, QuoteStatus qs, Users u, QuoteDetail qd';
                /** We could exclude weekends in datediff using the following
                 * SELECT (5 * (DATEDIFF('2016-08-31', '2016-08-01') DIV 7) + MID('0123444401233334012222340111123400012345001234550', 7 * WEEKDAY('2016-08-01') + WEEKDAY('2016-08-31') + 2, 1))
                 */
                data.transactionMetaData.responseDataProperties = 'q.quote_id&q.rfq_no&p.name&CONCAT(LEFT(q.subject , 30),IF(LENGTH(q.subject)>30, "…", "")) subject&CONCAT(u.lastname,", ",u.middlename," ",u.firstname)enteredBy&qs.name status&COUNT(qd.Quote_quote_Id) totalQuotes&DATEDIFF(q.duedate,NOW())remDays&q.entrydate&qc.po_is_approved'
                data.transactionMetaData.pageno = pageno-1;
                data.transactionMetaData.itemsPerPage = vm.itemsPerPage;
                data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                    //{
                    //    "propertyName": "q.po_no", "propertyValue": 'NULL', "propertyDataType": "VARCHAR", "operatorType": "IS NOT"
                    //}
                    //,{
                    //    "propertyName": "qd.quote_is_po", "propertyValue": '1', "propertyDataType": "VARCHAR", "operatorType": "="
                    //}
                    {
                        "propertyName": "qc.po_is_approved", "propertyValue": 'NULL', "propertyDataType": "VARCHAR", "operatorType": "IS NOT"
                    }
                ]
                if(angular.isDefined(filters)){
                    if(angular.isDefined(filters.andExpre)){
                        angular.forEach(filters.andExpre, function(andExpr, key){
                            data.transactionMetaData.queryMetaData.queryClause.andExpression.push(andExpr)
                        })
                    }
                }
                data.transactionMetaData.queryMetaData.joinClause = {
                    'joinType':['LEFT JOIN','JOIN','JOIN','JOIN','LEFT JOIN'],'joinKeys':['q.quote_id=qc.quote_id','q.Party_Party_Id=p.Party_Id','q.Quote_Status_Id=qs.QuoteStatus_Id','q.quote_enteredBy_id=u.user_id','q.quote_Id=qd.Quote_quote_Id']
                }
                data.transactionMetaData.groupingProperties.by = 'q.quote_Id';
                DataService.post('inboundService', data).then(function (response) {
                    vm.quotes = response.data.data || [];
                    vm.total_count = response.data.total_count;
                    if(vm.total_count <= 0){
                        vm.quotesLoading = "No quotes found!";
                    }
                })
            }
            vm.getData(vm.pageno);

            //Apply filters was clicked
            $scope.filters={}, vm.filterOpts={};
            vm.applyFilters = function(){
                vm.filterOpts.andExpre = []
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
            vm.genPo = function(quote_id){
                var data=angular.copy(CommonServices.postData);
                data.factName = 'Quote q, QuoteDetail qd';
                data.transactionMetaData.responseDataProperties = 'q.quote_id&q.rfq_no&q.po_no&q.po_is_split,qd.split_po_no'
                data.transactionMetaData.queryMetaData.joinClause = {
                    'joinType':['JOIN'],'joinKeys':['q.quote_Id=qd.Quote_quote_Id']
                }
                data.transactionMetaData.queryMetaData.queryClause.andExpression = [{
                        "propertyName": "q.quote_Id",
                        "propertyValue": quote_id,
                        "propertyDataType": "VARCHAR",
                        "operatorType": "="
                    },
                    {"propertyName": "qd.quote_is_po",
                        "propertyValue": 1,
                        "propertyDataType": "INT",
                        "operatorType": "="
                    }
                ];
                DataService.post('inboundService', data).then(function (response) {
                    var inMem = []
                    angular.forEach(response.data.data  , function(po) {
                        if(po.po_is_split == 1){
                            if(inMem.indexOf(po.split_po_no) == -1) {
                                inMem.push(po.split_po_no)
                            }
                        }else{
                            if(inMem.indexOf(po.po_no) == -1)   inMem.push(po.po_no)
                        }
                    });
                    /*
                    * We can directly output like so
                    * WEB_ROOTS.TOMCAT + "/birt/output?__report=report/base/po.rptdesign&&__dpi=96&__format=pdf&__pageoverflow=0&__overwrite=false"
                    * format=pdf, xlsx, etc something
                     */
                    if(inMem.length == 1){
                        $window.open(WEB_ROOTS.TOMCAT+"/frameset?__report=report/base/po.rptdesign&po_id="+inMem[0]);
                    }else if(inMem.length > 1){
                        angular.forEach(inMem  , function(split_po) {
                            $window.open(WEB_ROOTS.TOMCAT+"/frameset?__report=report/base/po.rptdesign&split_po_no="+split_po, "_blank");
                        });
                    }
                })
            }
        }])