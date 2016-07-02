angular.module('Auth')
    .controller('LoginController', ['$location', 'AuthenticationService',
        function ($location, AuthenticationService) {
            var vm = this;
            // reset login status
            AuthenticationService.ClearCredentials();
            //data = {
            //    "transactionEventType"   : "Query",
            //    "factName": "Patient",
            //    "transactionMetaData" :{
            //        "currentLocale" : "NG",
            //        "currentRole"	: "SUPPORT_ADMIN",
            //        "firstResult"       : "0",
            //        "maxResults"    : "30",
            //        "queryStore"     : "Mongo",
            //        "responseDataProperties" : "id=firstName=lastName=middleName=age=fullName=emailAddress=gender=stateOfOrigin=maidenName=dateOfBirth=birthTime=religion=addressCountry=addressState=addressCity=addressLine1=addressLine2",
            //        "sortingProperties"     : "",
            //        "queryMetaData" : {
            //            "queryClause":{
            //                "andExpression":{},
            //                "orExpression":{}
            //            }
            //        }
            //    }
            //}

            vm.login = function () {
                vm.dataLoading = true;
                AuthenticationService.Login(vm.username, vm.password, function(response) {
                    if(response.token) {
                        AuthenticationService.SetCredentials(response.token);
                        $location.path('/home');
                    } else {
                        vm.error = response.message;
                        vm.dataLoading = false;
                    }
                });
            };
        }])