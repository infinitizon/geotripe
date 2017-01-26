/**
 * Created by Abimbola on 1/21/2017.
 */

angular.module('Reports')
    .controller('rfqReportsController', ['$scope', '$window', '$localStorage', '$state', 'WEB_ROOTS', 'DataService','CommonServices','$filter'
        , function ($scope, $window, $localStorage, $state, WEB_ROOTS, DataService, CommonServices, $filter) {

            var vm =this;
            vm.container = {};
            vm.quote = {
                rfq_no:null,
                client:{party_id:'',name:'Select client...'},
                enteredFrom:null,
                enteredTo:null,
                status:{quotestatus_id:'',name:'Select status...'},
                manufacturer:{party_id:'',name:'Select manufacturer...'}
            };
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
                        if(selectScope == 'quoteStatuses'){
                            vm.container[selectScope].push({'quotestatus_id':1,'name':'Partially Submitted'});
                            vm.container[selectScope].push({'quotestatus_id':2,'name':'TQ on line Item(s)'});
                        }
                        if(options.loaded){
                            vm.container[selectScope].unshift(options.loaded);
                        }
                    });
                }
            }

            vm.printRFQ =function(){
                var rptParam = '';

                rptParam += (vm.quote.rfq_no!=null && vm.quote.rfq_no!='' ) ? '&rfq_no='+vm.quote.rfq_no :'';
                rptParam += (vm.quote.client.party_id != '')? '&client='+vm.quote.client.party_id :'';
                if(vm.quote.enteredFrom || vm.quote.enteredTo) {
                    if (!vm.quote.enteredFrom || vm.quote.enteredFrom == '') {
                        alert('You need to enter the preiod start date');
                        return;
                    }
                    if (!vm.quote.enteredTo || vm.quote.enteredTo == '') {
                        alert('You need to enter the preiod end date');
                        return;
                    }
                    rptParam += '&fromDate='+ $filter('date')(vm.quote.enteredFrom, "y-MM-dd") +'&toDate='+ $filter('date')(vm.quote.enteredTo, "y-MM-dd");
                }
                rptParam += (vm.quote.status.quotestatus_id !='')? '&quoteStatus='+vm.quote.status.quotestatus_id :'';
                rptParam += (vm.quote.manufacturer.party_id !='')? '&manufacturer='+vm.quote.manufacturer.party_id :'';

                $window.open(WEB_ROOTS.TOMCAT+"/frameset?__report=report/base/rfq.rptdesign"+rptParam);

            }
        }
    ]);