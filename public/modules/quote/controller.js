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
    .controller('QuoteByStatusController', ['$http', '$scope', '$location', '$rootScope','DataService','CommonServices','$stateParams', '$uibModal', 'ImportExportToExcel',
        function ($http, $scope, $location, $rootScope, DataService, CommonServices, $stateParams, $uibModal,ImportExportToExcel) {
            $rootScope.pageTitle = "Quotes";
            $rootScope.pageHeader = "Quotes";

            var vm = this;
            vm.uploads = [];
            //console.log(CommonServices.fmtNum(123456789.12345, {dp:0}) );
            vm.addNewFile = function(){
                vm.uploads.push({
                    'documentType': {},
                    'myFile': ''
                });
            }
            vm.openPDF = function (resData, fileName) {
                var ieEDGE = navigator.userAgent.match(/Edge/g);
                var ie = navigator.userAgent.match(/.NET/g); // IE 11+
                var oldIE = navigator.userAgent.match(/MSIE/g);

                var blob = new window.Blob([resData], { type: 'application/pdf' });

                if (ie || oldIE || ieEDGE) {
                    window.navigator.msSaveBlob(blob, fileName);
                }
                else {
                    var reader = new window.FileReader();
                    reader.onloadend = function () {
                        window.location.href = reader.result;
                    };
                    reader.readAsDataURL(blob);
                }
            }
            vm.downFile = function(file){
                window.open(file.docPath);
            }
            vm.deleteFile = function(file){
                if(confirm("Are you sure you want to delete this file")){
                    var index = vm.quoteFiles.indexOf(file);

                    var data=angular.copy(CommonServices.postData);
                    data.factName = 'Document';
                    data.transactionEventType = "DELETE"
                    data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                        {
                            "propertyName": "doc_id",
                            "propertyValue": file.doc_id,
                            "propertyDataType": "BIGINT",
                            "operatorType": "="
                        }
                    ];
                    DataService.post('inboundService', data).then(function (response) {
                        if(response.data.response == 'Success'){
                            vm.quoteFiles.splice(index, 1);
                        };
                    });
                }
            }
            vm.lineItems = []
            vm.checkTheBox = function(e){
                console.log(e);
                console.log(e.target);
            }
            vm.export = function (quoteId) {
                var toExport = [];
                angular.forEach(vm.lineItems , function(lineItem, key) {
                    var items = {
                        id:lineItem.id,partno_modelno:lineItem.partno_modelno,'MaterialDesciption':lineItem.matDesc,qty:lineItem.qty
                    };
                    if(quoteId) {
                        items['UOM'] = (lineItem.unitofmeasure) ? lineItem.unitofmeasure.name : '';
                        items['Unit Price'] = lineItem.unitprice;
                        items['oem_description'] = lineItem.oem_description;
                        //items['Cross Rate'] = lineItem.crossrrate;
                        //items['Unit Price (USD)'] = lineItem.unit_price_usd;
                        //items['MFR Total'] = lineItem.mfr_total;
                        //items['Cert Of Origin'] = lineItem.certOfOrigin;
                        //items['Weight'] = lineItem.weight;
                        //items['G/F'] = lineItem.g_f;
                        //items['Packaging'] = lineItem.packaging;
                        //items['INT/F'] = lineItem.int_f;
                        //items['INS@0.35%'] = lineItem.ins;
                        //items['CIF'] = lineItem.cif;
                        //items['Custom@20%'] = lineItem.custom;
                        //items['SURCH@7%'] = lineItem.surch;
                        //items['CISS@1%'] = lineItem.ciss;
                        //items['ETLS@0.5%'] = lineItem.etls;
                        //items['VAT@5%'] = lineItem.vat;
                        //items['NAFDAC/SONCAP'] = lineItem.nafdac_soncap;
                        //items['Clearing'] = lineItem.clearing;
                        //items['Sub Total'] = lineItem.sub_total;
                        //items['Goods In Transit INS@0.35%'] = lineItem.goods_in_transit;
                        //items['LT/ONNE'] = lineItem.lt_onne;
                        //items['BCH'] = lineItem.bch;
                        //items['F/R'] = lineItem.f_r;
                        //items['COF'] = lineItem.cof;
                        //items['TOTAL1'] = lineItem.total1;
                        //items['MK UP@8%'] = lineItem.mk_up;
                        //items['TOTAL2'] = lineItem.total2;
                        //items['nlcf@1%'] = lineItem.nlcf;
                        //items['TOTAL3'] = lineItem.total3;
                        //items['U/P@7.2%'] = lineItem.u_p;
                    }
                    toExport.push(items);
                });
                ImportExportToExcel.exportToExcel('RFQ_from_ERP', toExport);
            };
            $scope.$on('import-excel-data', function (e, values) {
                var originalLineItems=angular.copy(vm.lineItems);
                vm.lineItems = [];
                angular.forEach(values, function(lineItem, key) {
                    var items = {};
                    items.id=lineItem.id;
                    angular.forEach(originalLineItems, function(old, key) {
                        if(old.id == lineItem.id){
                            items.manus = old.manus;
                            items.unitofmeasure = old.unitofmeasure;
                        }
                    });
                    items.matDesc=lineItem['MaterialDesciption'];
                    items.oem_description=lineItem['oem_description'];
                    items.qty=lineItem.qty;
                    item.partno_modelno=lineItem.partno_modelno;
                    items.unitprice=lineItem['Unit Price'];
                    //items.crossrrate=lineItem['Cross Rate'];
                    //items.unit_price_usd=lineItem['Unit Price (USD)'];
                    //items.mfr_total=lineItem['MFR Total'];
                    //items.certOfOrigin=lineItem['Cert Of Origin'];
                    //items.weight=lineItem['Weight'];
                    //items.g_f=lineItem['G/F'];
                    //items.packaging=lineItem['Packaging'];
                    //items.int_f=lineItem['INT/F'];
                    //items.ins=lineItem['INS@0.35%'];
                    //items.cif=lineItem['CIF'];
                    //items.custom=lineItem['Custom@20%'];
                    //items.surch=lineItem['SURCH@7%'];
                    //items.ciss=lineItem['CISS@1%'];
                    //items.etls=lineItem['ETLS@0.5%'];
                    //items.vat=lineItem['VAT@5%'];
                    //items.nafdac_soncap=lineItem['NAFDAC/SONCAP'];
                    //items.clearing=lineItem['Clearing'];
                    //items.sub_total=lineItem['Sub Total'];
                    //items.goods_in_transit=lineItem['Goods In Transit INS@0.35%'];
                    //items.lt_onne=lineItem['LT/ONNE'];
                    //items.bch=lineItem['BCH'];
                    //items.f_r=lineItem['F/R'];
                    //items.cof=lineItem['COF'];
                    //items.total1=lineItem['TOTAL1'];
                    //items.mk_up=lineItem['MK UP@8%'];
                    //items.total2=lineItem['TOTAL2'];
                    //items.nlcf=lineItem['nlcf@1%'];
                    //items.total3=lineItem['TOTAL3'];
                    //items.u_p=lineItem['U/P@7.2%'];
                    vm.lineItems.push(items);
                });
                $scope.$apply()
            });

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
                    if(selectedItem.index != null){
                        vm.lineItems[selectedItem.index] = selectedItem;
                    }else{
                        vm.lineItems.push(selectedItem);
                    }
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
            };

            vm.getDueDateDisplay = function(numDays, status){
                if(status == "In Progress"){
                    if(numDays < 0){
                        return 'Expired';
                    }else if(numDays == 0){
                        return "Expiring today";
                    }else{
                        return numDays;
                    }
                }else if(status == "TQ"){
                    return 'Pending TQ clearance';
                }else if(status == "Submitted"){
                    return 'Done';
                }
            }

            /*
             * This part gets all the quotes available in a tabular format
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
                /** We could exclude weekends in datediff using the following
                 * SELECT (5 * (DATEDIFF('2016-08-31', '2016-08-01') DIV 7) + MID('0123444401233334012222340111123400012345001234550', 7 * WEEKDAY('2016-08-01') + WEEKDAY('2016-08-31') + 2, 1))
                 */
                data.transactionMetaData.responseDataProperties = 'q.quote_id&q.rfq_no&p.name&CONCAT(LEFT(q.subject , 30),IF(LENGTH(q.subject)>30, "…", "")) subject&CONCAT(u.lastname,", ",u.middlename," ",u.firstname)enteredBy&qs.name status&COUNT(qd.Quote_quote_Id) totalQuotes&DATEDIFF(q.duedate,NOW())remDays&q.entrydate'
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
                vm.uploads = [];
                vm.isDisabled = false;
                vm.quoteFiles = vm.files = null;vm.lineItems = [];

                vm.edit=true;
                if(quoteId) {
                    vm.disableClient = false;
                    var data=angular.copy(CommonServices.postData);
                    data.factName = 'Quote q, Party p, QuoteStatus qs, Currency c, Users u, Users uu';
                    data.transactionMetaData.responseDataProperties = 'q.quote_id&q.rfq_no&q.eventowner&p.name party_party_id&q.quote_status_id&qs.name quotestatus&c.code quote_currency_id&q.entrydate&q.publishdate&q.duedate&q.approvedate&u.firstname&q.description&q.quote_approvedby_id&q.specificationandrequirement&concat(IFNULL(uu.firstname,""), ", ",IFNULL(uu.middlename,"")," ",IFNULL(uu.lastname,""))users_user_id';
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

                        vm.tqChecked = (vm.quote.quote_status_id==12141326)?true:false;
                        vm.submittedChecked = (vm.quote.quote_status_id==12141324)?true:false;
                        vm.submittedDisabled = vm.submittedChecked;

                        vm.total_count = response.data.total_count;
                    })
                    /*Now get the quote details*/
                    var data=angular.copy(CommonServices.postData);
                    data.factName = 'QuoteDetail qd, UnitOfMeasure uom, QuoteDetail_Manufacturer qdm';
                    data.transactionMetaData.responseDataProperties = "qd.quotedetail_id&qd.quote_quote_id&qd.quantity&qd.partno_modelno&qd.description&qd.oem_description&unitprice&group_concat(qdm.Party_Party_Id)Party_Party_Id&concat('{"+'"unitofmeasure_id":"'+"',uom.unitofmeasure_id,'"+'","name":"'+"',uom.name,'"+'"}'+"')unitofmeasure&qd.crossrrate&qd.unit_price_usd&qd.mfr_total&qd.certOfOrigin&qd.weight&qd.g_f&qd.packaging&qd.int_f&qd.ins&qd.cif&qd.custom&qd.surch&qd.ciss&qd.etls&qd.vat&qd.nafdac_soncap&qd.clearing&qd.sub_total&qd.goods_in_transit&qd.lt_onne&qd.bch&qd.f_r&qd.cof&qd.total1&qd.mk_up&qd.nlcf&qd.total3&qd.u_p";
                    data.transactionMetaData.queryMetaData.joinClause = {
                        'joinType':['LEFT JOIN','JOIN'],'joinKeys':['qd.unitofmeasure=uom.unitofmeasure_id','qd.QuoteDetail_Id=qdm.QuoteDetail_QuoteDetail_Id']
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
                                    var items = {
                                        id:lineItem.quotedetail_id, partno_modelno:lineItem.partno_modelno, matDesc:lineItem.description
                                        , oem_description:lineItem.oem_description, qty:lineItem.quantity, manus:JSON.parse(response.data.data[0].manus)
                                        , unitofmeasure:JSON.parse(lineItem.unitofmeasure)
                                    };
                                    items.unitprice = lineItem.unitprice;
                                    //items.unit_price_usd = lineItem.crossrrate;
                                    //items.crossrrate = lineItem.crossrrate;
                                    //items.mfr_total = lineItem.mfr_total;
                                    //items.certOfOrigin = lineItem.certOfOrigin;
                                    //items.weight = lineItem.weight;
                                    //items.g_f = lineItem.g_f;
                                    //items.packaging = lineItem.packaging;
                                    //items.int_f = lineItem.int_f;
                                    //items.ins = lineItem.ins;
                                    //items.cif = lineItem.cif;
                                    //items.custom = lineItem.custom;
                                    //items.surch = lineItem.surch;
                                    //items.ciss = lineItem.ciss;
                                    //items.etls = lineItem.etls;
                                    //items.vat = lineItem.vat;
                                    //items.nafdac_soncap = lineItem.nafdac_soncap;
                                    //items.clearing = lineItem.clearing;
                                    //items.sub_total = lineItem.sub_total;
                                    //items.goods_in_transit = lineItem.goods_in_transit;
                                    //items.lt_onne = lineItem.lt_onne;
                                    //items.bch = lineItem.bch;
                                    //items.f_r = lineItem.f_r;
                                    //items.cof = lineItem.cof;
                                    //items.total1 = lineItem.total1;
                                    //items.mk_up = lineItem.mk_up;
                                    //items.total2 = lineItem.total2;
                                    //items.nlcf = lineItem.nlcf;
                                    //items.total3 = lineItem.total3;
                                    //items.u_p = lineItem.u_p;
                                    vm.lineItems.push(items);
                                    vm.originalLineItems = angular.copy(vm.lineItems);
                                })
                            })
                        }
                        if(vm.lineItems.length <= 0){
                            vm.lineItemsLoading = "Click the + icon to add new items";
                        }else{
                            vm.originalLineItems = angular.copy(vm.lineItems);;
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

            vm.supervisor = function(quoteId){
                var i = 0;
                angular.forEach($rootScope.globals.currentUser.userDetails.authRoles  , function(authRole, key) {
                    if (quoteId && "RFQ_SUPERVISOR,RFQ_ADMIN,SUPPORT_ADMIN".indexOf(authRole.Name) >= 0){
                        i++;
                    }
                });
                return (i>0)?true:false;
            }
            vm.getLOVs = function(factName, selectScope, options) {
                if (vm.container[selectScope] == null) {
                    if(options.placeholder) vm.container[options.placeholder] = 'Loading...';
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
            vm.getUsers = function(partyId){
                vm.getLOVs("Users","users", {"response":"user_id&concat(IFNULL(firstname,''), ', ',IFNULL(middlename,''),' ',IFNULL(lastname,''))name",'and':[{
                    'propertyName': 'user_party_id',
                    'propertyValue': partyId,
                    'propertyDataType': 'BIGINT',
                    'operatorType': '='
                }]});
            }
            CommonServices.postData.token = $rootScope.globals.currentUser.userDetails.token;

            vm.postData = function () {
                vm.isDisabled = true; //Disable submit button
                vm.dataLoading = true; //Disable submit button
                //FILL FormData WITH FILE DETAILS.
                var data = new FormData();
                data.append("factName", "Quote");
                data.append("token", $rootScope.globals.currentUser.userDetails.token);
                data.append("transactionMetaData[currentLocale]", "NG");
                data.append("transactionMetaData[queryStore]", "MySql");
                //  Lets deal with the files first
                if(vm.uploads){
                    angular.forEach(vm.uploads, function(lineItem, key) {
                        console.log(lineItem.documentType.documentType_id)
                        data.append("factObjects[fileType]["+key+"]", lineItem.documentType.documentType_id);
                        var file = lineItem.myFile;
                        data.append("file["+key+"]", file);
                    });
                }
                //I'm editing a quote here
                if(vm.quote.quote_id){
                    vm.changedObjs = CommonServices.GetFormChanges(vm.originalQuoteData,vm.quote);
                    (vm.submittedChecked==true && vm.originalQuoteData.quote_status_id != 12141324) ? vm.changedObjs["quote_status_id"] = 12141324 : ''; // If we checked the button to submit
                    (vm.tqChecked==true && vm.originalQuoteData.quote_status_id != 12141326) ? vm.changedObjs["quote_status_id"] = 12141326 : ''; // If we checked the button to submit
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
                vm.originalLineItems4Db = vm.originalLineItems;
                angular.forEach(vm.lineItems  , function(QuoteDetail, key) {
                    var QuoteDetail = {partno_modelno:vm.lineItems[key].partno_modelno,description: vm.lineItems[key].matDesc, quantity: vm.lineItems[key].qty};
                    if(vm.quote.quote_id){
                        QuoteDetail.oem_description = vm.lineItems[key].oem_description;
                        QuoteDetail.unitofmeasure = (vm.lineItems[key].unitofmeasure)?vm.lineItems[key].unitofmeasure.unitofmeasure_id:null;
                        QuoteDetail.unitprice = vm.lineItems[key].unitprice;
                        //QuoteDetail.crossrrate = vm.lineItems[key].crossrrate;
                        //QuoteDetail.unit_price_usd = vm.lineItems[key].unit_price_usd;
                        //QuoteDetail.mfr_total = vm.lineItems[key].mfr_total;
                        //QuoteDetail.certOfOrigin = vm.lineItems[key].certOfOrigin;
                        //QuoteDetail.weight = vm.lineItems[key].weight;
                        //QuoteDetail.g_f = vm.lineItems[key].g_f;
                        //QuoteDetail.packaging = vm.lineItems[key].packaging;
                        //QuoteDetail.int_f = vm.lineItems[key].int_f;
                        //QuoteDetail.ins = vm.lineItems[key].ins;
                        //QuoteDetail.cif = vm.lineItems[key].cif;
                        //QuoteDetail.custom = vm.lineItems[key].custom;
                        //QuoteDetail.surch = vm.lineItems[key].surch;
                        //QuoteDetail.ciss = vm.lineItems[key].ciss;
                        //QuoteDetail.etls = vm.lineItems[key].etls;
                        //QuoteDetail.vat = vm.lineItems[key].vat;
                        //QuoteDetail.nafdac_soncap = vm.lineItems[key].nafdac_soncap;
                        //QuoteDetail.clearing = vm.lineItems[key].clearing;
                        //QuoteDetail.sub_total = vm.lineItems[key].sub_total;
                        //QuoteDetail.goods_in_transit = vm.lineItems[key].goods_in_transit;
                        //QuoteDetail.lt_onne = vm.lineItems[key].lt_onne;
                        //QuoteDetail.bch = vm.lineItems[key].bch;
                        //QuoteDetail.f_r = vm.lineItems[key].f_r;
                        //QuoteDetail.cof = vm.lineItems[key].cof;
                        //QuoteDetail.total1 = vm.lineItems[key].total1;
                        //QuoteDetail.mk_up = vm.lineItems[key].mk_up;
                        //QuoteDetail.total2 = vm.lineItems[key].total2;
                        //QuoteDetail.nlcf = vm.lineItems[key].nlcf;
                        //QuoteDetail.total3 = vm.lineItems[key].total3;
                        //QuoteDetail.u_p = vm.lineItems[key].u_p;
                    }
                    angular.forEach(vm.lineItems[key].manus  , function(QuoteManufacturer, key2) {
                        vm.lineItems4Db[key].manus[key2] = {party_party_id:QuoteManufacturer.party_id};
                        //console.log(vm.lineItems4Db[key].manus[key2]);
                    });
                    if(vm.quote.quote_id){
                        QuoteDetail.id =  vm.lineItems[key].id; //If we are editing then, we need to pass along the QuoteDetail id.
                        angular.forEach(vm.originalLineItems[key].manus  , function(QuoteManufacturer, key2) {
                            vm.originalLineItems4Db[key].manus[key2] = {party_party_id:QuoteManufacturer.party_id};
                        });
                        data.append("factObjects[QuoteDetail_ManufacturerOld]["+key+"]", [JSON.stringify(vm.originalLineItems4Db[key].manus)]);
                    }
                    data.append("factObjects[QuoteDetail]["+key+"]", [JSON.stringify(QuoteDetail)]);
                    data.append("factObjects[QuoteDetail_Manufacturer]["+key+"]", [JSON.stringify(vm.lineItems4Db[key].manus)]);
                });
                //Check for files

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

            vm.data = data;
            vm.indexSelected = null;
            if(vm.data.item){
                vm.indexSelected = vm.data.index;
                vm.id = vm.data.item.id;
                vm.partno_modelno = vm.data.item.partno_modelno;
                vm.matdesc = vm.data.item.matDesc;
                vm.oem_description = vm.data.item.oem_description;
                vm.qty = vm.data.item.qty;
                vm.unitprice = vm.data.item.unitprice;
                vm.selectedManufacturers = vm.data.item.manus;
                if(vm.data.item.unitofmeasure) {
                    vm.getLOVs('unitofmeasure', 'unitofmeasures', {
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
                vm.lineItemsAdded={
                    "index":vm.indexSelected,
                    "id":vm.id,
                    "partno_modelno":vm.partno_modelno,
                    "matDesc":vm.matdesc,
                    "oem_description":vm.oem_description,
                    "qty":vm.qty,
                    "manus":vm.selectedManufacturers,
                    "unitofmeasure":vm.unitofmeasure,
                    "unitprice":vm.unitprice,
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
                $uibModalInstance.close(vm.lineItemsAdded);
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