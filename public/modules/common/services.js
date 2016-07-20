angular.module('Common')
        .factory("DataService", ['$http','$state','RemoteServiceBase',
               function ($http,$state,RemoteServiceBase) { // This service connects to our REST API
                   var service = {};
                   service.get = function (q) {
                       return $http.get(RemoteServiceBase + q).then(function (results) {
                           if(results.data.message == -110011){
                               $state.go('login');
                           }
                           return results;
                       });
                   };
                   service.post = function (q, object) {
                       return $http.post(RemoteServiceBase + q, object).then(function (results) {
                           if(results.data.message == -110011){
                               $state.go('login');
                           }
                           return results;
                       });
                   };
                   service.put = function (q, object) {
                       return $http.put(RemoteServiceBase + q, object).then(function (results) {
                           if(results.data.message == -110011){
                               $state.go('login');
                           }
                           return results;
                       });
                   };
                   service.delete = function (q) {
                       return $http.delete(RemoteServiceBase + q).then(function (results) {
                           if(results.data.message == -110011){
                               $state.go('login');
                           }
                           return results;
                       });
                   };

                   return service;
               }])
    .value('RemoteServiceBase','api/v1/')
    .factory('CommonServices', ['DataService','$http' ,
        function(DataService,$http){
            var Service = {};

            Service.GetFormChanges = function(original, edited){
                var diff = {}
                for(var key in original){
                    if(original[key] !== edited[key])
                        diff[key] = edited[key];
                }
                return diff;
            };
            Service.getLOVs = function(data){

                return DataService.post('inboundService', data).then(function(results) {
                    return results ;
                });
            }
            Service.postData = {
                "transactionEventType"   : "Query",
                "factName": "Party",
                "transactionMetaData" :{
                    "currentLocale" : "NG",
                    "currentRole"	: "SUPPORT_ADMIN",
                    "pageno"       : "0",
                    "itemsPerPage"    : "30",
                    "queryStore"     : "MySql",
                    "responseDataProperties" : "",
                    "sortingProperties"     : "",
                    "queryMetaData" : {
                        "queryClause":{
                            "andExpression":[],
                            "orExpression":[]
                        }
                    }
                }
            };
            return Service;
    }])