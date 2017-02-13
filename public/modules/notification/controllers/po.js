/**
 * Created by Abimbola on 2/11/2017.
 */
angular.module('Notification')
    .controller('NotificationController', ['$scope', '$state', '$stateParams', '$localStorage', '$filter', '$modal', 'DataService','CommonServices'
        , function ($scope, $state, $stateParams, $localStorage, $filter, $modal, DataService, CommonServices){
            var vm = this;

            vm.lineItems = []
            vm.container = [];
            vm.disableClient = true;
            vm.lstOfcharges = [];
            vm.allowEdit=false, vm.showOverlay=false;

            CommonServices.postData.token = $localStorage.globals.currentUser.userDetails.token;

            var data=angular.copy(CommonServices.postData);
            data.factName = 'Quote q, QuoteCat qc, Party p, QuoteStatus qs, Currency c, Users u, Users uu';
            data.transactionMetaData.responseDataProperties = 'q.quote_id&IFNULL(qc.po_no,q.po_no)po_no&q.rfq_no&IFNULL(qc.eventowner,q.eventowner)eventowner' +
                '&p.name party_party_id&q.quote_status_id&qs.name quotestatus&c.code quote_currency_id&q.entrydate&q.publishdate&q.duedate&q.approvedate&u.firstname&q.description&q.quote_approvedby_id&q.specificationandrequirement&concat(IFNULL(uu.firstname,""), ", ",IFNULL(uu.middlename,"")," ",IFNULL(uu.lastname,""))users_user_id&q.validity&q.deliveryperiod&q.warranty&q.shipping&q.deliverylocation';
            data.transactionMetaData.queryMetaData.joinClause = {
                'joinType':['JOIN','JOIN','JOIN','JOIN','JOIN','LEFT JOIN']
                ,'joinKeys':['q.quote_id=qc.quote_id','q.Party_Party_Id=p.Party_Id','q.Quote_Status_Id=qs.QuoteStatus_Id','q.quote_currency_id=c.currency_id','q.quote_enteredBy_id=u.user_id','q.users_user_id=uu.user_id']
            }
            data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                {
                    "propertyName": "quotecat_id",
                    "propertyValue": $stateParams.not_id,
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
                        "propertyValue": $stateParams.not_id,
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
            data.factName = 'QuoteDetail qd, QuoteDetailCat qdc, UnitOfMeasure uom, QuoteDetail_Manufacturer qdm';
            data.transactionMetaData.responseDataProperties = "qd.quotedetail_id&qd.quote_quote_id&qd.quote_is_po&qd.split_po_no&IFNULL(qdc.quantity,qd.quantity)quantity&IFNULL(qdc.partno_modelno,qd.partno_modelno)partno_modelno&" +
                "IFNULL(qdc.description,qd.description)description&IFNULL(qdc.oem_description,qd.oem_description)oem_description&IFNULL(qdc.detail_notes,qd.detail_notes)detail_notes&IFNULL(qdc.unitprice,qd.unitprice)unitprice&" +
                "IFNULL(qdc.oem_unitprice,qd.oem_unitprice)oem_unitprice&group_concat(qdm.Party_Party_Id)Party_Party_Id&concat('{"+'"unitofmeasure_id":"'+"',uom.unitofmeasure_id,'"+'","name":"'+"',uom.name,'"+'"}'+"')unitofmeasure&" +
                "IFNULL(qdc.submitted,qd.submitted)submitted&IFNULL(qdc.tq,qd.tq)tq";
            data.transactionMetaData.queryMetaData.joinClause = {
                'joinType':['JOIN','LEFT JOIN','JOIN'],'joinKeys':['qd.quotedetail_id=qdc.quotedetail_id','qd.unitofmeasure=uom.unitofmeasure_id','qd.QuoteDetail_Id=qdm.QuoteDetail_QuoteDetail_Id']
            }
            data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                {
                    "propertyName": "qdc.quotecat_id",
                    "propertyValue": $stateParams.not_id,
                    "propertyDataType": "BIGINT",
                    "operatorType": "="
                }
            ];
            data.transactionMetaData.groupingProperties.by = 'qd.QuoteDetail_Id';
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
            // Now get the PO details
            var data=angular.copy(CommonServices.postData);
            data.factName = 'PODetails pod,PODetailsCat poc,Currency c';
            data.transactionMetaData.responseDataProperties = "pod.po_details_id&pod.quote_quote_id&pod.po_no&concat('{"+'"currency":"'+"',IFNULL(pod.currency,''),'"+'","code":"'+"',IFNULL(c.code,''),'"+'"}'+"')currency&" +
                "IFNULL(poc.wire_transfer_fee,pod.wire_transfer_fee)wire_transfer_fee&IFNULL(poc.cost_of_certs,pod.cost_of_certs)cost_of_certs&IFNULL(poc.ground_freight,pod.ground_freight)ground_freight&" +
                "IFNULL(poc.int_freight,pod.int_freight)int_freight&IFNULL(poc.packaging_cost,pod.packaging_cost)packaging_cost&IFNULL(poc.harzardous_cost,pod.harzardous_cost)harzardous_cost&" +
                "IFNULL(poc.other_cost,pod.other_cost)other_cost&IFNULL(poc.discount,pod.discount)discount&IFNULL(poc.noofinstallments,pod.noofinstallments)noofinstallments&IFNULL(poc.installments,pod.installments)installments&IFNULL(poc.remarks,pod.remarks)remarks";
            //data.transactionMetaData.responseDataProperties = "pod.po_no&pod.currency&pod.wire_transfer_fee&pod.cost_of_certs&pod.ground_freight&pod.int_freight&pod.packaging_cost&pod.harzardous_cost&pod.other_cost";
            data.transactionMetaData.queryMetaData.joinClause = {
                'joinType':['JOIN','LEFT JOIN'],'joinKeys':['pod.po_details_id=poc.po_details_id','pod.currency=c.currency_id']
            }
            data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                {
                    "propertyName": "poc.quotecat_id",
                    "propertyValue": $stateParams.not_id,
                    "propertyDataType": "BIGINT",
                    "operatorType": "="
                }
            ];
            DataService.post('inboundService', data).then(function (response) {
                vm.lstOfcharges = response.data.data || [];
                if(vm.lstOfcharges <= 0){
                    vm.chargesLoading = "No charge entered yet!";
                }else{
                    angular.forEach(vm.lstOfcharges, function(charge){
                        charge.currency = JSON.parse(charge.currency);
                        charge.wire_transfer_fee = charge.wire_transfer_fee?parseFloat(charge.wire_transfer_fee):'';
                        charge.cost_of_certs = charge.cost_of_certs ? parseFloat(charge.cost_of_certs):'';
                        charge.ground_freight = charge.ground_freight ? parseFloat(charge.ground_freight) : "";
                        charge.int_freight = charge.int_freight ? parseFloat(charge.int_freight) : '';
                        charge.packaging_cost = charge.packaging_cost ? parseFloat(charge.packaging_cost) : '';
                        charge.harzardous_cost = charge.harzardous_cost ? parseFloat(charge.harzardous_cost) : '';
                        charge.discount = charge.discount ? parseFloat(charge.discount) : '';
                        charge.other_cost = charge.other_cost ? parseFloat(charge.other_cost) : '';
                    })
                }
                console.log(vm.chargesLoading)
            })
            vm.editCharge=function(index,charge){
                var modalInstance = $modal.open({
                    animation: true,
                    templateUrl: 'modules/logistics/views/templates/charge.edit.html',
                    controller: 'chargeEditController',
                    controllerAs: 'ceCtrl',
                    resolve:{
                        charge  : function(){
                            return {index:index,charge:charge,preventUpdate:true} || {};
                        },
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'vendor/jquery.maskedinput/dist/jquery.maskedinput.min.js'
                                , 'modules/logistics/controllers/logistics.js'
                            ]).then(function () {
                                return $ocLazyLoad.load(['modules/logistics/controllers/templates/charge.edit.js']);
                            });
                        }]
                    }
                });
                modalInstance.result.then(function (rslt) {
                    console.log(rslt)
                    if(rslt.index != null){
                        vm.lstOfcharges[rslt.index] = rslt.charge;
                    }else{
                        vm.lstOfcharges.push(rslt.charge);
                    }
                }, function () {
                    // What should happen when modal is dismissed
                    console.log('Modal dismissed at: ' + new Date());
                });
            }
            vm.approve = function () {
                if(confirm('Action is irreversible.\nProceed')){
                    vm.dataLoading = true;
                    var changes = {};
                    var data=angular.copy(CommonServices.postData);
                    data.factName = 'QuoteCat';
                    data.transactionEventType = "UPDATEPO";
                    changes['id'] = vm.quote.quote_id;
                    changes['quotecatId'] = $stateParams.not_id;
                    changes['notes'] = 'PO Approved';
                    changes['po_is_approved'] = 1;
                    data.factObjects = [changes];
                    DataService.post('notification', data).then(function (response) {
                        if(response.data.success==true){
                            $state.go('app.notification.list');
                        }
                    });
                }
            }
            vm.deny = function () {
                var modalInstance = $modal.open({
                    animation: true,
                    template: '<div class="modal-header">' +
                                '<div class="modal-body">' +
                                    '<form name="form">' +
                                        '<div class="row"><div class="col-sm-12"><div class="form-group"><label for="reason">Remark/Reason</label><textarea id="reason" class="form-control" ng-model="daCtrl.reason" data-ng-required="true"></textarea></div></div></div>' +
                                        '<div class="form-actions text-center">' +
                                            '<a ng-click="daCtrl.cancel()" class="btn btn-default" role="button">Cancel</a> ' +
                                            '<button ng-click="daCtrl.submitData()"  data-ng-disabled="form.$invalid" style="width:10%;" class="btn btn-primary">Ok</button>' +
                                            ' <i ng-if="daCtrl.dataLoading" class="fa fa-spinner fa-spin fa-2x"></i>' +
                                        '</div>' +
                                    '</form>' +
                                '</div></div>',
                    controller: 'DenyApptController',
                    controllerAs: 'daCtrl',
                    resolve     : {
                        editRow: function () {
                            return {quote_id:vm.quote.quote_id, quotecat_id:$stateParams.not_id};
                        }
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
            }
        }
    ])

    .controller('DenyApptController', ['$scope', '$stateParams', '$localStorage', '$filter', '$modalInstance', 'editRow', 'DataService','CommonServices'
        , function ($scope, $stateParams, $localStorage, $filter, $modalInstance, editRow, DataService, CommonServices){
            var vm = this;

            vm.cancel = function(){
                $modalInstance.close();
            }
            vm.submitData = function() {
                if (vm.reason != '' && vm.reason != null) {
                    vm.dataLoading = true;
                    var changes = {};
                    var data=angular.copy(CommonServices.postData);
                    data.factName = 'QuoteCat';
                    data.transactionEventType = "UPDATEPO";
                    changes['id'] = editRow.quote_id;
                    changes['quotecatId'] = editRow.quotecat_id;
                    changes['notes'] = vm.reason;
                    changes['po_is_approved'] = 2;
                    data.factObjects = [changes];
                    DataService.post('notification', data).then(function (response) {
                        if(response.data.success==true){
                            $modalInstance.close();
                        }
                    });
                }
            }
        }
    ])