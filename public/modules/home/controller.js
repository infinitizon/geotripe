angular.module('Home')
    .controller('HomeController', ['$scope', '$location', '$rootScope', '$state',
        function ($scope, $location, $rootScope, $state) {
            var vm = this;
            // reset login status
            vm.pages = $rootScope.globals.currentUser.userDetails.authViews;
        }])
    .controller('ProfileController', ['$scope', '$location', '$rootScope', 'CommonServices'
        , function ($scope, $location, $rootScope, CommonServices) {
            var vm = this;
            vm.originalAuthDetails = angular.copy($rootScope.globals.currentUser.userDetails.authDetails);

            vm.editProfile = function (user_id) {
                var data=angular.copy(CommonServices.postData);
                data.factName = 'Users u';
                console.log($rootScope.globals.currentUser);
                //data.transactionMetaData.responseDataProperties = 'q.quote_id&q.rfq_no&q.eventowner&p.name party_party_id&q.quote_status_id&qs.name quotestatus&c.code quote_currency_id&q.entrydate&q.publishdate&q.duedate&q.approvedate&u.firstname&q.description&q.quote_approvedby_id&q.specificationandrequirement&concat(IFNULL(uu.firstname,""), ", ",IFNULL(uu.middlename,"")," ",IFNULL(uu.lastname,""))users_user_id';
                //data.transactionMetaData.queryMetaData.joinClause = {
                //    'joinType':['JOIN','JOIN','JOIN','JOIN','LEFT JOIN'],'joinKeys':['q.Party_Party_Id=p.Party_Id','q.Quote_Status_Id=qs.QuoteStatus_Id','q.quote_currency_id=c.currency_id','q.quote_enteredBy_id=u.user_id','q.users_user_id=uu.user_id']
                //}
                //data.transactionMetaData.queryMetaData.queryClause.andExpression = [
                //    {
                //        "propertyName": "quote_id",
                //        "propertyValue": quoteId,
                //        "propertyDataType": "BIGINT",
                //        "operatorType": "="
                //    }
                //];
                //DataService.post('inboundService', data).then(function (response) {
                //    vm.quote = response.data.data[0];
                //    vm.quoteFiles = response.data.data['files'];
                //
                //    vm.originalQuoteData = angular.copy(vm.quote);
                //    vm.originalQuoteData.publishdate = new Date(vm.originalQuoteData.publishdate);
                //    vm.originalQuoteData.duedate = new Date(vm.originalQuoteData.duedate);
                //    vm.quote.publishdate = new Date(vm.quote.publishdate);
                //    vm.quote.duedate = new Date(vm.quote.duedate);
                //
                //    vm.tqChecked = (vm.quote.quote_status_id==12141326)?true:false;
                //    vm.submittedChecked = (vm.quote.quote_status_id==12141324)?true:false;
                //    vm.submittedDisabled = vm.submittedChecked;
                //
                //    vm.total_count = response.data.total_count;
                //})
            }
            vm.editProfile($rootScope.globals.currentUser.userDetails.authDetails.user_id)
        }])