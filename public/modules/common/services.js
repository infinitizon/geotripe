angular.module('Common')
        .factory("DataService", ['$http','RemoteServiceBase',
               function ($http,RemoteServiceBase) { // This service connects to our REST API
                   var service = {};
                   service.get = function (q) {
                       return $http.get(RemoteServiceBase + q).then(function (results) {
                           return results;
                       });
                   };
                   service.post = function (q, object) {
                       return $http.post(RemoteServiceBase + q, object).then(function (results) {
                           return results;
                       });
                   };
                   service.put = function (q, object) {
                       return $http.put(RemoteServiceBase + q, object).then(function (results) {
                           return results;
                       });
                   };
                   service.delete = function (q) {
                       return $http.delete(RemoteServiceBase + q).then(function (results) {
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
            Service.getLOVs = function(options){
                data=angular.copy(this.postData);
                data.factName = options.factName;
                data.transactionMetaData.responseDataProperties = options.responseDataProperties;

                console.log(data)
                $http.post('api/v1/inboundService', data).success(function(results) {
                    console.log( results );
                });
            }
            return Service;
    }])