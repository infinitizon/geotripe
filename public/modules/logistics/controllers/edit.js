/**
 * Created by ahassan on 10/31/16.
 */
angular.module('Logistics')
    .controller('LogisticsEdit', ['$scope', '$localStorage', '$state', 'DataService','CommonServices','$stateParams',
        function ($scope, $localStorage, $state, DataService, CommonServices, $stateParams) {
            var vm = this;

            vm.lineItems = []
            vm.container = [];
            vm.disableClient = true;
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
                    });
                }
            }
        //    Get the quote

            vm.supervisor = function(quoteId){
                var i = 0;
                angular.forEach($localStorage.globals.currentUser.userDetails.authRoles  , function(authRole, key) {
                    if (quoteId && "RFQ_SUPERVISOR,RFQ_ADMIN,SUPPORT_ADMIN".indexOf(authRole.Name) >= 0){
                        i++;
                    }
                });
                return (i>0)?true:false;
            }

            vm.updateQuotes = function (){
                vm.lineItems.forEach(function(quote){
                    quote.checked = vm.allQuotes;
                });
            };

            var data=angular.copy(CommonServices.postData);
            data.factName = 'Quote q, Party p, QuoteStatus qs, Currency c, Users u, Users uu';
            data.transactionMetaData.responseDataProperties = 'q.quote_id&q.po_no&q.rfq_no&q.eventowner&p.name party_party_id&q.quote_status_id&qs.name quotestatus&c.code quote_currency_id&q.entrydate&q.publishdate&q.duedate&q.approvedate&u.firstname&q.description&q.quote_approvedby_id&q.specificationandrequirement&concat(IFNULL(uu.firstname,""), ", ",IFNULL(uu.middlename,"")," ",IFNULL(uu.lastname,""))users_user_id';
            data.transactionMetaData.queryMetaData.joinClause = {
                'joinType':['JOIN','JOIN','JOIN','JOIN','LEFT JOIN'],'joinKeys':['q.Party_Party_Id=p.Party_Id','q.Quote_Status_Id=qs.QuoteStatus_Id','q.quote_currency_id=c.currency_id','q.quote_enteredBy_id=u.user_id','q.users_user_id=uu.user_id']
            }
            data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                {
                    "propertyName": "quote_id",
                    "propertyValue": $stateParams.rfq_id,
                    "propertyDataType": "BIGINT",
                    "operatorType": "="
                }
            ];
            DataService.post('inboundService', data).then(function (response) {
                vm.quote = response.data.data[0];

                vm.originalQuoteData = angular.copy(vm.quote);
                vm.originalQuoteData.publishdate = new Date(vm.originalQuoteData.publishdate);
                vm.originalQuoteData.duedate = new Date(vm.originalQuoteData.duedate);
                vm.quote.publishdate = new Date(vm.quote.publishdate);
                vm.quote.duedate = new Date(vm.quote.duedate);

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
                        "propertyValue": $stateParams.rfq_id,
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
            data.transactionMetaData.responseDataProperties = "qd.quotedetail_id&qd.quote_is_po&qd.split_po_no&qd.quote_quote_id&qd.quantity&qd.partno_modelno&qd.description&qd.oem_description&unitprice&group_concat(qdm.Party_Party_Id)Party_Party_Id&concat('{"+'"unitofmeasure_id":"'+"',uom.unitofmeasure_id,'"+'","name":"'+"',uom.name,'"+'"}'+"')unitofmeasure&qd.crossrrate&qd.unit_price_usd&qd.mfr_total&qd.certOfOrigin&qd.weight&qd.g_f&qd.packaging&qd.int_f&qd.ins&qd.cif&qd.custom&qd.surch&qd.ciss&qd.etls&qd.vat&qd.nafdac_soncap&qd.clearing&qd.sub_total&qd.goods_in_transit&qd.lt_onne&qd.bch&qd.f_r&qd.cof&qd.total1&qd.mk_up&qd.nlcf&qd.total3&qd.u_p";
            data.transactionMetaData.queryMetaData.joinClause = {
                'joinType':['LEFT JOIN','JOIN'],'joinKeys':['qd.unitofmeasure=uom.unitofmeasure_id','qd.QuoteDetail_Id=qdm.QuoteDetail_QuoteDetail_Id']
            }
            data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                {
                    "propertyName": "Quote_quote_Id",
                    "propertyValue": $stateParams.rfq_id,
                    "propertyDataType": "BIGINT",
                    "operatorType": "="
                }
            ];
            data.transactionMetaData.groupingProperties = 'qd.QuoteDetail_Id';
            DataService.post('inboundService', data).then(function (response) {
                if(response.data.data!=null){
                    delete response.data.data['files'];
                    vm.splits=0;
                    angular.forEach(response.data.data , function(lineItem, key) {
                        var data=angular.copy(CommonServices.postData);

                        if(lineItem.split_po_no!=null && lineItem.split_po_no!=''){
                            vm.splits++;
                            vm.split_po = true;
                        }
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
                                , unitofmeasure:JSON.parse(lineItem.unitofmeasure), "checked": (lineItem.quote_is_po==1?true:false)
                                , po_no:lineItem.split_po_no
                            };
                            items.unitprice = lineItem.unitprice;
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
            function colName(n) {
                var ordA = 'A'.charCodeAt(0);
                var ordZ = 'Z'.charCodeAt(0);
                var len = ordZ - ordA + 1;
                var s = "";
                while(n >= 0) {
                    s = String.fromCharCode(n % len + ordA) + s;
                    n = Math.floor(n / len) - 1;
                }
                return s;
            }
            vm.splitpo_no = function(){
                if(vm.split_po == true){
                    if(!vm.quote.po_no){
                        alert('You must enter a PO number first');
                        vm.split_po = false;
                        return;
                    }
                    vm.splits=0;
                    var numChecked = 0;
                    angular.forEach(vm.lineItems  , function(QuoteDetail, key) {
                        QuoteDetail.po_no = null;
                        if(QuoteDetail.checked==true){
                            QuoteDetail.po_no = vm.quote.po_no +'-'+ colName(vm.splits);
                            numChecked++;vm.splits++;
                        }
                    });
                    if(numChecked == 0){
                        alert('You need to first check the line items for the PO')
                        vm.split_po = false;
                    }else{
                        vm.quote.po_is_split=1;
                    }
                }else{
                    angular.forEach(vm.lineItems  , function(QuoteDetail, key) {
                        QuoteDetail.po_no = null;vm.splits=0;
                    });
                    vm.quote.po_is_split=0;
                }
            }
            vm.checkName2 = function(data){
                if(data == null){
                    alert('Split PO number cannot be empty');return;
                }
                if(data.substring(0,vm.quote.po_no.length) !== vm.quote.po_no){
                    alert('The number '+vm.quote.po_no.length+' must match the PO number entered above');
                    return false;
                }else{
                    return true;
                }
            }
            vm.postData = function(){
                if(!vm.quote.po_no){
                    alert('PO number cannot be empty');
                    return false;
                }
                vm.isDisabled = true; //Disable submit button
                vm.dataLoading = true; //Disable submit button
                //FILL FormData WITH FILE DETAILS.
                var data = new FormData();
                data.append("factName", "Quote");
                data.append("token", $localStorage.globals.currentUser.userDetails.token);
                data.append("transactionMetaData[currentLocale]", "NG");
                data.append("transactionMetaData[queryStore]", "MySql");
                if(vm.quote.quote_id){ // We are editing
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
                    vm.changedObjs['po_no'] = vm.quote.po_no;
                    vm.changedObjs['po_is_split'] = vm.quote.po_is_split;

                    if( !angular.equals({}, vm.changedObjs) ){
                        data.append("factObjects[quote]", [JSON.stringify(vm.changedObjs)]);
                    }
                }
                var numChecked=0, noPoNo = 0;
                vm.lineItems4Db = angular.copy(vm.lineItems);
                vm.originalLineItems4Db = vm.originalLineItems;
                var realKey = 0;
                angular.forEach(vm.lineItems  , function(QuoteDetail, key) {
                    if(QuoteDetail.checked==true){
                        if(vm.split_po == true && QuoteDetail.po_no==null){
                            noPoNo++;
                        }
                        var QuoteDetail = {partno_modelno:vm.lineItems[key].partno_modelno,description: vm.lineItems[key].matDesc, quantity: vm.lineItems[key].qty};
                        QuoteDetail.quote_is_po = 1;
                        QuoteDetail.oem_description = vm.lineItems[key].oem_description;
                        QuoteDetail.unitofmeasure = (vm.lineItems[key].unitofmeasure)?vm.lineItems[key].unitofmeasure.unitofmeasure_id:null;
                        QuoteDetail.unitprice = vm.lineItems[key].unitprice;
                        QuoteDetail.split_po_no = vm.lineItems[key].po_no;

                        QuoteDetail.unitofmeasure = (vm.lineItems[key].unitofmeasure)?vm.lineItems[key].unitofmeasure.unitofmeasure_id:null;
                        angular.forEach(vm.lineItems[key].manus  , function(QuoteManufacturer, key2) {
                            vm.lineItems4Db[key].manus[key2] = {party_party_id:QuoteManufacturer.party_id};
                            //console.log(vm.lineItems4Db[key].manus[key2]);
                        });

                        QuoteDetail.id =  vm.lineItems[key].id; //If we are editing then, we need to pass along the QuoteDetail id.
                        angular.forEach(vm.originalLineItems[key].manus  , function(QuoteManufacturer, key2) {
                            vm.originalLineItems4Db[key].manus[key2] = {party_party_id:QuoteManufacturer.party_id};
                        });
                        data.append("factObjects[QuoteDetail_ManufacturerOld]["+realKey+"]", [JSON.stringify(vm.originalLineItems4Db[key].manus)]);
                        data.append("factObjects[QuoteDetail]["+realKey+"]", JSON.stringify(QuoteDetail));
                        data.append("factObjects[QuoteDetail_Manufacturer]["+realKey+"]", [JSON.stringify(vm.lineItems4Db[key].manus)]);

                        QuoteDetail.checked = true;
                        numChecked++;
                        realKey++
                    }
                })

                if(noPoNo > 0){
                    vm.isDisabled = false; //Disable submit button
                    vm.dataLoading = false; //Disable submit button
                    alert('Error: Some split PO numbers have not been entered');
                    return;
                }
                if(numChecked > 0){
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
                            $state.go('app.logistics.list');
                        }
                        //vm.container[selectScope] = response.data.data;
                    });
                }else{
                    vm.isDisabled = false; //Disable submit button
                    vm.dataLoading = false; //Disable submit button
                    alert('You need to check the line items for the PO')
                }
            }
        }])