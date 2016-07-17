angular.module('Setup')
    .controller('SetupController', ['$location', '$rootScope', '$uibModal',
        function ($location, $rootScope, $uibModal) {
            var vm = this;
            // reset login status
            vm.open = function (options) {
                switch(options.url) {
                    case 'party':
                        options.controller = 'PartyController';
                        options.controllerAs = 'PartyCtrl';
                        break;
                    default:
                        options.controller = 'PartyController';
                        options.controllerAs = 'PartyCtrl';
                }
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'modules/setup/views/templates/'+options.url+'.html',
                    controller: options.controller,
                    controllerAs: options.controllerAs,
                    size: options.modalSize
                });

                modalInstance.result.then(function (selectedItem) {
                    console.log(selectedItem);
                }, function () {
                    console.log('Modal dismissed at: ' + new Date());
                });
            };
        }])
    .controller('PartyController', ['$rootScope','$uibModalInstance','DataService','postData',
        function ($rootScope, $uibModalInstance,DataService,postData) {
            var vm = this;

            vm.edit=false;
            postData.data.token = $rootScope.globals.currentUser.userDetails.token;
            postData.data.transactionMetaData.responseDataProperties = 'party_id&party_partytype_id&addressline1&addressline2&addresscity&name'
            DataService.post('inboundService',postData.data).then(function (results) {
                vm.parties = results.data;
            })
            vm.editParty = function () {
                vm.edit=true;

            };
            vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
            vm.ok = function () {
                $uibModalInstance.close('Ok');
            };
        }])