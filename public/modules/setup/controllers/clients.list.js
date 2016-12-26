/**
 * Created by ahassan on 12/23/16.
 */
angular.module('Setup')
    .controller('PartyController', ['$localStorage', '$state', 'DataService','CommonServices','$uibModal'
        , function ($localStorage, $state, DataService,CommonServices,$uibModal) {
            var vm = this;

            vm.edit=false;
            vm.container = [];

            vm.getLOVs = function(factName, selectScope, options) {
                if (vm.container[selectScope] == null) {
                    if(options.placeholder)
                        vm.container[selectScope] = [options.placeholder];
                    else
                        vm.container[selectScope] = [{'id':1,'name':'Loading please wait...'}];

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
            };

            vm.users = []; //declare an empty array
            vm.pageno = 1; // initialize page no to 1
            vm.total_count = 0;
            vm.itemsPerPage = 15; //this could be a dynamic value from a drop down
            CommonServices.postData.token = $localStorage.globals.currentUser.userDetails.token;
            vm.getData = function(pageno) {
                data=angular.copy(CommonServices.postData);

                data.factName = 'Party p, PartyType pt, Country c, State s';
                data.transactionMetaData.responseDataProperties = "p.party_id&CONCAT('{\"partytype_id\":',p.party_partytype_id,',\"name\":\"',pt.name,'\"}')type&p.addressline1&p.addressline2&p.addresscity&p.emailaddress&p.name&CONCAT('{\"country_id\":',p.party_country_id,',\"name\":\"',c.name,'\"}')country&CONCAT('{\"state_id\":',p.party_state_id,',\"name\":\"',s.Name,'\"}')state&p.contactpersontitle&p.contactlastname&p.contactfirstname&p.contactmiddlename&p.contactphonenumber";
                data.transactionMetaData.queryMetaData.joinClause = {
                    'joinType':['JOIN','LEFT JOIN','LEFT JOIN'],'joinKeys':['p.Party_PartyType_Id=pt.PartyType_Id','p.Party_Country_Id=c.Country_Id','p.Party_State_Id=s.State_id']
                };
                data.transactionMetaData.pageno = pageno-1;
                data.transactionMetaData.itemsPerPage = vm.itemsPerPage;
                data.transactionMetaData.queryMetaData.queryClause.andExpression = [];

                DataService.post('inboundService', data).then(function (response) {
                    vm.parties = response.data.data;
                    angular.forEach(vm.parties, function(party){
                        party.type = JSON.parse(party.type);
                        party.country = JSON.parse(party.country);
                        party.state = JSON.parse(party.state);
                    })
                    vm.total_count = response.data.total_count;
                })
            }
            vm.getData(vm.pageno);
            vm.goBack = function () {
                vm.edit=false;
                vm.getData(vm.pageno);
            };
            vm.editParty = function(client){

                (!angular.equals({}, client))? client.type=JSON.stringify(client.type) : '';
                (!angular.equals({}, client))? client.country=JSON.stringify(client.country) : '';
                (!angular.equals({}, client))? client.state=JSON.stringify(client.state) : '';
                var modalInstance = $uibModal.open({
                    templateUrl: 'modules/setup/views/clients.detail.html'
                    , controller: 'ClientDetailController'
                    , controllerAs: 'cltDtCtrl'
                    , resolve     : {
                        client: function () {
                            return client;
                        },
                        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load(['modules/setup/controllers/clients.detail.js']);
                        }]
                    }
                    , backdrop  : 'static', keyboard  : false, size: 'lg'
                });
                modalInstance.result.then(function (res) {
                    vm.getData(vm.pageno);
                    //$state.reload();
                    $log.info('Modal dismissed at: ' + new Date());
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }

        }]);