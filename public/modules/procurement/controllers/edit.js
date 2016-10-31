/**
 * Created by ahassan on 10/31/16.
 */
angular.module('Procurement')
    .controller('ProcurementEdit', ['$scope', '$localStorage','DataService','CommonServices','$stateParams',
        function ($scope, $localStorage, DataService, CommonServices, $stateParams) {
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
            data.transactionMetaData.responseDataProperties = 'q.quote_id&q.rfq_no&q.eventowner&p.name party_party_id&q.quote_status_id&qs.name quotestatus&c.code quote_currency_id&q.entrydate&q.publishdate&q.duedate&q.approvedate&u.firstname&q.description&q.quote_approvedby_id&q.specificationandrequirement&concat(IFNULL(uu.firstname,""), ", ",IFNULL(uu.middlename,"")," ",IFNULL(uu.lastname,""))users_user_id';
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
            data.transactionMetaData.responseDataProperties = "qd.quotedetail_id&qd.quote_quote_id&qd.quantity&qd.partno_modelno&qd.description&qd.oem_description&unitprice&group_concat(qdm.Party_Party_Id)Party_Party_Id&concat('{"+'"unitofmeasure_id":"'+"',uom.unitofmeasure_id,'"+'","name":"'+"',uom.name,'"+'"}'+"')unitofmeasure&qd.crossrrate&qd.unit_price_usd&qd.mfr_total&qd.certOfOrigin&qd.weight&qd.g_f&qd.packaging&qd.int_f&qd.ins&qd.cif&qd.custom&qd.surch&qd.ciss&qd.etls&qd.vat&qd.nafdac_soncap&qd.clearing&qd.sub_total&qd.goods_in_transit&qd.lt_onne&qd.bch&qd.f_r&qd.cof&qd.total1&qd.mk_up&qd.nlcf&qd.total3&qd.u_p";
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
                                , unitofmeasure:JSON.parse(lineItem.unitofmeasure), "checked": false
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
        }])