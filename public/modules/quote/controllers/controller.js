angular.module('RFQ')
    .controller('QuoteByStatusController', ['$http', '$scope', '$location', '$localStorage', '$filter', 'DataService','CommonServices','$stateParams', '$modal', 'ImportExportToExcel',
        function ($http, $scope, $location, $localStorage, $filter, DataService, CommonServices, $stateParams, $modal,ImportExportToExcel) {
            var vm = this;

            vm.reset=function(){
                vm.uploads = [];
                vm.container = {};
                if(vm.quote){
                    if(!vm.quote.quote_id){
                        var date = new Date();
                        vm.publishDateMin = date.setDate((new Date()).getDate() - 14);
                    }
                }
            }
            vm.reset();

            vm.checkSubmitted = function(event) {
                if(vm.lineItems.length > 0 && event.target.checked){
                    angular.forEach(vm.lineItems, function (lineItem) {
                        lineItem.submitted=true;
                    })
                }
            }
            vm.checkOneSubmitted = function(event){
                if(!event.target.checked){
                    vm.submittedChecked = false;
                }
            }

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
            vm.export = function (quoteId) {
                var toExport = [];
                angular.forEach(vm.lineItems , function(lineItem, key) {
                    var items = {
                        id:lineItem.id, partno_modelno:(lineItem.partno_modelno||''), 'MaterialDesciption':(lineItem.matDesc||''), qty:(lineItem.qty||''), Manufacturer:(lineItem.manus?lineItem.manus[0].name:'')
                    };
                    if(quoteId) {
                        items['OEMDesciption'] = (lineItem.oem_description||'');
                        items['UOM'] = (lineItem.unitofmeasure) ? lineItem.unitofmeasure.name : '';
                        items['OEM Unit Price'] = (lineItem.oem_unitprice||'');
                        items['Unit Price'] = (lineItem.unitprice||'');
                    }
                    toExport.push(items);
                });
                ImportExportToExcel.exportToExcel('RFQ_from_ERP', toExport);
            };
            $scope.$on('import-excel-data', function (e, values) {

                var ids = 0;
                angular.forEach(values, function(xlLine) {
                    if(xlLine.id) ids++;
                })
                var doimport=function(){
                    var originalLineItems=angular.copy(vm.lineItems);
                    vm.lineItems = [];
                    vm.lineItemsLoading = 'Attempting to import the line items';
                    var data=angular.copy(CommonServices.postData);
                    data.factName = 'Party p';
                    data.transactionMetaData.responseDataProperties = 'p.party_id&p.party_partytype_id&p.name';
                    data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                        {
                            "propertyName": "p.party_partytype_id",
                            "propertyValue": 201607132,
                            "propertyDataType": "VARCHAR",
                            "operatorType": "LIKE"
                        }
                    ];
                    var error={qty:0,uprice:0,ouprice:0,mEmail:0,mAddr:0,mCtry:0};
                    DataService.post('inboundService', data).then(function (response) {
                        var manus = response.data.data;

                        var data=angular.copy(CommonServices.postData);
                        data.factName = 'UnitOfMeasure uom';
                        data.transactionMetaData.responseDataProperties = 'uom.unitofmeasure_id&uom.name';
                        DataService.post('inboundService', data).then(function (response) {
                            var uoms = response.data.data;

                            var tempLineItem = [];
                            angular.forEach(values, function(xlLine) {
                                var items = {};
                                items.id=xlLine.id;

                                var manuFound = false;
                                for(var i = 0; i < manus.length; i++) {
                                    if (manus[i].name == xlLine['Manufacturer']) {
                                        items.manus = [{'party_id':manus[i].party_id, 'name':manus[i].name }];
                                        manuFound = true;
                                        break;
                                    }
                                };
                                if(!manuFound && xlLine['Manufacturer'] != ''){
                                    console.log(xlLine['ManufacturerEmail'])
                                    if(xlLine['ManufacturerEmail']=='' || !(xlLine['ManufacturerEmail'])){
                                        alert(xlLine['Manufacturer']+"'s email does not exist. You need to enter the column for 'ManufacturerEmail' for the new manufacturer "+xlLine['Manufacturer']);
                                        error.mEmail++;
                                    }else if(xlLine['ManufacturerAddress']=='' || !(xlLine['ManufacturerAddress'])){
                                        alert(xlLine['Manufacturer']+"'s Address does not exist. You need to enter the column for 'ManufacturerAddress' for the new manufacturer "+ xlLine['Manufacturer']);
                                        error.mAddr++;
                                    }else{
                                        var data=angular.copy(CommonServices.postData);
                                        data.factName = 'Party';
                                        data.transactionEventType = "PUT"
                                        data.factObjects = [
                                            {
                                                party_partytype_id:201607132, partystatus_partystatus_id:1011, isactive:1
                                                , name:xlLine['Manufacturer'], emailaddress:xlLine['ManufacturerEmail'], addressline1:xlLine['ManufacturerAddress']
                                            }];
                                        DataService.post('inboundService', data).then(function (response) {
                                            items.manus = [{'party_id':response.data.data.insertId, 'name':xlLine['Manufacturer'] }];
                                        });
                                    }
                                }

                                var uomFound = false;
                                for(var i = 0; i < uoms.length; i++) {
                                    if (uoms[i].name == xlLine['UOM']) {
                                        items.unitofmeasure= {'unitofmeasure_id':uoms[i].unitofmeasure_id, 'name':uoms[i].name };
                                        uomFound = true;
                                        break;
                                    }
                                };
                                if(!uomFound && xlLine['UOM'] != ''){
                                    var data=angular.copy(CommonServices.postData);
                                    data.factName = 'UnitOfMeasure';
                                    data.transactionEventType = "PUT"
                                    data.factObjects = [{name:xlLine['UOM']}];
                                    DataService.post('inboundService', data).then(function (response) {
                                        items.manus = [{'unitofmeasure_id':response.data.data.insertId, 'name':xlLine['UOM'] }];
                                    });
                                }
                                items.matDesc=xlLine['MaterialDesciption'];
                                items.oem_description=xlLine['OEMDesciption'];
                                (!xlLine.qty || xlLine.qty==0) ? error.qty++ : items.qty=xlLine.qty; ////
                                items.partno_modelno=xlLine.partno_modelno;
                                if(vm.quote.quote_id){
                                    (!xlLine['Unit Price'] || xlLine['Unit Price']==0) ? error.uprice++ : items.unitprice=xlLine['Unit Price'];
                                    (!xlLine['OEM Unit Price'] || xlLine['OEM Unit Price']==0) ? error.ouprice++ : items.oem_unitprice=xlLine['OEM Unit Price'];
                                }

                                tempLineItem.push(items);
                            });
                            if(error.qty>0){
                                alert("Error: Some line item 'quantities' are zero (0). Quantity cannot be 0"); vm.lineItems =[]; return;
                            }else if(error.uprice > 0){
                                alert("Error: Some line item 'unit price' are zero (0). Unit Price cannot be 0"); vm.lineItems =[]; return;
                            }else if(error.ouprice > 0){
                                alert("Error: Some line item 'OEM Unit Price' are zero (0). OEM Unit Price cannot be 0"); vm.lineItems =[]; return;
                            }else if(error.mEmail > 0 || error.mAddr > 0){

                            }else{
                                vm.lineItems=tempLineItem;
                            }
                        });
                    });
                }
                if(ids>0) {
                    if(confirm('Some line items have ids already attached, This would override existing line items.\n Continue?')) {
                        doimport();
                    }
                }else{
                    doimport();
                }
                $scope.$apply()
            });

            vm.open = function (options) {
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'modules/quote/views/templates/'+options.url+'.html',
                    controller: 'quoteItemsController',
                    controllerAs: 'quotItmCtrl',
                    size: options.modalSize,
                    resolve:{
                        data  : function(){
                            return options.data || {};
                        },
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['modules/quote/controllers/templates/quoteItems.tpls.js']);
                        }]
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    if( !angular.equals({}, selectedItem) ) {
                        if (selectedItem.index != null) {
                            //console.log(selectedItem);
                            vm.lineItems[selectedItem.index] = selectedItem;
                        } else {
                            vm.lineItems.push(selectedItem);
                        }
                    }
                }, function () {
                    // What should happen when modal is dismissed
                    console.log('Modal dismissed at: ' + new Date()); 
                });
            };

            vm.getDueDateDisplay = function(numDays, status){
                if(status == "In Progress"|| status == "Partially Submitted"){
                    if(numDays < 0){
                        return 'Expired';
                    }else if(numDays == 0){
                        return "Expiring today";
                    }else{
                        return numDays;
                    }
                }else if(status == "TQ" || status == "TQ on line Item"){
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
            CommonServices.postData.token = $localStorage.globals.currentUser.userDetails.token;
            vm.getData = function(pageno, filters) {
                vm.quotes = []; // Initially make list empty so as to show the "loading data" notice!
                var data=angular.copy(CommonServices.postData);
                data.factName = 'Quote q, Party p, QuoteStatus qs, Users u, QuoteDetail qd';
                /** We could exclude weekends in datediff using the following
                 * SELECT (5 * (DATEDIFF('2016-08-31', '2016-08-01') DIV 7) + MID('0123444401233334012222340111123400012345001234550', 7 * WEEKDAY('2016-08-01') + WEEKDAY('2016-08-31') + 2, 1))
                 *
                 * Similarly, we can use CONCAT("[",GROUP_CONCAT(CONCAT("{quantity:",qd.quantity,",unitprice:",qd.unitprice,"}")),"]") for showPrint
                 */
                data.transactionMetaData.responseDataProperties = 'q.quote_id&q.rfq_no&p.name&CONCAT(LEFT(q.subject , 30),IF(LENGTH(q.subject)>30, "…", "")) subject&CONCAT(u.lastname,", ",u.middlename," ",u.firstname)enteredBy&(CASE WHEN SUM(qd.tq)>0 AND SUM(qd.submitted) >0 AND (SUM(qd.tq)+ SUM(qd.submitted))<COUNT(qd.Quote_quote_Id) THEN "Partially Submitted" WHEN SUM(qd.tq)>0 THEN "TQ on line Item(s)" ELSE qs.name END) status&COUNT(qd.Quote_quote_Id) totalQuotes&CONCAT("quantity:",qd.quantity,"unitprice:",qd.unitprice) showPrint&DATEDIFF(q.duedate,NOW())remDays&q.entrydate&SUM(qd.submitted)submitted&SUM(qd.tq)tq'
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
                if(angular.isDefined(filters)){
                    if(angular.isDefined(filters.having)){
                        angular.forEach(filters.having, function(havingExpr){
                            data.transactionMetaData.groupingProperties.having.push(havingExpr)
                        })
                    }
                    if(angular.isDefined(filters.andExpre)){
                        angular.forEach(filters.andExpre, function(andExpr){
                            data.transactionMetaData.queryMetaData.queryClause.andExpression.push(andExpr)
                        })
                    }
                }
                data.transactionMetaData.queryMetaData.joinClause = {
                    'joinType':['JOIN','JOIN','JOIN','LEFT JOIN'],'joinKeys':['q.Party_Party_Id=p.Party_Id','q.Quote_Status_Id=qs.QuoteStatus_Id','q.quote_enteredBy_id=u.user_id','q.quote_Id=qd.Quote_quote_Id']
                }
                data.transactionMetaData.groupingProperties.by = 'q.quote_Id';
                DataService.post('inboundService', data).then(function (response) {
                    vm.quotes = response.data.data || [];
                    vm.total_count = response.data.total_count;

                    if(vm.total_count <= 0) vm.quotesLoading = "No quotes found!";
                })
            }
            vm.getData(vm.pageno);
            $scope.filters={}, vm.filterOpts={};
            vm.applyFilters = function(){
                vm.filterOpts.andExpre =[],vm.filterOpts.having = [];
                if(angular.isDefined($scope.filters.rfqno)){
                    vm.filterOpts.andExpre.push({
                            "propertyName": "q.rfq_no",
                            "propertyValue": $scope.filters.rfqno,
                            "propertyDataType": "VARCHAR",
                            "operatorType": "LIKE"
                        })
                }
                if(angular.isDefined($scope.filters.status)){
                    if($scope.filters.status == 1 || $scope.filters.status == 2){
                        vm.filterOpts.having.push({
                            "clause": ($scope.filters.status==1?"SUM(qd.submitted)":"SUM(qd.tq)"),
                            "propertyValue": 0,
                            "propertyDataType": "BIGINT",
                            "operatorType": ">"
                        });
                    }else{
                        vm.filterOpts.andExpre.push({
                            "propertyName": "q.quote_status_id",
                            "propertyValue": $scope.filters.status,
                            "propertyDataType": "BIGINT",
                            "operatorType": "LIKE"
                        });
                    }
                }
                vm.getData(vm.pageno, vm.filterOpts);
            }

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
                    data.transactionMetaData.responseDataProperties = 'q.quote_id&q.rfq_no&q.eventowner&p.name party_party_id&q.quote_status_id&qs.name quotestatus&c.code quote_currency_id&q.entrydate&q.publishdate&q.duedate&q.approvedate&u.firstname&q.description&q.quote_approvedby_id&q.specificationandrequirement&concat(IFNULL(uu.firstname,""), ", ",IFNULL(uu.middlename,"")," ",IFNULL(uu.lastname,""))users_user_id&validity&deliveryperiod&warranty&shipping&deliverylocation';
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
                        vm.publishDateMin = new Date(vm.quote.publishdate);

                        vm.originalQuoteData = angular.copy(vm.quote);
                        vm.originalQuoteData.publishdate = $filter('date')(new Date(vm.originalQuoteData.publishdate), 'mediumDate');
                        vm.originalQuoteData.duedate = $filter('date')(new Date(vm.originalQuoteData.duedate), 'mediumDate');
                        vm.quote.publishdate = $filter('date')(new Date(vm.quote.publishdate), 'mediumDate');
                        vm.quote.duedate = $filter('date')(new Date(vm.quote.duedate), 'mediumDate');

                        vm.tqChecked = (vm.quote.quote_status_id==12141326)?true:false;
                        vm.submittedChecked = (vm.quote.quote_status_id==12141324)?true:false;
                        vm.submittedDisabled = vm.submittedChecked;

                        vm.total_count = response.data.total_count;

                        var data=angular.copy(CommonServices.postData);
                        data.factName = 'Document d';
                        data.transactionMetaData.responseDataProperties = 'd.doc_id&d.doc_quote_id&d.docName&d.docPath&d.docMimeType&d.docCreateDate&d.documentType_id';
                        data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                            {
                                "propertyName": "doc_quote_id",
                                "propertyValue": quoteId,
                                "propertyDataType": "BIGINT",
                                "operatorType": "="
                            }
                        ];
                        DataService.post('inboundService', data).then(function (response) {
                            vm.quoteFiles = response.data.data  ;
                        });
                    })
                    /*Now get the quote details*/
                    var data=angular.copy(CommonServices.postData);
                    data.factName = 'QuoteDetail qd, UnitOfMeasure uom, QuoteDetail_Manufacturer qdm';
                    data.transactionMetaData.responseDataProperties = "qd.quotedetail_id&qd.quote_quote_id&qd.quantity&qd.partno_modelno&qd.description&qd.oem_description&detail_notes&unitprice&oem_unitprice&group_concat(qdm.Party_Party_Id)Party_Party_Id&concat('{"+'"unitofmeasure_id":"'+"',uom.unitofmeasure_id,'"+'","name":"'+"',uom.name,'"+'"}'+"')unitofmeasure&qd.crossrrate&qd.unit_price_usd&qd.mfr_total&qd.certOfOrigin&qd.weight&qd.g_f&qd.packaging&qd.int_f&qd.ins&qd.cif&qd.custom&qd.surch&qd.ciss&qd.etls&qd.vat&qd.nafdac_soncap&qd.clearing&qd.sub_total&qd.goods_in_transit&qd.lt_onne&qd.bch&qd.f_r&qd.cof&qd.total1&qd.mk_up&qd.nlcf&qd.total3&qd.u_p&submitted&tq";
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
                    data.transactionMetaData.groupingProperties.by = 'qd.QuoteDetail_Id';
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
                                        , oem_description:lineItem.oem_description, detail_notes:lineItem.detail_notes, qty:lineItem.quantity
                                        , manus:JSON.parse(response.data.data[0].manus), unitofmeasure:JSON.parse(lineItem.unitofmeasure)
                                        , submitted:(lineItem.submitted==1?true:false), tq:(lineItem.tq==1?true:false)
                                    };
                                    items.unitprice = lineItem.unitprice;
                                    items.oem_unitprice = lineItem.oem_unitprice;
                                    vm.lineItems.push(items);
                                    vm.originalLineItems = angular.copy(vm.lineItems);
                                })
                            })
                        }
                        if(vm.lineItems.length <= 0){
                            vm.lineItemsLoading = "Click the + icon to add new items";
                        }else{
                            vm.originalLineItems = angular.copy(vm.lineItems);
                        }
                    })
                }else{
                    vm.lineItemsLoading = "Click the + icon to add new items";
                    vm.quote = null;
                    vm.lineItems = [];
                    vm.quoteFiles = null;
                    vm.disableClient = true;
                    vm.reset();
                }
            }
            vm.supervisor = function(quoteId){
                var i = 0;
                angular.forEach($localStorage.globals.currentUser.userDetails.authRoles  , function(authRole, key) {
                    if (quoteId && "RFQ_SUPERVISOR,RFQ_ADMIN,SUPPORT_ADMIN".indexOf(authRole.Name) >= 0){
                        i++;
                    }
                });
                return (i>0)?true:false;
            }
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
            vm.getUsers = function(partyId){
                vm.getLOVs("Users","users", {"response":"user_id&concat(IFNULL(firstname,''), ', ',IFNULL(middlename,''),' ',IFNULL(lastname,''))name",'and':[{
                    'propertyName': 'user_party_id',
                    'propertyValue': partyId,
                    'propertyDataType': 'BIGINT',
                    'operatorType': '='
                }]});
            }
            CommonServices.postData.token = $localStorage.globals.currentUser.userDetails.token;

            vm.postData = function () {
                vm.isDisabled = true; //Disable submit button
                vm.dataLoading = true; //Disable submit button
                //FILL FormData WITH FILE DETAILS.
                var data = new FormData();
                data.append("factName", "Quote");
                data.append("token", $localStorage.globals.currentUser.userDetails.token);
                data.append("transactionMetaData[currentLocale]", "NG");
                data.append("transactionMetaData[queryStore]", "MySql");
                //  Lets deal with the files first
                if(vm.uploads){
                    var fileTypeErr = 0, fileErr=0;
                    angular.forEach(vm.uploads, function(lineItem, key) {
                        if(!lineItem.documentType.documentType_id) fileTypeErr++;
                        if(!lineItem.myFile) fileErr++
                        data.append("factObjects[fileType]["+key+"]", lineItem.documentType.documentType_id);
                        var file = lineItem.myFile;
                        data.append("file["+key+"]", file);
                    });
                    if(fileTypeErr){
                        alert('You chose to upload a new file but did not specify file type'); vm.dataLoading=false;vm.isDisabled=false; return;
                    }
                    if(fileErr){
                        alert('You chose to upload a new file but did not upload any'); vm.dataLoading=false;vm.isDisabled=false; return;
                    }
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
                    vm.quote.quote_enteredby_id = $localStorage.globals.currentUser.userDetails.authDetails.user_id;
                    vm.quote.party_party_id = $stateParams.client; // This should be added when adding new quote
                    vm.quote.quote_status_id = 12141325; // Pending Approval...Hopefully this will not change
                    vm.quote.entrydate = new Date();
                    data.append("factObjects[quote]", [JSON.stringify(vm.quote)]);
                }
                //Check for the manufacturers
                vm.lineItems4Db = angular.copy(vm.lineItems);
                vm.originalLineItems4Db = vm.originalLineItems;
                angular.forEach(vm.lineItems  , function(QuoteDetail, key) {
                    var QuoteDetail = {
                        partno_modelno:vm.lineItems[key].partno_modelno, description:vm.lineItems[key].matDesc
                        , detail_notes:vm.lineItems[key].detail_notes, quantity:(vm.lineItems[key].qty?vm.lineItems[key].qty:null)
                        , submitted:vm.lineItems[key].submitted, tq:vm.lineItems[key].tq
                    };
                    if(vm.quote.quote_id){
                        QuoteDetail.oem_description = vm.lineItems[key].oem_description;
                        vm.lineItems[key].unitofmeasure?QuoteDetail.unitofmeasure =vm.lineItems[key].unitofmeasure.unitofmeasure_id:null;
                        QuoteDetail.unitprice = vm.lineItems[key].unitprice?vm.lineItems[key].unitprice:null;
                        QuoteDetail.oem_unitprice = vm.lineItems[key].oem_unitprice?vm.lineItems[key].oem_unitprice:null;
                    }
                    angular.forEach(vm.lineItems[key].manus  , function(QuoteManufacturer, key2) {
                        vm.lineItems4Db[key].manus[key2] = {party_party_id:QuoteManufacturer.party_id};
                        //console.log(vm.lineItems4Db[key].manus[key2]);
                    });
                    if(vm.quote.quote_id){
                        QuoteDetail.id =  vm.lineItems[key].id; //If we are editing then, we need to pass along the QuoteDetail id.
                        if(vm.originalLineItems){
                            angular.forEach(vm.originalLineItems[key].manus  , function(QuoteManufacturer, key2) {
                                vm.originalLineItems4Db[key].manus[key2] = {party_party_id:QuoteManufacturer.party_id};
                            });
                            data.append("factObjects[QuoteDetail_ManufacturerOld]["+key+"]", [JSON.stringify(vm.originalLineItems4Db[key].manus)]);
                        }
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