/**
 * Created by ahassan on 1/19/17.
 */
angular.module('RFQ')
    .controller('PrintRFQController', ['$scope', 'WEB_ROOTS', '$localStorage','DataService','CommonServices','$stateParams', '$window'
        , function ($scope, WEB_ROOTS, $localStorage, DataService,CommonServices,$stateParams, $window) {
            var vm = this;
            vm.currentDate = new Date();
            var data=angular.copy(CommonServices.postData);
            data.factName = "Quote q, Party p, State s, Country c";
            data.transactionMetaData.queryMetaData.joinClause = {
                'joinType':['JOIN','LEFT JOIN','LEFT JOIN'],'joinKeys':['q.Party_Party_Id=p.Party_Id','p.party_state_id=s.state_id','p.party_country_id=c.country_id']
            }
            data.transactionMetaData.responseDataProperties = 'q.subject&q.rfq_no&q.party_party_id&q.eventowner&p.name clientname&p.addressline1&p.addressline2&p.addresscity&s.name state&c.name country&p.emailaddress&(select SUM(quantity*unitprice) FROM QuoteDetail WHERE quote_quote_id=q.quote_id)sum';
            data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                {
                    "propertyName": "q.quote_id",
                    "propertyValue": $stateParams.print,
                    "propertyDataType": "BIGINT",
                    "operatorType": "="
                }
            ];
            DataService.post('inboundService', data).then(function (response) {
                vm.master=response.data.data[0];
            })
            var data=angular.copy(CommonServices.postData);
            data.factName = "QuoteDetail qd,UnitOfMeasure uom";
            data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                {
                    "propertyName": "qd.quote_quote_id",
                    "propertyValue": $stateParams.print,
                    "propertyDataType": "BIGINT",
                    "operatorType": "="
                }
            ];
            data.transactionMetaData.queryMetaData.joinClause = {
                'joinType':['LEFT JOIN'],'joinKeys':['qd.unitofmeasure=uom.unitofmeasure_id']
            }
            data.transactionMetaData.responseDataProperties = 'qd.quotedetail_id&qd.partno_modelno&(CASE WHEN qd.oem_description IS NOT NULL THEN qd.oem_description ELSE qd.description END)description&qd.quantity&uom.name unitofmeasure&qd.unitprice';
            DataService.post('inboundService', data).then(function (response) {
                vm.detail=response.data.data
            });
            vm.genRFQ = function () {
                $window.open(WEB_ROOTS.TOMCAT+"/frameset?__report=report/base/rfq.rptdesign&quote_id="+$stateParams.print);
            }

        }])