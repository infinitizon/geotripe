angular.module('Common')
        .factory("DataService", ['$http','RemoteServiceBase',
               function ($http,RemoteServiceBase) { // This service connects to our REST API
                   var service = {};
                   service.get = function (q) {
                       return $http.get(RemoteServiceBase + q).then(function (results) {
                           return results.data;
                       });
                   };
                   service.post = function (q, object) {
                       return $http.post(RemoteServiceBase + q, object).then(function (results) {
                          console.log(results)
                           return results.data;
                       });
                   };
                   service.put = function (q, object) {
                       return $http.put(RemoteServiceBase + q, object).then(function (results) {
                           return results.data;
                       });
                   };
                   service.delete = function (q) {
                       return $http.delete(RemoteServiceBase + q).then(function (results) {
                           return results.data;
                       });
                   };

                   return service;
               }])
         .value('RemoteServiceBase','api/v1/');