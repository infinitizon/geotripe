angular.module('RFQ')
    .controller('QuoteController', ['$scope', '$location', '$rootScope','DataService','CommonServices','$http', '$uibModal',
        function ($scope, $location, $rootScope,DataService,CommonServices,$http, $uibModal) {
            $rootScope.pageTitle = "Quotes";
            $rootScope.pageHeader = "Quotes";

            var vm = this;
            vm.lineItems = [];
            /*
             * This part gets quotes summary by clients
             */
            CommonServices.postData.token = $rootScope.globals.currentUser.userDetails.token;
            vm.getQuoteSummary = function(pageno) {
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
                data.transactionMetaData.groupingProperties = 'p.Party_Id';
                DataService.post('quote', data).then(function (response) {
                    vm.quoteDash = response.data.data;
                    vm.total_count = response.data.total_count;
                    if(vm.total_count <= 0){
                        vm.quotesLoading = "No quotes found!";
                    }
                })
            }
            vm.getQuoteSummary();
        }])
    .controller('QuoteByStatusController', ['$scope', '$location', '$rootScope','DataService','CommonServices','$stateParams', '$uibModal',
        function ($scope, $location, $rootScope, DataService, CommonServices, $stateParams, $uibModal) {
            $rootScope.pageTitle = "Quotes";
            $rootScope.pageHeader = "Quotes";

            var vm = this;
            vm.lineItems = []

            vm.open = function (options) {
                switch(options.url) {
                    case 'quoteItems':
                        options.controller = 'quoteItemsController';
                        options.controllerAs = 'quotItmCtrl';
                        break;
                }
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'modules/quote/views/templates/'+options.url+'.html',
                    controller: options.controller,
                    controllerAs: options.controllerAs,
                    size: options.modalSize,
                    resolve:{
                        data  : function(){
                            return options.data || {};
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    console.log(selectedItem);
                    if(selectedItem.index != null){
                        vm.lineItems[selectedItem.index] = selectedItem;
                    }else{
                        vm.lineItems.push(selectedItem);
                    }
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
            };

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
                data.factName = 'Quote q, Party p, QuoteStatus qs, Users u, QuoteDetail qd';
                data.transactionMetaData.responseDataProperties = 'q.quote_id&q.rfq_no&p.name&CONCAT(LEFT(q.subject , 30),IF(LENGTH(q.subject)>30, "…", "")) subject&CONCAT(u.lastname,", ",u.middlename," ",u.firstname)enteredBy&qs.name status&COUNT(qd.Quote_quote_Id) totalQuotes'
                data.transactionMetaData.pageno = pageno-1;
                data.transactionMetaData.itemsPerPage = vm.itemsPerPage;
                data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                    {
                        "propertyName": "q.Party_Party_Id",
                        "propertyValue": $stateParams.client,
                        "propertyDataType": "BIGINT",
                        "operatorType": "="
                    }
                ];
                if($stateParams.clientStatus){
                    var clientStatus = {
                        "propertyName": "q.Quote_Status_Id",
                        "propertyValue": $stateParams.clientStatus,
                        "propertyDataType": "BIGINT",
                        "operatorType": "="
                    }
                    data.transactionMetaData.queryMetaData.queryClause.andExpression.push(clientStatus);
                }
                data.transactionMetaData.queryMetaData.joinClause = {
                    'joinType':['JOIN','JOIN','JOIN','LEFT JOIN'],'joinKeys':['q.Party_Party_Id=p.Party_Id','q.Quote_Status_Id=qs.QuoteStatus_Id','q.quote_enteredBy_id=u.user_id','q.quote_Id=qd.Quote_quote_Id']
                }
                data.transactionMetaData.groupingProperties = 'q.quote_Id';
                DataService.post('inboundService', data).then(function (response) {
                    vm.quotes = response.data.data;
                    vm.total_count = response.data.total_count;
                    if(vm.total_count <= 0){
                        vm.quotesLoading = "No quotes found!";
                    }
                })
            }
            vm.getData(vm.pageno);

            vm.goBack = function () {
                vm.edit=false;
                vm.getData(vm.pageno);
            };
            vm.deleteLineItem = function(index,id){
                if(id){
                    if(confirm("Are you sure you want to delete this line item. Action is irreversible!")){
                        var data=angular.copy(CommonServices.postData);
                        data.factName = 'QuoteDetail qd';
                        data.transactionEventType = "DELETE";
                        data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                            {
                                "propertyName": "QuoteDetail_Id",
                                "propertyValue": id,
                                "propertyDataType": "BIGINT",
                                "operatorType": "="
                            }
                        ];
                        DataService.post('quote', data).then(function (response) {
                            vm.lineItems.splice( index,1 );
                        });

                    }
                }else{
                    vm.lineItems.splice( index,1 );
                }

            }
            vm.editQuote = function (quoteId) {
                vm.isDisabled = false;
                vm.quoteFiles = vm.files = null;vm.lineItems = [];

                vm.edit=true;
                if(quoteId) {
                    vm.disableClient = false;
                    var data=angular.copy(CommonServices.postData);
                    data.factName = 'Quote q, Party p, QuoteStatus qs, Currency c, Users u, Users uu';
                    data.transactionMetaData.responseDataProperties = 'q.quote_id&q.rfq_no&q.eventowner&p.name party_party_id&qs.name quotestatus&c.code currency&q.entrydate&q.publishdate&q.duedate&q.approvedate&u.firstname&q.description&q.quote_approvedby_id&q.specificationandrequirement&concat(IFNULL(uu.firstname,""), ", ",IFNULL(uu.middlename,"")," ",IFNULL(uu.lastname,""))users_user_id';
                    data.transactionMetaData.queryMetaData.joinClause = {
                        'joinType':['JOIN','JOIN','JOIN','JOIN','LEFT JOIN'],'joinKeys':['q.Party_Party_Id=p.Party_Id','q.Quote_Status_Id=qs.QuoteStatus_Id','q.quote_currency_id=c.currency_id','q.quote_enteredBy_id=u.user_id','q.users_user_id=uu.user_id']
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
                        vm.quoteFiles = response.data.data['files'];

                        vm.originalQuoteData = angular.copy(vm.quote);
                        vm.originalQuoteData.publishdate = new Date(vm.originalQuoteData.publishdate);
                        vm.originalQuoteData.duedate = new Date(vm.originalQuoteData.duedate);
                        vm.quote.publishdate = new Date(vm.quote.publishdate);
                        vm.quote.duedate = new Date(vm.quote.duedate);

                        vm.total_count = response.data.total_count;
                    })
                    /*Now get the quote details*/
                    var data=angular.copy(CommonServices.postData);
                    data.factName = 'QuoteDetail qd, QuoteDetail_Manufacturer qdm';
                    data.transactionMetaData.responseDataProperties = 'qd.quotedetail_id&qd.serialnumber&qd.description&qd.price&qd.quantity&qd.quote_quote_id&group_concat(qdm.Party_Party_Id)Party_Party_Id';
                    data.transactionMetaData.queryMetaData.joinClause = {
                        'joinType':['JOIN'],'joinKeys':['qd.QuoteDetail_Id=qdm.QuoteDetail_QuoteDetail_Id']
                    }
                    data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                        {
                            "propertyName": "Quote_quote_Id",
                            "propertyValue": quoteId,
                            "propertyDataType": "BIGINT",
                            "operatorType": "="
                        }
                    ];
                    data.transactionMetaData.groupingProperties = 'qd.QuoteDetail_Id';
                    DataService.post('inboundService', data).then(function (response) {
                        if(response.data.data!=null){
                            delete response.data.data['files'];
                            angular.forEach(response.data.data , function(lineItem, key) {
                                var data=angular.copy(CommonServices.postData);
                                data.factName = 'Party p';
                                data.transactionMetaData.responseDataProperties = "concat('[',group_concat(concat('{"+'"party_id":"'+"',IFNULL(party_id,''),'"+'","name":"'+"',IFNULL(name,''),'"+'"}'+"')),']')manus";
                                data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                                    {
                                        "propertyName": "party_Id",
                                        "propertyValue": lineItem.Party_Party_Id,
                                        "propertyDataType": "BIGINT",
                                        "operatorType": "IN"
                                    }
                                ];
                                DataService.post('inboundService', data).then(function (response) {
                                    var items = {id:lineItem.quotedetail_id,matDesc:lineItem.description,qty:lineItem.quantity,manus:eval(response.data.data[0].manus)};
                                    vm.lineItems.push(items);
                                })
                            })
                        }
                        if(vm.lineItems.length <= 0){
                            vm.lineItemsLoading = "Click the + icon to add new items";
                        }else{
                            vm.originalLineItems = vm.lineItems;
                        }
                    })
                }else{
                    vm.lineItemsLoading = "Click the + icon to add new items";
                    vm.quote = null;
                    vm.lineItems = [];
                    vm.quoteFiles = null;
                    vm.disableClient = true;
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
            vm.getUsers = function(partyId){
                vm.getLOVs("Users","users", {"response":"user_id&concat(IFNULL(firstname,''), ', ',IFNULL(middlename,''),' ',IFNULL(lastname,''))name",'and':[{
                    'propertyName': 'user_party_id',
                    'propertyValue': partyId,
                    'propertyDataType': 'BIGINT',
                    'operatorType': '='
                }]});
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
                //I'm editing a quote here
                if(vm.quote.quote_id){
                    vm.changedObjs = CommonServices.GetFormChanges(vm.originalQuoteData,vm.quote);
                    if(+vm.originalQuoteData.publishdate == +vm.quote.publishdate){
                        delete vm.changedObjs["publishdate"];
                    }
                    if(+vm.originalQuoteData.duedate == +vm.quote.duedate){
                        delete vm.changedObjs["duedate"];
                    }
                    data.append("transactionEventType", "UPDATE");
                    data.append("putType", "many");
                    data.append("putOrder", "Quote-Quote_quote_Id,QuoteDetail-QuoteDetail_QuoteDetail_Id,QuoteDetail_Manufacturer");
                    vm.changedObjs['id'] = vm.quote.quote_id;
                    if( !angular.equals({}, vm.changedObjs) ){
                        data.append("factObjects[quote]", [JSON.stringify(vm.changedObjs)]);
                    }
                }else if(vm.quote.quote_id == null) { //A new insert
                    data.append("transactionEventType", "PUT");
                    data.append("putType", "many");
                    data.append("putOrder", "Quote-Quote_quote_Id,QuoteDetail-QuoteDetail_QuoteDetail_Id,QuoteDetail_Manufacturer");
                    vm.quote.quote_enteredby_id = $rootScope.globals.currentUser.userDetails.authDetails.user_id;
                    vm.quote.party_party_id = $stateParams.client; // This should be added when adding new quote
                    vm.quote.quote_status_id = 12141325; // Pending Approval...Hopefully this will not change
                    vm.quote.entrydate = new Date();
                    data.append("factObjects[quote]", [JSON.stringify(vm.quote)]);
                }
                //Check for the manufacturers
                vm.lineItems4Db = angular.copy(vm.lineItems);
                        //console.log(vm.lineItems);
                angular.forEach(vm.lineItems  , function(QuoteDetail, key) {
                    var QuoteDetail = {description: vm.lineItems[key].matDesc, quantity: vm.lineItems[key].qty};
                    if(vm.quote.quote_id) QuoteDetail.id =  vm.lineItems[key].id; //If we are editing then, we need to pass along the QuoteDetail id.
                    angular.forEach(vm.lineItems[key].manus  , function(QuoteManufacturer, key2) {
                        vm.lineItems4Db[key].manus[key2] = {party_party_id:QuoteManufacturer.party_id};
                        //console.log(vm.lineItems4Db[key].manus[key2]);
                    });
                    data.append("factObjects[QuoteDetail]["+key+"]", [JSON.stringify(QuoteDetail)]);
                    data.append("factObjects[QuoteDetail_Manufacturer]["+key+"]", [JSON.stringify(vm.lineItems4Db[key].manus)]);
                });
                //Check for files
                for (var i in vm.files) {
                    data.append("file[]", vm.files[i]);
                }
                //Post the data
                DataService.post("quote", data, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined, 'Process-Data': false}
                }).then( function (response) {
                    if(response.data.response == 'Failure'){
                        vm.error=response.data.message;
                        vm.isDisabled = false;
                        vm.dataLoading = false;
                    }else{
                        vm.error=response.data.message;
                        vm.isDisabled = false;
                        vm.dataLoading = false;
                        vm.lineItems = [];
                        vm.quoteFiles = null;
                        vm.goBack()
                    }
                    //vm.container[selectScope] = response.data.data;
                });
            }
        }])
    .controller('quoteItemsController', ['$scope','$rootScope','$uibModalInstance', 'data', 'DataService', 'CommonServices',
        function ($scope, $rootScope, $uibModalInstance,data,DataService,CommonServices)  {
            var vm = this;
            vm.insertingManu = false;
            vm.showNewManu = true;

            vm.data = data;
            vm.indexSelected = null;
            if(vm.data.item){
                vm.indexSelected = vm.data.index;
                vm.id = vm.data.item.id;
                vm.matdesc = vm.data.item.matDesc;
                vm.qty = vm.data.item.qty;
                vm.selectedManufacturers = vm.data.item.manus;
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
                if(vm.newManu){
                    vm.errorMsg = false;
                    vm.insertingManu = true;
                    var data=angular.copy(CommonServices.postData);
                    data.factName = 'Party';
                    data.transactionEventType = "PUT"
                    data.factObjects = [{party_partytype_id:201607132,partystatus_partystatus_id:1011,isactive:1,name:vm.newManu}];
                    DataService.post('inboundService', data).then(function (response) {
                        vm.manufacturers.push({party_partytype_id:response.data.data.insertId, name:vm.newManu});
                        vm.insertingManu = false;
                        vm.newManu = '';
                    });
                }else{
                    vm.errorMsg = true;
                }
            }
            vm.addLineItems = function () {
                vm.allergies={
                    "index":vm.indexSelected,
                    "id":vm.id,
                    "matDesc":vm.matdesc,
                    "qty":vm.qty,
                    "manus":vm.selectedManufacturers
                }
                $uibModalInstance.close(vm.allergies);
            }
        }])
    .filter('propsFilter', function() {
        return function(items, props) {
            var out = [];

            if (angular.isArray(items)) {
                var keys = Object.keys(props);

                items.forEach(function(item) {
                    var itemMatches = false;

                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    });